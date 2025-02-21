# Secure GitHub OAuth Backend

## Overview
A secure, production-ready GitHub OAuth backend service built with Node.js and Express.

## Prerequisites
- Node.js (v16+)
- npm or yarn
- GitHub OAuth App credentials

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/sqatesting-oauth-backend.git
cd sqatesting-oauth-backend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment
Create a `.env` file in the project root:
```
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5500/auth/callback
FRONTEND_URL=http://localhost:5500
JWT_SECRET=your_super_secret_key
```

## GitHub OAuth App Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Homepage URL to your frontend URL
4. Set Authorization callback URL to match `GITHUB_CALLBACK_URL`

## Running the Server

### Development Mode
```bash
npm run dev
# Uses nodemon for auto-reloading
```

### Production Mode
```bash
npm start
```

## Security Features
- CORS protection
- State-based CSRF prevention
- Secure token generation
- Environment-based configuration
- Comprehensive error handling

## Endpoints

### GET `/auth/github`
- Generates GitHub authorization URL
- Returns `authorizationUrl` and `state`

### POST `/auth/github/callback`
- Exchanges GitHub code for access token
- Retrieves user information
- Returns user profile and session token

### GET `/health`
- Server health check endpoint

## Troubleshooting
- Verify GitHub OAuth App settings
- Check network connectivity
- Ensure environment variables are correctly set

## Best Practices
- Never commit `.env` file
- Rotate secrets regularly
- Use HTTPS in production
- Implement additional authentication layers

## License
MIT License

## Contributing
Contributions are welcome! Please read our contributing guidelines.
