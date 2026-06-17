# Vidora is a video-sharing platform inspired by modern streaming applications.

The project focuses on building a scalable backend architecture that supports video publishing, content discovery, user engagement, and account management.

## Features

### Authentication & Authorization

* JWT-based authentication
* Access Token & Refresh Token flow
* Protected routes
* Secure user session management

### User Management

* User registration and login
* User profile management
* Channel creation and management
* Username handling

### Video Management

* Upload videos
* Update video details
* Delete videos
* Publish and manage content
* View video metadata

### Engagement System

* Like and unlike videos
* Comment on videos
* Reply to comments
* Like comments and replies
* Subscription management

### Playlist Management

* Create playlists
* Add videos to playlists
* Remove videos from playlists
* Manage user collections

### Subscription System

* Subscribe to channels
* Unsubscribe from channels
* Track subscriber relationships

### Watch History

* Maintain user watch history
* Track viewing progress

### Data Aggregation

* Aggregation pipelines for complex data retrieval
* Channel statistics
* Subscriber counts
* Video engagement metrics

## Project Structure

```text
vidora/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── db/
│   └── package.json
│
├── frontend/
│
└── README.md
```

## Backend Architecture

Vidora follows a layered architecture:

```text
Client
   │
Routes
   │
Controllers
   │
Business Logic
   │
Database Models
   │
MongoDB
```

### Tech Stack

#### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cloudinary
* Multer

#### Frontend

* React (In Progress)

## API Modules

* Authentication
* Users
* Videos
* Comments
* Comment Replies
* Likes
* Subscriptions
* Playlists
* Watch History

## Learning Objectives

This project was built to gain practical experience with:

* REST API design
* Authentication systems
* MongoDB schema design
* Aggregation pipelines
* File uploads
* Backend architecture
* Resource ownership and authorization
* Scalable data modeling
* Production-style project organization

## Current Status

### Completed

* Authentication system
* User management
* Video management
* Comments and replies
* Likes system
* Subscription system
* Playlist management
* Watch history foundation
* Aggregation pipelines

### In Progress

* Frontend application
* Home feed implementation
* Video discovery experience

## Future Improvements

* Recommendation system
* Search functionality
* Notifications
* Real-time interactions
* Video processing pipeline
* Analytics dashboard

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd vidora
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=
MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## License

This project is built for learning, portfolio, and backend engineering practice.

