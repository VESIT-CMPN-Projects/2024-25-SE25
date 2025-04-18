# MahaTowing - Digitalising Towing Operations with Technology

A full-stack web application for managing vehicle towing services, built with React, Node.js, and MongoDB.

## Features

- Modern, responsive UI built with React and Tailwind CSS
- Secure authentication and authorization
- Real-time vehicle tracking and management
- Payment integration with Razorpay
- SMS notifications using Twilio
- Comprehensive admin dashboard
- RESTful API architecture

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Query
- React Router DOM
- React Hook Form
- Zod for validation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Razorpay Integration
- Twilio Integration

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mahatowing.git
cd mahatowing
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add necessary environment variables (see `.env.example`)

## 🚀 Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start the server
- `npm run dev` - Start server with nodemon
- `npm test` - Run tests

## Configuration

The application requires several environment variables to be set up. Create a `.env` file in the backend directory with the following variables:

```
# Server Configuration
PORT=5005

# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=rto_management
DB_PORT=5432
```

Note: Make sure to replace `your_password` with your actual database password. Never commit the `.env` file with real credentials to version control.

## API Documentation

The API documentation is available at `/api-docs` when running the server in development mode.

## License

This project is licensed under the ISC License.

## Authors

- Diksha Patkar
- Pradnya Patil
- Sonal Patil
- Pranjal Ahuja
