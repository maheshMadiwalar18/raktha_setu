<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# RakhtSetu - Blood Donation Platform 🩸

RakhtSetu meaning "Blood Bridge", is a full-stack, responsive blood donation platform designed to save lives by bridging the gap between donors, recipients, hospitals, and organizers. With its modern frontend UI and robust backend architecture, it ensures a seamless experience during emergencies and regular blood donation drives.

## 🌟 Key Features

- **Donor Registration & Authentication**: Secure JWT-based authentication system with dedicated profiles for Donors, Hospitals, and Admins.
- **Interactive Routing**: Fast, multi-page routing via `react-router-dom` for easy navigation between features like Campaigns, Donors, and Dashboards.
- **Emergency Needs Dashboard**: Specialized real-time emergency dashboard to list immediate blood requests.
- **Smart Donor Matching**: Geographic and blood-type compatibility checks to find the correct donor fast.
- **Blood Campus & Drives Management**: Dedicated pages to manage and participate in upcoming massive blood donation drives.
- **RESTful API**: Node & Express backend with industry-standard safety tools including Helmet, express-rate-limit, and data sanitization.

---

## 🛠️ Tech Stack

### Frontend 
*   **React 18** (Vite builds)
*   **TypeScript** for type-safety across components
*   **Tailwind CSS** for rapid styling and highly responsive components
*   **React Router v6** for single-page routing without reloads
*   **Lucide React** for modern iconography

### Backend
*   **Node.js & Express.js**
*   **MongoDB (Mongoose ODM)** 
*   **JWT** for headless stateless authentication

---

## 📂 Project Structure

- `./` -> The Frontend built with Vite, React, and TypeScript.
- `./server` -> The Backend constructed with Express, featuring controllers, models, routes, and robust security middleware.

---

## 🚀 Run Locally

### Prerequisites

You need the following installed:
- Node.js (v18+)
- MongoDB (running locally on `27017` or a MongoDB Atlas URI)

### 1. Starting the Backend (API Server)

```bash
cd server
npm install

# Create your .env file
echo MONGO_URI=mongodb://localhost:27017/rakhtsetu > .env
echo PORT=5000 >> .env
echo JWT_SECRET=your_super_secret_key >> .env

# Run the backend
npm run dev
```
The server will now be listening on `http://localhost:5000`.

### 2. Starting the Frontend (Web Platform)

Open a new terminal session in the **root** folder:

```bash
# In the project root
npm install

# Start the Vite development build
npm run dev
```

Depending on your Vite configuration, the web app will be available at `http://localhost:3000` or `http://localhost:5173`.
