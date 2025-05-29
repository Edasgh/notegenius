
# 🧠 Notegenius – Your AI-Powered Study Companion

**Notegenius** is an all-in-one intelligent notes platform for students. Upload notes, summarize them, ask questions, extract insights from YouTube videos or GitHub repositories, and supercharge your learning with AI.

[LIVE DEMO](https://notegenius-lovat.vercel.app/)

---

## ❓ Problem Statement

In today’s fast-paced academic environment, students often struggle with managing and understanding large volumes of study material from various sources—class notes, online lectures, YouTube videos, and open-source code repositories. Traditional note-taking methods are time-consuming, fragmented, and lack interactivity or personalization.

Students need a centralized, intelligent platform that not only stores their learning resources but also helps them **understand, summarize, and interact** with the content more effectively.

**Notegenius** addresses this challenge by providing an AI-powered environment where students can:

* Upload notes and generate smart summaries
* Ask specific questions about any part of their content
* Convert YouTube videos into structured notes
* Explore and understand GitHub codebases through natural language

---
## ✨ Features

### 📄 Notes Upload & Summarization
- Upload files (PDF, DOCX, TXT)
- Generate concise, bullet-point, or detailed summaries
- Highlight important sections with AI assistance
- Export to PDF

### 🤖 AI Q&A
- Ask questions about your uploaded notes
- Select specific lines or text to get targeted answers
- Chat interface powered by OpenAI or other LLMs

### 🎥 YouTube Video Notes
- Paste a YouTube video link
- Extract transcripts and generate structured notes
- Break content down by timestamps or topics

### 💻 GitHub Repository Q&A
- Add any public GitHub repository
- Ask questions about code, architecture, or specific files
- Get summaries of complex functions or file structures

### 🔁 Study Tools (Upcoming features)
- Flashcard generator from notes
- Quiz generator (MCQs or short answers)
- Study planner and progress tracker
- Export to DOCX, or Anki

---

## 🚀 Tech Stack

| Layer        | Technology                               |
|--------------|------------------------------------------|
| Frontend     | Next.js, Shadcn UI, Tailwind CSS         |
| Backend      | Node.js, Express (or Next API)           |
| AI Services  | Gemini API, LangChain                    |
| File Storage | Convex Cloud Storage                     |
| Vector DB    | Convex                                   |
| Auth         | Clerk                                    |

---

## 🛠 Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/studyspark.git
cd studyspark
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your-gemini-key
NEXT_PUBLIC_CONVEX_URL=your-convex-url
CONVEX_DEPLOYMENT=your-convex-deployment
GITHUB_TOKEN=your-github-token
```

### 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📦 Folder Structure

```
/components      – Reusable React components
/pages           – Next.js routes
/lib             – Utility functions and API wrappers
/app/api         – Server actions and file processing
/styles          – Tailwind styles
/public          – Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR if you have ideas, suggestions, or fixes.

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

* [GEMINI](https://gemini.google.com)
* [LangChain](https://www.langchain.com)
* [Convex](https://www.convex.dev)
* [YouTube Transcript API](https://rapidapi.com/)

---

## 📬 Contact

**Made with ❤️ for students everywhere.**

