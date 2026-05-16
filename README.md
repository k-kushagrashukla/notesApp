# notesApp Backend API

A multi-user notes backend service built with Node.js, Express.js, and MongoDB

## Features

- User Registration
- User Login with JWT Authentication
- Create Notes
- Get All Notes
- Get Note By ID
- Update Notes
- Delete Notes
- Share Notes with Other Users
- Full Text Search
- Pagination
- Note Version History
- Swagger/OpenAPI Documentation

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

## API Endpoints

### Auth

POST /register  
POST /login

### Notes

GET /notes  
GET /notes/:id  
POST /notes  
PUT /notes/:id  
DELETE /notes/:id  
POST /notes/:id/share

### Search

GET /notes/search?q=keyword

### History

GET /notes/:id/history

### Documentation

GET /openapi.json

### About

GET /about

---

## Setup Instructions

### Install Dependencies

```bash
npm install
```

### Create .env File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Run Server

```bash
npm run dev
```

---

## Deployment

Hosted on Render :)
