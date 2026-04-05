# Dev Study Library

A lightweight, browser-only quiz app to strengthen your engineering knowledge. No backend, no database, no login required.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- 🎭 **3 roles**: Foundation/Junior, Mid-Level, Senior
- 📝 **12 tests** (4 per role) covering core engineering topics
- 💡 **Detailed explanations** after each answer
- 🟢🔴 **Instant feedback** with green/correct and red/wrong highlighting
- 📊 **Score summary** with topic breakdown
- 🔊 **Text-to-speech** (optional, toggle in quiz toolbar)
- 🎯 **Progress bar** during quizzes
- 📱 **Responsive design** works on desktop and mobile

## Topics Covered

### Foundation / Junior
- Programming Fundamentals (variables, data structures, complexity)
- Language & Code Quality (clean code, DRY, SOLID basics)
- Debugging, Testing & Git
- Web, APIs & Database Basics

### Mid-Level
- Data Structures, Algorithms & Performance
- Software Design & Refactoring
- Databases, APIs & Security
- Concurrency & Observability

### Senior
- System Design (scalability, CAP theorem, caching)
- Architecture & Tradeoffs (microservices, migrations)
- Production & Incident Response
- Leadership & Engineering Judgment

## Tech Stack

- Vite + React + TypeScript
- React Router for navigation
- Browser SpeechSynthesis API for read-aloud
- Pure CSS (no CSS framework)
- All quiz data in local TypeScript files

## Expanding the Quiz

To add questions, edit the files in `src/data/`. Each question follows the `Question` type in `src/types/quiz.ts`.

## Build

```bash
npm run build
```

Produces a static `dist/` folder you can host anywhere.
