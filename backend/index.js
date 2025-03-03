const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: 'https://warrantyme-frontend.vercel.app' })); // Update with your frontend URL
app.use(express.json());
app.use(passport.initialize());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://warrantyme-backend.vercel.app/auth/google/callback' // Update with your backend URL
}, (accessToken, refreshToken, profile, done) => {
  const user = { id: profile.id, accessToken };
  return done(null, user);
}));

// Routes
app.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file'] 
}));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`https://warrantyme-frontend.vercel.app/callback?token=${token}&accessToken=${req.user.accessToken}`);
});

app.post('/save-letter', async (req, res) => {
  const { accessToken, content } = req.body;
  console.log('Received:', { accessToken, content }); // Debug log
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  const drive = google.drive({ version: 'v3', auth });

  try {
    const file = await drive.files.create({
      requestBody: {
        name: 'Letter.docx',
        mimeType: 'application/vnd.google-apps.document'
      },
      media: {
        mimeType: 'text/plain',
        body: content
      }
    });
    res.json({ fileId: file.data.id });
  } catch (error) {
    console.error('Drive API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => res.send('Backend is running'));

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log('Backend running on port', process.env.PORT || 5000);
});