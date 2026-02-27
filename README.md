<div align="center">
 <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
 </div>
 
 # RakhtSetu - Blood Donation Platform
 
 RakhtSetu is a blood donation platform that helps connect donors, recipients, and organizers.
 
 ## Features
 
 - Donor registration and management
 - Create and manage blood requests
 - Campaign endpoints for drives/events
 - Authentication (JWT)
 - Basic API security middleware (Helmet, rate limiting, sanitization)
 
 ## Tech Stack
 
 - Frontend: React + Vite + TypeScript
 - Backend: Node.js + Express
 - Database: MongoDB (Mongoose)
 
 ## Project Structure
 
 - `./` Frontend (Vite)
 - `./server` Backend API (Express)
 
 ## Run Locally
 
 ### Prerequisites
 
 - Node.js
 - MongoDB (local or cloud)
 
 ### Backend (API)
 
 1. Install dependencies:
 
    `cd server`
    `npm install`
 
 2. Create a `.env` file inside `server/`:
 
    `MONGO_URI=mongodb://localhost:27017/rakhtsetu`
    `PORT=5000`
 
 3. Run the backend:
 
    `npm run dev`
 
 Backend should start on `http://localhost:5000` (or the `PORT` you set).
 
 ### Frontend (Web)
 
 1. Install dependencies:
 
    `npm install`
 
 2. Run the frontend:
 
    `npm run dev`
 
 Vite will show the local URL in your terminal.
