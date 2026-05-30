# Ecommerce Backend API

A RESTful Ecommerce Backend built with:

* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie-based Auth
* Multer
* ImageKit
* Express Validator

---

# Base URL

```http
http://localhost:5000
```

---

# Authentication

Authentication is handled using:

* JWT Token
* HTTP Only Cookies

After successful login or registration, a cookie named:

```txt
token
```

is automatically set.

Protected routes require a valid token cookie.

---

# Response Format

All successful responses follow:

```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {}
}
```

---

# Error Format

All errors follow:

```json
{
  "message": "Error message"
}
```

---

# Auth Routes

Base Path:

```http
/api/auth
```

---

## Health Check

### Request

```http
GET /api/auth/check
```

### Authentication

❌ Not Required

### Success Response

```json
"Auth route is working"
```

---

## Register User

### Request

```http
POST /api/auth/register
```

### Authentication

❌ Not Required

### Required Fields

| Field    | Type   | Required |
| -------- | ------ | -------- |
| name     | string | ✅        |
| email    | string | ✅        |
| password | string | ✅        |

### Request Body

```json
{
  "name": "Abhinav",
  "email": "abhinav@example.com",
  "password": "123456"
}
```

### Validation Rules

#### name

* Cannot be empty

#### email

* Must be valid email

#### password

* Minimum 6 characters

### Success Response

Status Code:

```http
201 Created
```

```json
{
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "_id": "684123456789",
    "name": "abhinav",
    "email": "abhinav@example.com",
    "createdAt": "2026-05-30T08:00:00.000Z",
    "updatedAt": "2026-05-30T08:00:00.000Z"
  }
}
```

### Possible Errors

#### Email Already Exists

```json
{
  "message": "Email already exist"
}
```

#### Invalid Email

```json
{
  "message": "Invalid email"
}
```

#### Password Too Short

```json
{
  "message": "Password must be at least 6 characters"
}
```

---

## Login User

### Request

```http
POST /api/auth/login
```

### Authentication

❌ Not Required

### Required Fields

| Field    | Type   | Required |
| -------- | ------ | -------- |
| email    | string | ✅        |
| password | string | ✅        |

### Request Body

```json
{
  "email": "abhinav@example.com",
  "password": "123456"
}
```

### Success Response

Status Code:

```http
200 OK
```

```json
{
  "statusCode": 200,
  "message": "User loggedIn",
  "data": {
    "_id": "684123456789",
    "name": "abhinav",
    "email": "abhinav@example.com"
  }
}
```

### Cookie Set

```txt
token=<jwt_token>
```

### Possible Errors

#### Invalid Credentials

```json
{
  "message": "Invalid credentials"
}
```

#### Invalid Email

```json
{
  "message": "Invalid email"
}
```

---

## Logout User

### Request

```http
POST /api/auth/logout
```

### Authentication

✅ Required

### Cookie Required

```txt
token
```

### Success Response

```json
{
  "statusCode": 200,
  "message": "User logged out",
  "data": null
}
```

### Possible Errors

#### Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

# Product Routes

Base Path:

```http
/api/products
```

---

## Health Check

### Request

```http
GET /api/products/check
```

### Authentication

❌ Not Required

### Response

```json
"Product route is working"
```

---

## Get All Products

### Request

```http
GET /api/products
```

### Authentication

❌ Not Required

### Optional Query Params

| Query    | Type   |
| -------- | ------ |
| category | string |

### Example

```http
GET /api/products?category=electronics
```

### Success Response

```json
{
  "statusCode": 200,
  "message": "fetched all products",
  "data": [
    {
      "_id": "123",
      "name": "iphone",
      "price": 999,
      "category": "electronics",
      "images": []
    }
  ]
}
```

---

## Get Single Product

### Request

```http
GET /api/products/:id
```

### Authentication

❌ Not Required

### Example

```http
GET /api/products/684123456789
```

### Success Response

```json
{
  "statusCode": 200,
  "message": "fetched single product",
  "data": {
    "_id": "684123456789",
    "name": "iphone",
    "price": 999,
    "category": "electronics"
  }
}
```

### Possible Errors

#### Invalid Product Id

```json
{
  "message": "Invalid product id"
}
```

#### Product Not Found

```json
{
  "message": "Product not found"
}
```

---

## Create Product

### Request

```http
POST /api/products
```

### Authentication

✅ Required

### Content Type

```txt
multipart/form-data
```

### Required Fields

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| name        | string | ✅        |
| price       | number | ✅        |
| description | string | ❌        |
| category    | string | ❌        |
| images      | file[] | ❌        |

