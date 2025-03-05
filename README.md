# WarrantyMe Assignment - Full Stack Developer

## Overview
This is a full-stack web application developed as part of the WarrantyMe Full Stack Developer assignment. It allows users to sign in with Google, create and edit text-based letters, and save them to Google Drive as Google Docs. The app is deployed online and versioned on GitHub.

## Features
- **Google OAuth Authentication**: Secure sign-in using Google accounts with JWT-based session management.
- **Letter Creation & Editing**: A simple text editor for writing and editing letters.
- **Google Drive Integration**: Saves letters to the user’s Google Drive as "Letter.docx" in Google Docs format.

## Technology Stack
- **Frontend**: React (Create React App), React Router, Axios
- **Backend**: Node.js, Express, Passport.js (Google OAuth), Google APIs Client, JWT
- **Deployment**: Vercel (frontend and backend), GitHub (source code)

## Deployed Application
- **Frontend**: https://warrantyme-frontend.vercel.app
- **Backend**:  https://warrantyme-backend.vercel.app
- **GitHub Repository**: [https://github.com/Prasanth-malla/warrantyme-app](https://github.com/Prasanth-malla/warrantyme-app)

## Prerequisites
- Node.js (v20.12.1 or later)
- npm (Node Package Manager)
- Google Cloud Console account with OAuth credentials
- Vercel CLI (for deployment)

## Local Setup Instructions
### Clone the Repository
```bash
git clone https://github.com/Prasanth-malla/warrantyme-app.git
cd warrantyme-app
```

### Backend Setup
Navigate to backend:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a `.env` file with your Google OAuth credentials:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
JWT_SECRET=your-secret-key
```
Run the backend:
```bash
node index.js
```

### Frontend Setup
Navigate to frontend:
```bash
cd ../frontend
```
Install dependencies:
```bash
npm install
```
Run the frontend:
```bash
npm start
```
Access at `http://localhost:3000`.

## Google Cloud Configuration
1. Create a project in Google Cloud Console.
2. Enable Google Drive API and OAuth Consent Screen.
3. Set redirect URI to `http://localhost:5000/auth/google/callback` (local) or deployed backend URL.
4. Add test users (e.g., your email, reviewer’s email).

## Deployment Instructions
### Install Vercel CLI
```bash
npm install -g vercel
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

### Deploy Backend
Ensure `vercel.json` is present:
```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```
Deploy:
```bash
cd ../backend
vercel --prod
```
Add environment variables in Vercel dashboard or during deployment.

### Update URLs
- In `frontend/src/App.js`, replace `http://localhost:5000` with your backend URL.
- Redeploy frontend.

## Testing
- **Local**: Sign in at `http://localhost:3000`, write a letter, save to Drive.
- **Deployed**: Use deployed frontend URL, ensure test users are added in Google Cloud.

## Notes
- The app is in "Testing" mode in Google Cloud, requiring test user approval (e.g., inevitable4734@gmail.com, warrantyme.co@gmail.com added for review).
- Full Google verification pending due to time constraints (3-day deadline).

## Author
**Name**: Malla Prasanth  
**Email**: mallaprasanth1234@gmail.com  
**Phone**: +91 78939 13302

