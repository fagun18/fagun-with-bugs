import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

// GitHub OAuth Routes
app.get('/auth/github', (req, res) => {
    // Generate a secure state to prevent CSRF
    const state = crypto.randomBytes(16).toString('hex');
    
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('redirect_uri', process.env.GITHUB_CALLBACK_URL);
    githubAuthUrl.searchParams.set('scope', 'user:email');
    githubAuthUrl.searchParams.set('state', state);

    res.json({ 
        authorizationUrl: githubAuthUrl.toString(),
        state 
    });
});

app.post('/auth/github/callback', async (req, res) => {
    const { code, state } = req.body;

    if (!code || !state) {
        return res.status(400).json({ error: 'Missing code or state' });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.GITHUB_CALLBACK_URL,
            state
        }, {
            headers: {
                'Accept': 'application/json'
            }
        });

        const { access_token, error } = tokenResponse.data;

        if (error) {
            return res.status(401).json({ error: 'OAuth token exchange failed' });
        }

        // Fetch user information
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${access_token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const user = userResponse.data;

        // Create a secure JWT or session token (simplified for this example)
        const token = crypto.randomBytes(32).toString('hex');

        res.json({
            user: {
                id: user.id,
                login: user.login,
                name: user.name,
                avatar: user.avatar_url,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error('GitHub OAuth Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Authentication failed', 
            details: error.response ? error.response.data : error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 OAuth Server running on http://localhost:${PORT}`);
});
