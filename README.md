# Chat-Based Layout Agent

A full-stack AI-powered web application that allows users to edit and transform design layouts using natural language instructions. The application visualizes a design layout from JSON data and automatically updates positions, sizes, styles, and aspect ratios in real-time through an interactive chat interface powered by LLMs.

Users can give instructions like:

* “Convert this design to 9:16”
* “Move the headline to the top”
* “Make the discount badge bigger”
* “Keep the product centered”

The application intelligently updates both the layout JSON and wireframe preview based on these instructions.

---

# Features

* Natural language layout editing using AI
* Real-time layout JSON transformation
* Interactive wireframe preview
* Aspect ratio conversion support
* Context-aware follow-up instructions
* Semantic understanding of layout elements
* Safe JSON validation before applying updates
* Responsive frontend UI
* Normalized coordinate-based layout scaling

---

# Project Demo

## Example Instructions

* Convert this design to 9:16
* Move the headline to the bottom
* Make the product smaller and center it
* Change the discount badge color to blue
* Make the headline font smaller
* Keep the product large

The layout preview and JSON update instantly after each instruction.

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS v4

## Backend

* Node.js
* Express.js

## AI Integration

* Groq API
* OpenAI-compatible SDK

## State Management

* React `useState`

## Preview Engine

* Relative positioning using normalized coordinates:

  * `nx`
  * `ny`
  * `nw`
  * `nh`

---

# Architecture Flow

```text
User Prompt
   ↓
Frontend Chat Interface
   ↓
Express Backend API
   ↓
Groq LLM Processing
   ↓
Layout Transformation Helpers
   ↓
Updated Layout JSON
   ↓
Wireframe Preview Re-render
```

---

# How It Works

The application combines AI reasoning with deterministic layout transformation logic.

## AI Responsibilities

The LLM is responsible for:

* Understanding natural language instructions
* Identifying semantic layout elements
* Interpreting follow-up instructions
* Deciding what transformation should happen

Example:

```json
{
  "action": "move_node",
  "target": "headline",
  "position": "top"
}
```

## Backend Responsibilities

The backend safely performs:

* Aspect ratio conversion
* Node movement
* Element resizing
* Coordinate recalculation
* JSON validation

This hybrid approach makes the application more reliable and prevents invalid layout updates.

---

# Normalized Coordinate System

The layout engine uses normalized coordinates:

* `nx` → normalized x-position
* `ny` → normalized y-position
* `nw` → normalized width
* `nh` → normalized height

These values remain between `0` and `1` and allow layouts to scale proportionally across different aspect ratios without breaking the design structure.

Example:

```text
newX = nx × artboardWidth
newY = ny × artboardHeight
```

---

# Project Structure

```text
layout-agent/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── prompts/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── README.md
└── APPROACH.md
```

---

# Prerequisites

Before running this project, ensure the following are installed:

* Node.js v18 or newer
* npm or yarn
* Git
* Groq API key (or any OpenAI-compatible API key)

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd layout-agent
```

---

## 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=3001
GROQ_API_KEY=your-api-key-here
```

---

## 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

---

## 4. Run the Application

### Start Backend

```bash
cd server
node index.js
```

### Start Frontend

```bash
cd client
npm run dev
```

---

# Application URL

```text
http://localhost:5173
```

---

# Example Prompts to Try

```text
Convert this design to 9:16
Move the headline to the top
Make the product larger
Center the product
Move the discount badge higher
Change the headline color to red
Make the CTA button smaller
Keep the product large
```

---

# JSON Validation

LLM-generated responses are validated before applying layout updates to prevent:

* malformed JSON
* missing nodes
* invalid layout structure
* broken previews

This ensures safe and predictable transformations.

---

# Error Handling

The application handles:

* invalid AI responses
* JSON parsing failures
* network errors
* missing layout nodes
* unsupported instructions

Graceful fallback messages are shown in the chat UI whenever an error occurs.

---

# Future Improvements

* Drag-and-drop editing
* Multi-select node editing
* Undo / redo history
* Real image rendering
* Advanced semantic node tagging
* Persistent layout storage
* Collaborative editing
* Streaming AI responses

---

# Screenshots

## Chat Interface + Wireframe Preview

> Add screenshots inside a `/screenshots` folder and update the image path below.

```md
![App Screenshot](./screenshots/app-preview.png)
```

---

# Security Notes

* API keys are stored using environment variables
* `.env` files are excluded from version control
* LLM responses are validated before applying updates

---

# Author

## Virendra Sahu

* Full Stack Developer
* React & Node.js Developer
* AI-integrated web application enthusiast

GitHub: [https://github.com/virendrasahu](https://github.com/virendrasahu)

LinkedIn: [https://www.linkedin.com/in/virendra-sahu-14117121a/](https://www.linkedin.com/in/virendra-sahu-14117121a/)
