# Chat-Based Layout Agent

A full-stack web application that allows users to interact with a design layout using natural language. The agent visualizes an initial design layout and automatically transforms elements (aspect ratio, positions, sizing, and styling) in real-time based on your chat instructions, leveraging the power of Groq and LLMs.

## Prerequisites

Before running this project, ensure you have the following installed and ready:
- **Node.js**: v18 or newer recommended.
- **npm** or **yarn** package manager.
- **Groq API Key** (or an OpenAI-compatible API key) to power the layout transformations.

## Setup Steps

Follow these steps to get both the frontend and backend running locally:

### 1. Clone the Repository
\`\`\`bash
# (Assuming you have cloned the repository)
cd layout-agent
\`\`\`

### 2. Setup the Backend
\`\`\`bash
cd server
npm install
\`\`\`

Create a `.env` file inside the `server/` directory and add your Groq API key:
\`\`\`env
PORT=3001
GROQ_API_KEY=your-actual-api-key-here
\`\`\`

### 3. Setup the Frontend
\`\`\`bash
# Open a new terminal from the layout-agent root
cd client
npm install
\`\`\`

### 4. Run the Application
You will need to run the servers concurrently in two separate terminal windows.

**Start the Backend:**
\`\`\`bash
cd server
node index.js
\`\`\`

**Start the Frontend:**
\`\`\`bash
cd client
npm run dev
\`\`\`
The application will be accessible at [http://localhost:5173](http://localhost:5173).

## How to Use

Once the application is running, open the chat window on the left side of the screen and try giving the agent natural language instructions to modify the layout!

**Example prompts to try:**
- *"Convert this design to 9:16"*
- *"Move the headline to the bottom"*
- *"Make the product smaller and center it"*
- *"Change the discount badge color to blue and make the font smaller"*
- *"Keep the product large"* (Testing context-aware follow-ups)

Watch as the layout JSON and the interactive wireframe preview instantly update to reflect your changes.

## Tech Stack Overview

- **Frontend**: React, Vite, Tailwind CSS (v4)
- **Backend**: Node.js, Express
- **AI Integration**: Groq API (using the `@openai` SDK for compatibility)
- **State Management**: React `useState`
- **Preview Engine**: Dynamic relative positioning via normalized coordinate math (`nx`, `ny`, `nw`, `nh`)