### Image Limits

* Maximum 4 images

### Example Form Data

```txt
name=Iphone 15
price=999
description=Latest iphone
category=electronics
images=file1.jpg
images=file2.jpg
```

### Success Response

```json
{
  "statusCode": 201,
  "message": "Product created successfully",
  "data": {
    "_id": "684123456789",
    "name": "iphone 15",
    "price": 999,
    "description": "Latest iphone",
    "category": "electronics",
    "images": [
      "https://ik.imagekit.io/example1.jpg",
      "https://ik.imagekit.io/example2.jpg"
    ]
  }
}
```

### Possible Errors

#### Missing Name

```json
{
  "message": "Product name is required"
}
```

#### Missing Price

```json
{
  "message": "Price is required"
}
```

#### Invalid Price

```json
{
  "message": "Price must be a number"
}
```

#### Negative Price

```json
{
  "message": "Price cannot be negative"
}
```

#### Too Many Images

```json
{
  "message": "Maximum 4 images are allowed"
}
```

#### Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

## Update Product

### Request

```http
PUT /api/products/:id
```

### Authentication

✅ Required

### Content Type

```txt
multipart/form-data
```

### All Fields Optional

| Field       | Type   |
| ----------- | ------ |
| name        | string |
| price       | number |
| description | string |
| category    | string |
| images      | file[] |

### Example Form Data

```txt
name=Updated Iphone
price=1099
images=file1.jpg
```

### Success Response

```json
{
  "statusCode": 200,
  "message": "Product updated",
  "data": {
    "_id": "684123456789",
    "name": "updated iphone",
    "price": 1099
  }
}
```

### Possible Errors

#### Invalid Product Id

```json
{
  "message": "Invalid product id"
}
```

#### Product Not Found

```json
{
  "message": "Product not found"
}
```

#### Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

## Delete Product

### Request

```http
DELETE /api/products/:id
```

### Authentication

✅ Required

### Success Response

```json
{
  "statusCode": 200,
  "message": "Product deleted",
  "data": null
}
```

### Possible Errors

#### Invalid Product Id

```json
{
  "message": "Invalid product id"
}
```

#### Product Not Found

```json
{
  "message": "Product not found"
}
```

#### Unauthorized

```json
{
  "message": "Unauthorized"
}
```

---

# Cookie Configuration

```javascript
{
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production"
    ? "none"
    : "lax",
  maxAge: 60 * 60 * 1000
}
```

---

# Authentication Flow

```text
Register/Login
        │
        ▼
Generate JWT
        │
        ▼
Store JWT in Cookie
        │
        ▼
Protected Route Request
        │
        ▼
Auth Middleware
        │
        ▼
Verify Token
        │
        ▼
Allow Access
```

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Multer
* ImageKit
* Express Validator
* Morgan
* Cookie Parser


# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

NODE_ENV=development

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-endpoint
```

## Variable Description

| Variable | Description |
|-----------|-------------|
| PORT | Port on which the Express server will run |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key used to sign and verify JWT tokens |
| NODE_ENV | Application environment (`development` or `production`) |
| IMAGEKIT_PUBLIC_KEY | ImageKit public API key |
| IMAGEKIT_PRIVATE_KEY | ImageKit private API key |
| IMAGEKIT_URL_ENDPOINT | ImageKit URL endpoint for serving uploaded files |

---

# Project Setup

## 1. Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment File

Create a `.env` file in the project root and add all required environment variables.

## 4. Start Development Server

```bash
npm run dev
```

Server will start on:

```txt
http://localhost:3000
```

---

# Required Services

## MongoDB

Create a MongoDB Atlas cluster or use a local MongoDB instance.

Update:

```env
MONGODB_URI=
```

with your connection string.

---

## ImageKit

This project uses ImageKit for product image storage.

### Setup

1. Create an account at ImageKit.
2. Open the Dashboard.
3. Copy:
   - Public Key
   - Private Key
   - URL Endpoint

4. Add them to your `.env` file:

```env
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

---

# Production Notes

Before deploying:

```env
NODE_ENV=production
```

This automatically enables:

- Secure cookies
- SameSite=None cookies

Cookie configuration:

```js
{
  httpOnly: true,
  secure: true,
  sameSite: "none"
}
```

---

# Security Warning

Never commit:

```env
JWT_SECRET
IMAGEKIT_PRIVATE_KEY
MONGODB_URI
```

to GitHub.

Add `.env` to `.gitignore`:

```gitignore
.env
```
