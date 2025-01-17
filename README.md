# CV Builder API

## Setup Steps

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database and get your connection string
   - Add connection string to MONGO_URI in .env

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in required values:
     - PORT
     - JWT_SECRET
     - MONGO_URI
     - GOOGLE_CLIENT_ID
     - GOOGLE_CLIENT_SECRET
     - FACEBOOK_APP_ID
     - FACEBOOK_APP_SECRET

5. Start server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /cv` - Create CV
- `GET /cv/:id` - Get CV by ID
- `GET /cv/user` - Get user's CVs
- `DELETE /cv/:id` - Delete CV
- `PUT /cv/:id` - Edit CV