import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();

// Determine port and environment
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PRODUCTION_DOMAIN = 'sqatesting.com';

// Configure CORS with dynamic origin handling
const ALLOWED_ORIGINS = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',') 
    : [
        'https://sqatesting.com', 
        'http://localhost:5500', 
        'http://127.0.0.1:5500',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ];

// Enhanced logging function
function logEvent(type, details) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        type,
        ...details
    };
    console.log(JSON.stringify(logEntry));
}

// Middleware for logging and CORS
app.use((req, res, next) => {
    const origin = req.get('origin');
    const host = req.get('host');
    
    // Log incoming request
    logEvent('request_received', {
        method: req.method,
        path: req.path,
        origin: origin || 'unknown',
        host: host || 'unknown'
    });

    // Dynamic CORS handling
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

app.use(express.json());

// Explicit route handling for production and development
function handleGitHubAuthRoute(req, res) {
    try {
        // Validate environment configuration
        if (!process.env.GITHUB_CLIENT_ID) {
            logEvent('oauth_error', {
                message: 'GitHub Client ID is not configured',
                severity: 'critical'
            });
            return res.status(500).json({ 
                error: 'OAuth configuration is incomplete',
                details: 'GitHub Client ID is missing' 
            });
        }

        // Generate a secure state to prevent CSRF
        const state = crypto.randomBytes(16).toString('hex');
        
        const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
        githubAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
        githubAuthUrl.searchParams.set('redirect_uri', process.env.GITHUB_CALLBACK_URL);
        githubAuthUrl.searchParams.set('scope', 'user:email');
        githubAuthUrl.searchParams.set('state', state);

        // Log successful authorization URL generation
        logEvent('oauth_authorization_url_generated', {
            state: state,
            redirectUri: process.env.GITHUB_CALLBACK_URL
        });

        res.status(200).json({ 
            authorizationUrl: githubAuthUrl.toString(),
            state 
        });
    } catch (error) {
        // Comprehensive error logging
        logEvent('oauth_error', {
            message: 'Failed to generate GitHub authorization URL',
            error: error.message,
            stack: error.stack,
            severity: 'high'
        });

        res.status(500).json({ 
            error: 'Failed to generate authorization URL',
            details: error.message 
        });
    }
}

// Add routes for both production and development domains
app.get('/auth/github', handleGitHubAuthRoute);

// Root route for health check
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found', 
        details: 'The requested endpoint does not exist' 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logEvent('server_error', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Server creation with flexible configuration
function createServer() {
    if (IS_PRODUCTION) {
        // In production, use HTTPS if certificates are available
        const sslOptions = {
            key: fs.existsSync(path.resolve('./ssl/privkey.pem')) 
                ? fs.readFileSync(path.resolve('./ssl/privkey.pem')) 
                : null,
            cert: fs.existsSync(path.resolve('./ssl/fullchain.pem')) 
                ? fs.readFileSync(path.resolve('./ssl/fullchain.pem')) 
                : null
        };

        return sslOptions.key && sslOptions.cert 
            ? https.createServer(sslOptions, app)
            : http.createServer(app);
    }
    
    // Development: always use HTTP
    return http.createServer(app);
}

// Start server
const server = createServer();
server.listen(PORT, () => {
    logEvent('server_start', {
        port: PORT,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing server.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
