# Quotum Dashboard

A comprehensive cryptocurrency content management and analytics platform.

## Features

- Modern React frontend with clean UI
- Laravel backend with RESTful API
- Role-based authentication system
- Real-time cryptocurrency data integration
- Content Management System (CMS)
- User activity tracking
- Performance metrics

## Getting Started

### Prerequisites

- Node.js 16+
- PHP 8.1+
- Composer
- MySQL 8.0+

### Frontend Setup

1. Navigate to the project root:
```bash
cd quotum-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be available at http://localhost:3000

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Configure your database in `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quotum_dashboard
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the server:
```bash
php artisan serve
```

## API Documentation

All API endpoints are prefixed with `/api/dashboard`

### Authentication Endpoints

#### Register User
```
POST /api/dashboard/auth/register
```
Request body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

#### Login
```
POST /api/dashboard/auth/login
```
Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Dashboard Endpoints

#### Get Dashboard Statistics
```
GET /api/dashboard/stats
```
Response:
```json
{
  "completed_projects": "number",
  "projects_growth": "number",
  "performance": "number",
  "performance_change": "number"
}
```

#### Get Recent Content
```
GET /api/dashboard/content/recent
```
Response:
```json
[
  {
    "id": "number",
    "title": "string",
    "content": "string",
    "status": "string",
    "coin": {
      "id": "number",
      "name": "string",
      "symbol": "string"
    },
    "images": [
      {
        "id": "number",
        "url": "string"
      }
    ],
    "created_at": "datetime"
  }
]
```

#### Get Recent Activity
```
GET /api/dashboard/stats/recent-activity
```
Response:
```json
[
  {
    "id": "number",
    "user": "string",
    "action": "string",
    "timestamp": "datetime"
  }
]
```

### Content Management Endpoints

#### Get All Posts
```
GET /api/dashboard/content/posts
```

#### Create Post
```
POST /api/dashboard/content/posts
```
Request body (multipart/form-data):
```json
{
  "title": "string",
  "content": "string",
  "coin_id": "number",
  "status": "enum(draft,published)",
  "images[]": "file[]"
}
```

Response:
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "status": "string",
  "coin": {
    "id": "number",
    "name": "string",
    "symbol": "string"
  },
  "images": [
    {
      "id": "number",
      "url": "string"
    }
  ],
  "created_at": "datetime"
}
```

#### Update Post
```
PUT /api/dashboard/content/posts/{id}
```

#### Delete Post
```
DELETE /api/dashboard/content/posts/{id}
```

### Coin Management Endpoints

#### Get All Coins
```
GET /api/dashboard/coins
```

#### Get Coin Details
```
GET /api/dashboard/coins/{id}
```

#### Get Coin Posts
```
GET /api/dashboard/coins/{id}/posts
```

#### Create Coin Post
```
POST /api/dashboard/coins/{id}/posts
```

### Admin Endpoints

#### Get Users List
```
GET /api/dashboard/admin/users
```
Response:
```json
[
  {
    "id": "number",
    "name": "string",
    "email": "string",
    "is_active": "boolean",
    "created_at": "datetime"
  }
]
```

#### Activate/Deactivate User
```
POST /api/dashboard/admin/users/{user}/activate
POST /api/dashboard/admin/users/{user}/deactivate
```

#### Get Activity Log
```
GET /api/dashboard/admin/activity
```

#### Manage Coins (Admin Only)
```
POST /api/dashboard/admin/coins
```
Request body:
```json
{
  "name": "string",
  "symbol": "string",
  "coingecko_id": "string",
  "description": "string",
  "image_url": "string"
}
```
Response:
```json
{
  "id": "number",
  "name": "string",
  "symbol": "string",
  "coingecko_id": "string",
  "description": "string",
  "image_url": "string",
  "current_price": "number",
  "price_change_24h": "number",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

```
PUT /api/dashboard/admin/coins/{id}
```
Request body: Same as POST request
Response: Same as POST response

```
DELETE /api/dashboard/admin/coins/{id}
```
Response:
```json
{
  "message": "Coin deleted successfully"
}
```

#### System Settings
```
GET /api/dashboard/admin/settings
```
Response:
```json
{
  "price_update_interval": "number",
  "default_post_status": "string",
  "max_images_per_post": "number",
  "maintenance_mode": "boolean"
}
```

```
PUT /api/dashboard/admin/settings
```
Request body:
```json
{
  "price_update_interval": "number",
  "default_post_status": "string",
  "max_images_per_post": "number",
  "maintenance_mode": "boolean"
}
```
Response: Same as GET response

### Background Jobs

#### Update Coin Prices
```
POST /api/dashboard/jobs/update-coin-prices
```
Response:
```json
{
  "status": "string",
  "message": "string",
  "updated_coins": "number",
  "failed_coins": "number",
  "next_update": "datetime"
}
```

#### Get Job Status
```
GET /api/dashboard/jobs/status
```
Response:
```json
{
  "price_update_job": {
    "status": "string",
    "last_run": "datetime",
    "next_run": "datetime",
    "success_rate": "number"
  },
  "active_jobs": "number",
  "queued_jobs": "number",
  "failed_jobs": "number"
}
```

The API uses Laravel Sanctum for authentication. Include the authentication token in the request headers:

```
Authorization: Bearer {your_token}
```

## Role-Based Access Control

The application implements role-based access control with the following roles:
- Admin: Full access to all features
- User: Access to public content and personal dashboard

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "message": "Error message",
  "errors": {
    "field": ["Error details"]
  }
}
```

## Development

### Code Style
- Frontend: ESLint with Airbnb configuration
- Backend: PSR-12 coding standard

### Testing
```bash
# Frontend tests
npm test

# Backend tests
php artisan test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
