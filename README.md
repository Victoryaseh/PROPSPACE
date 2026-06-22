# PropSpace — Property Listing App

A full-stack property listing application built with React, Node.js/Express, and MongoDB.

## Features

- User registration & login with JWT authentication
- Salted & hashed passwords (bcryptjs)
- Profile management (name, phone, avatar) + password change
- Property CRUD: create, browse, update, delete listings
- Public feed with filters (city, price range, type)
- Private dashboard showing only the user's own listings
- Route guards on frontend; ownership checks on backend

## Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | React 18, Vite, Tailwind CSS     |
| Backend  | Node.js, Express                 |
| Database | MongoDB, Mongoose                |
| Auth     | JWT, bcryptjs                    |
| Forms    | React Hook Form                  |
| HTTP     | Axios (with request interceptor) |

## Project Structure

```
propspace/
├── backend/
│   └── src/
│       ├── config/        # MongoDB connection
│       ├── models/        # Mongoose schemas (User, Property)
│       ├── repositories/  # Database access layer
│       ├── services/      # Business logic layer
│       ├── controllers/   # Request/response handlers
│       ├── routes/        # Express route definitions
│       └── middleware/    # JWT auth middleware
└── frontend/
    └── src/
        ├── api/           # Axios instance with interceptors
        ├── context/       # AuthContext (global auth state)
        ├── components/    # Reusable UI components
        └── pages/         # Route-level page components
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # edit MONGO_URI and JWT_SECRET
npm run dev
```

Server starts on **http://localhost:5000**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App opens on **http://localhost:3000**

## API Endpoints

| Method | Endpoint                  | Auth | Description              |
| ------ | ------------------------- | ---- | ------------------------ |
| POST   | /api/auth/register        | No   | Register a new user      |
| POST   | /api/auth/login           | No   | Login and get JWT        |
| GET    | /api/users/me             | Yes  | Get current user profile |
| PUT    | /api/users/me             | Yes  | Update profile           |
| PUT    | /api/users/me/password    | Yes  | Change password          |
| GET    | /api/properties           | No   | Get all properties       |
| GET    | /api/properties/my-listings | Yes | Get my listings         |
| GET    | /api/properties/:id       | No   | Get single property      |
| POST   | /api/properties           | Yes  | Create a listing         |
| PUT    | /api/properties/:id       | Yes  | Update a listing (owner) |
| DELETE | /api/properties/:id       | Yes  | Delete a listing (owner) |
