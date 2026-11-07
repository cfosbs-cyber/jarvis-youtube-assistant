# Jarvis AI YouTube Assistant

A Jarvis-style AI assistant designed for a YouTube creator. It can draft video ideas, titles, hooks, descriptions, tags, scripts, thumbnail concepts, and content plans. It does not have live access to channel analytics or publish content.

## Requirements
- Node.js 18.17 or newer
- npm
- An OpenAI API key to use the AI chat feature

## Run locally
1. Clone or download this repository, then open a terminal in the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` in the project root (next to `package.json`) and add your API key:
   ```env
   OPENAI_API_KEY=your_actual_api_key
   ```
   Do not commit or share this file. The `.env.local` file is ignored by Git.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000.

If the page loads but AI replies do not work, verify the key is valid and has API access, then stop and restart `npm run dev`. A ChatGPT subscription does not include API usage automatically.

## Stack
- Next.js
- TypeScript
- OpenAI API

## Limitations
This is an MVP. It does not yet connect to YouTube's APIs, retrieve live channel analytics, save conversations, or publish videos/comments. Those integrations require additional setup and explicit authorization.
