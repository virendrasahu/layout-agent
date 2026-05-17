const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Helper transformation functions
function resizeArtboard(layout, newWidth, newHeight) {
  const artboard = layout.find(n => n.type === 'artboard') || layout[0];
  if (!artboard) return layout;
  
  artboard.width = newWidth;
  artboard.height = newHeight;
  
  // Recompute positions based on new size and normalized values
  layout.forEach(node => {
    if (node.type !== 'artboard' && node.nx !== undefined) {
      node.x = Math.round(node.nx * newWidth);
      node.y = Math.round(node.ny * newHeight);
      node.width = Math.round(node.nw * newWidth);
      node.height = Math.round(node.nh * newHeight);
    }
  });
  
  return layout;
}

function moveNode(layout, nodeId, position) {
  const artboard = layout.find(n => n.type === 'artboard');
  const node = layout.find(n => n.id === nodeId);
  if (!artboard || !node) return layout;

  switch (position) {
    case 'top':
      node.y = 0;
      break;
    case 'bottom':
      node.y = artboard.height - node.height;
      break;
    case 'center':
      node.x = (artboard.width - node.width) / 2;
      node.y = (artboard.height - node.height) / 2;
      break;
    case 'left':
      node.x = 0;
      break;
    case 'right':
      node.x = artboard.width - node.width;
      break;
  }
  
  // Update normalized
  node.nx = node.x / artboard.width;
  node.ny = node.y / artboard.height;

  return layout;
}

function resizeNode(layout, nodeId, scale) {
  const artboard = layout.find(n => n.type === 'artboard');
  const node = layout.find(n => n.id === nodeId);
  if (!node || !artboard) return layout;

  node.width = Math.round(node.width * scale);
  node.height = Math.round(node.height * scale);
  
  // Update normalized sizes
  node.nw = node.width / artboard.width;
  node.nh = node.height / artboard.height;
  
  if (node.style && node.style.fontSize) {
    node.style.fontSize = Math.round(node.style.fontSize * scale);
  }
  
  return layout;
}

const SYSTEM_PROMPT = `You are a layout transformation agent. Your job is to modify a given JSON layout based on user instructions.
The JSON layout consists of nodes. There is one 'artboard' node (the canvas) and several child nodes (type 'image', 'text', 'shape').

CRITICAL RULES FOR COORDINATES:
- x, y, width, height are absolute pixel values.
- nx, ny, nw, nh are normalized values (0 to 1) relative to the artboard's width and height.
- ALWAYS keep absolute and normalized values in sync. 

TRANSFORMATIONS:
1. Aspect Ratio Conversion (e.g., "Convert to 9:16"): Change the artboard width and height (e.g., to 1080x1920). For EVERY child node, recompute its x, y, width, height by multiplying its nx, ny, nw, nh by the NEW artboard width and height.
2. Moving elements: Update both absolute (x, y) and normalized (nx, ny) coordinates.
3. Resizing elements: Update absolute (width, height), normalized (nw, nh), and if it's text, update style.fontSize.

You MUST return your response as a valid JSON object matching this schema exactly:
{
  "updatedLayout": [ array of updated node objects ],
  "assistantMessage": "A friendly message explaining what you changed."
}
DO NOT return any text outside of the JSON object. Do not wrap in markdown code blocks.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, layout, history } = req.body;
    
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: `Here is the current layout JSON: ${JSON.stringify(layout)}\n\nUser Instruction: ${message}` }
    ];

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content);
    
    // Simple validation
    if (!parsed.updatedLayout || !Array.isArray(parsed.updatedLayout) || !parsed.assistantMessage) {
      throw new Error("Invalid output format from LLM");
    }

    res.json(parsed);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
