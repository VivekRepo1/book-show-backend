# Book-Show

A Node.js TypeScript Mongo application for managing tickets for shows and events.

## Features

- Built with TypeScript for enhanced type safety and developer experience
- Express.js server with secure middleware setup
- MongoDB integration using Mongoose
- Security enhanced with Helmet middleware
- Environment variable support with dotenv

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v20 or higher)
- npm (v6 or higher)
- MongoDB (v6.4 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/VivekRepo1/book-show-backend.git
cd bookShow
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookShow
```

## Available Scripts

- `npm start` - Runs the compiled application
- `npm run dev` - Starts the development server with hot-reload
- `npm run build` - Compiles TypeScript to JavaScript
- `npm run lint` - Runs ESLint for code quality checks

## Development Setup

1. Start the development server:
```bash
npm run dev
```

2. The server will start on `http://localhost:3000` (or the port specified in your .env file)

3. For development, the server will automatically restart when files change

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic handlers
├── utils/          # utility functions
├── types/          # TypeScript type definitions
└── server.ts       # Application entry point
```

## Code Quality

This project uses:
- TypeScript for static typing
- ESLint for code linting
- Prettier for code formatting

## Building for Production

1. Compile the TypeScript code:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Dependencies

### Main Dependencies
- express: Web framework for Node.js
- mongoose: MongoDB object modeling tool
- cors: Cross-origin resource sharing middleware
- helmet: Security middleware
- dotenv: Environment variable management

### Development Dependencies
- typescript: TypeScript language support
- ts-node: TypeScript execution engine
- nodemon: Development server with auto-reload
- eslint: Code linting
- @types/*: TypeScript type definitions

---