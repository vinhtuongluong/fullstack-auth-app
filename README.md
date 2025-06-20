# Fullstack Authentication App

A full-stack authentication application built with NestJS (backend) and Next.js (frontend), featuring modern authentication flows, user management and a modular architecture.

## Features

- User registration and login with email/password
- Email verification and code-based activation
- Password reset and change functionality
- JWT-based authentication (backend)
- Admin dashboard and user dashboard
- Modular, scalable codebase

## Tech Stack

- **Frontend:** Next.js, Ant Design, Auth.js
- **Backend:** NestJS, JWT, Nodemailer, Bcrypt, Passport
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js (v20.11.1 recommended)
- MongoDB
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vinhtuongluong/fullstack-auth-app.git
   cd fullstack-auth-app
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables:

   - Copy `.env.example` to `.env` in both `backend` and `frontend` folders and fill in the required values.

4. Start the backend and frontend servers:
   ```bash
   cd backend && npm start
   cd ../frontend && npm run dev
   ```
5. Access the application:
   - Visit `http://localhost:3000` in your browser to access the application.

## API Endpoints

- `/auth/register`: Register a new user.
- `/auth/login`: Log in with email and password.

## License

This project is licensed under the MIT License.
