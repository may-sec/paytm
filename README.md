# 💸 PayTM - Digital Payment Platform

A full-stack digital payment application inspired by PayTM, enabling users to send and receive money securely with real-time balance updates.

## 🚀 Features

- **User Authentication**: Secure signup/signin with JWT tokens
- **Dashboard**: View account balance and search for users
- **Money Transfer**: Send money to other users with transaction validation
- **Transaction History**: Track all sent and received payments
- **Profile Management**: Update personal information and password
- **Responsive Design**: Mobile-first UI built with Tailwind CSS
- **Protected Routes**: Secure pages accessible only to authenticated users
- **Real-time Balance Updates**: Instant balance refresh after transactions

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive components
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - ODM for MongoDB with schema validation
- **JWT** - JSON Web Tokens for authentication
- **Zod** - Schema validation library
- **CORS** - Cross-Origin Resource Sharing middleware

### DevOps & Deployment
- **Vercel** - Serverless deployment platform
- **Git & GitHub** - Version control and collaboration

## 📁 Project Structure
```
paytm/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Dashboard, Signin, etc.)
│   │   └── main.jsx       # Application entry point
│   └── package.json
├── backend/               # Express server
│   ├── routes/            # API route handlers
│   │   ├── user.js        # User authentication routes
│   │   ├── account.js     # Account & transaction routes
│   │   └── index.js       # Route aggregator
│   ├── db.js              # MongoDB connection & models
│   ├── middleware.js      # Authentication middleware
│   └── index.js           # Server entry point
└── vercel.json            # Deployment configuration
```

## 🔧 Key Technical Implementation

### Transaction Safety
- Used MongoDB sessions and transactions for atomic operations
- Implemented balance validation before transfers
- Prevented race conditions with proper session handling

### Authentication Flow
1. User signs up/signs in → JWT token generated
2. Token stored in localStorage
3. Token sent in Authorization header for protected routes
4. Backend middleware validates token and extracts userId
5. Invalid/expired tokens redirect to signin page

### API Endpoints

**User Routes** (`/api/v1/user`)
- `POST /signup` - Create new user account
- `POST /signin` - Authenticate user
- `PUT /` - Update user profile (protected)
- `GET /bulk` - Search users by name

**Account Routes** (`/api/v1/account`)
- `GET /balance` - Get user balance (protected)
- `POST /transfer` - Transfer money to another user (protected)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB
- Git