

# RakhtSetu - Blood Donation Platform 🩸

RakhtSetu, meaning **"Blood Bridge"**, is a full-stack, responsive blood donation platform designed to save lives by bridging the gap between donors, recipients, hospitals, and organizers. It features a modern frontend UI and a robust backend architecture to ensure a seamless experience during emergencies and regular blood donation drives.

## 🌟 Key Features

- **Donor Registration & Authentication**: Secure JWT-based authentication system with dedicated profiles for Donors, Hospitals, and Admins.
- **Interactive Routing**: Fast, multi-page routing via `react-router-dom` (v7) for easy navigation.
- **Emergency Needs Dashboard**: Specialized real-time emergency dashboard to list immediate blood requests.
- **Smart Donor Matching**: Geographic and blood-type compatibility checks to find the correct donor fast.
- **Campaigns & Drives Management**: Dedicated pages to manage and participate in upcoming massive blood donation drives.
- **Live API Documentation**: In-app documentation for developers to understand and integrate with the RakhtSetu API.
- **Database Schema Visualization**: Transparent view of the underlying data structures.
- **RESTful API**: Node & Express backend with industry-standard safety tools including Helmet, express-rate-limit, and data sanitization.

---

## 🛠️ Tech Stack

### Frontend 
*   **React 19** (Vite 6 build system)
*   **TypeScript** for type-safety across components
*   **Tailwind CSS** (via CDN with custom config) for rapid, responsive styling
*   **React Router v7** for seamless navigation
*   **Lucide React** for modern iconography
*   **Leaflet** for interactive mapping

### Backend
*   **Node.js & Express.js**
*   **MongoDB (Mongoose ODM)** 
*   **JWT** for stateless authentication
*   **Security Suite**: Helmet, Morgan, Express Rate Limit, Mongo Sanitize, XSS-Clean

---

## 📂 Project Structure

- `./` -> **Frontend**: Built with Vite, React, and TypeScript.
- `./server` -> **Backend**: Constructed with Express, featuring controllers, models, routes, and robust security middleware.
- `./components` -> UI components for the frontend.
- `./context` -> Context providers (e.g., AuthContext).

---

## 🚀 Run Locally

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (Running locally on `27017` or a MongoDB Atlas URI)

### 1. Setting up the Backend

```bash
cd server
npm install

# The server requires a .env file. You can create one manually or via:
# MONGO_URI=mongodb://localhost:27017/rakhtsetu
# PORT=5000
# JWT_SECRET=your_super_secret_key
# NODE_ENV=development

npm run dev
```
The server will be available at `http://localhost:5000`.

### 2. Setting up the Frontend

Open a new terminal session in the **root** folder:

```bash
npm install
npm run dev
```
The web platform will be available at `http://localhost:3000`.

---

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

