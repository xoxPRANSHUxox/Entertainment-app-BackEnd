# Entertainment-app-BackEn
This repository contains the backend code for the Bookmark Management System, a web application that allows users to manage their favorite movies and TV shows. The backend is built with **Node.js** and **Express.js**, and it uses **MongoDB** as the database for storing user-specific bookmark data.

---

## Features

- **User-Specific Bookmarks**: Stores and manages bookmarks tied to individual user accounts.
- **Secure API Endpoints**: Handles requests for fetching, adding, and deleting bookmarks with robust error handling.
- **Firebase Integration**: Uses Firebase authentication to identify and authenticate users.
- **Scalable Design**: Efficient MongoDB schema to manage bookmark details.

---

## Prerequisites

- **Node.js**: v14 or higher
- **MongoDB**: A running instance of MongoDB (local or cloud-based)
- **Firebase**: Set up Firebase Authentication

---
## Routes
/models        # Contains Mongoose schema for Bookmark
/routes        # API routes for managing bookmarks
/server.js     # Entry point for the application

# Technologies Used
Node.js: Server-side runtime
Express.js: Framework for building APIs
MongoDB: Database for storing bookmarks
Firebase: Authentication provider

# Future Enhancements
Add endpoints for updating bookmark details.
Implement pagination for fetching bookmarks.
Include support for additional user preferences.
