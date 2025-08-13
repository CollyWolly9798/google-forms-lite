# 📋 Google Forms Lite Clone

> A modern, simplified clone of Google Forms with intuitive form creation, filling, and response management capabilities.

![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![GraphQL](https://img.shields.io/badge/GraphQL-Powered-e10098)
![React](https://img.shields.io/badge/React-19-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## ✨ Features

- **🏗️ Form Builder**: Create forms with text, multiple choice, and checkbox questions
- **📝 Form Filling**: Responsive interface for completing forms
- **📊 Response Management**: View and analyze form responses
- **🔄 Real-time Data**: GraphQL API with RTK Query for efficient data fetching
- **🎯 TypeScript**: Full type safety with auto-generated GraphQL types

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Redux Toolkit** + RTK Query for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **GraphQL Code Generator** for type generation

### Backend
- **Node.js** + GraphQL + Apollo Server
- **JSON file storage** for data persistence
- **UUID** for unique identifiers

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **PNPM** v8+ ([Install](https://pnpm.io/installation))

### Installation
```bash
# Clone and install
git clone <repository-url>
cd google-forms-lite
pnpm install

# Generate GraphQL types
cd client && pnpm codegen && cd ..

# Start development servers
pnpm dev
```

**🎯 Access your application:**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql

## 📁 Project Structure

```
google-forms-lite/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── api/              # RTK Query + GraphQL integration
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Route components
│   │   ├── graphql/          # GraphQL queries/mutations
│   │   └── redux/            # Redux store
│   └── package.json
├── server/                    # GraphQL Backend
│   ├── src/
│   │   ├── data/             # JSON data storage
│   │   ├── resolvers/        # GraphQL resolvers
│   │   ├── schema/           # GraphQL schema
│   │   └── utils/            # Utilities
│   └── package.json
└── package.json               # Workspace configuration
```

## 🎯 Usage Guide

### Creating Forms
1. Click **"Create Form"** on homepage
2. Add title, description, and questions
3. Choose question types: Text, Multiple Choice, or Checkboxes
4. Add options for choice/checkbox questions
5. Click **"Save Form"**

### Filling Forms
1. Click **"Fill form"** on any form
2. Answer all questions
3. Click **"Submit"** to save responses

### Viewing Responses
1. Click **"Check answers"** on any form
2. View all submitted responses with statistics

## 🔧 Development Commands

```bash
# Root commands
pnpm dev          # Start both client and server
pnpm format       # Format code with Prettier

# Client commands (cd client)
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm codegen      # Generate GraphQL types

# Server commands (cd server)
pnpm dev          # Start with auto-reload
```

###  Improvements
- **Server TypeScript Migration**: Convert entire backend to TypeScript for better type safety and development experience
- **Enhanced Error Handling**: Implement comprehensive error boundaries and user-friendly error messages
- **Database Migration**: Replace JSON files with PostgreSQL/MongoDB for better scalability
- **Authentication System**: Add user accounts and form ownership
- **First-Time GraphQL Implementation**: My first experience working with GraphQL — learned by reading official documentation and leveraging AI assistance to understand queries, mutations, and schema design


