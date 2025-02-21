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
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// GitHub OAuth Routes
app.get('/auth/github', (req, res) => {
    try {
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
    } catch (error) {
        console.error('GitHub Authorization URL Generation Error:', error);
        res.status(500).json({ 
            error: 'Failed to generate authorization URL',
            details: error.message 
        });
    }
});

app.post('/auth/github/callback', async (req, res) => {
    const { code, state } = req.body;

    if (!code || !state) {
        return res.status(400).json({ 
            error: 'Missing code or state',
            details: 'Both authorization code and state are required' 
        });
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

        const { access_token, error, error_description } = tokenResponse.data;

        if (error) {
            console.warn('GitHub Token Exchange Error:', error, error_description);
            return res.status(401).json({ 
                error: 'OAuth token exchange failed',
                details: error_description 
            });
        }

        // Fetch user information
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${access_token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const user = userResponse.data;

        // Create a secure session token
        const token = crypto.randomBytes(32).toString('hex');

        // Optional: Log successful authentication
        console.log(`User authenticated: ${user.login} (${user.name})`);

        res.json({
            user: {
                id: user.id,
                login: user.login,
                name: user.name,
                avatar: user.avatar_url,
                email: user.email || 'Not provided'
            },
            token
        });

    } catch (error) {
        console.error('GitHub OAuth Complete Error:', {
            message: error.message,
            response: error.response ? error.response.data : 'No response',
            stack: error.stack
        });

        res.status(500).json({ 
            error: 'Authentication failed', 
            details: error.response ? error.response.data : error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString() 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found', 
        details: 'The requested endpoint does not exist' 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error', 
        details: err.message 
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 OAuth Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing HTTP server.');
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
});
