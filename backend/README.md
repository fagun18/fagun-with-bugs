# Secure GitHub OAuth Backend

## Prerequisites
- Node.js (v16+)
- npm

## Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following:
   ```
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=http://localhost:5500/auth/callback
   FRONTEND_URL=http://localhost:5500
   JWT_SECRET=your_super_secret_key
   ```

## Running the Server
- Development: `npm run dev`
- Production: `npm start`

## Security Notes
- Never expose `.env` file
- Rotate secrets regularly
- Use HTTPS in production

## OAuth Flow
1. Frontend requests authorization URL
2. Backend generates secure state
3. User redirects to GitHub
4. GitHub redirects back to callback
5. Backend exchanges code for token
6. Backend returns user info and token

## Troubleshooting
- Ensure GitHub OAuth App settings match callback URL
- Check network connectivity
- Verify environment variables
