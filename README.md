# Product Catalog Management System
This project is a REST API for managing products. It is built using the AdonisJS framework and PostgreSQL database. Users can register, log in, and manage their own products, while all products are publicly viewable.


## Features
- User registration & login with JWT
- Product CRUD (Create, Read, Update, Delete)
- Pagination on product listing
- Centralized error handling
- Authorization: User can only modify their own products
  
[Behavorial Question Video](https://drive.google.com/file/d/1sxClFIb9ACxid8RzaKw130sfAjJNuHrO/view?usp=drive_link)

[API Demonstration Video](https://drive.google.com/file/d/1sxClFIb9ACxid8RzaKw130sfAjJNuHrO/view?usp=drive_link)

You can import the Postman collection [here](./Product%20Catalog%20API.postman_collection.json) to test the API endpoints easily.

## database schema
<img width="387" height="272" alt="be drawio" src="https://github.com/user-attachments/assets/ffe98691-6cbb-4d0b-828a-72bb1b6f0267" />


##  Base URL
http://localhost:3333
---

## Setup Project Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) 
- NPM
- Git

---

### 2. Clone Repository
```bash
git clone https://github.com/TigorBekerja/Product-Catalog-Management-System
cd <project-folder>
```
### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Edit env and set your database credentials.
```typescript
PORT=3333
HOST=localhost

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD="your_password"
DB_DATABASE="your_database"

JWT_SECRET=your_secret
```

### 5. Run database migration
```
node ace migration:run
```

### 6. Start server
```
npm run dev
```
API will run at http://localhost:3333

##  Endpoints

###  Users
#### `POST /auth/register`
Register with new email and password.

**Body (JSON):**
```json
{
  "email": "youremail@gmail.com",
  "password": "yourpass123",
}
```
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `email`         | email | Email for new user account.                        | Mandatory, unique    |
| `password` | string | Password to protect account.     | Mandatory, at least 6 character     |


**Response (JSON):**
```json
{
    "email": "adada@gmail.com",
    "createdAt": "2025-07-29T07:23:37.950+00:00",
    "updatedAt": "2025-07-29T07:23:37.950+00:00",
    "id": 6
}
```

#### `POST /auth/login`
login with email and password. If success, you will get a JWT token for accessing any protected routes.

**Body (JSON):**
```json
{
  "email": "youremail@gmail.com",
  "password": "yourpass123",
}
```
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `email`         | email | User account email.                        | Mandatory    |
| `password` | string | Account password.     | Mandatory, at least 6 character     |


**Response (JSON):**
```json
{
    "message": "Login successful",
    "token": "tokentoken123",
    "user": {
        "id": 6,
        "email": "adada@gmail.com",
        "createdAt": "2025-07-29T07:23:37.950+00:00",
        "updatedAt": "2025-07-29T07:23:37.950+00:00"
    }
}
```

#### `GET /profile`
Show profile based on JWT token.

Add Authorization as a key and 'Bearer JWT_token' as a value in Headers 
```
Authorization:bearer tokentoken123
```

**Response (JSON):**
```json
{
    "id": 6,
    "email": "adada@gmail.com",
    "createdAt": "2025-07-29T07:23:37.950+00:00",
    "updatedAt": "2025-07-29T07:23:37.950+00:00"
}
```

###  Items
#### `GET /items`
Show all items in Database, the default is 10 items per page and show the first page

**Response (JSON):**
```json
{
    "items": [
        {
            "id": 5,
            "userId": 4,
            "name": "aaaa",
            "description": "12313",
            "type": "asdads",
            "price": "123.00",
            "createdAt": "2025-07-29T06:09:55.023+00:00",
            "updatedAt": "2025-07-29T06:09:55.023+00:00"
        },
        {
            "id": 6,
            "userId": 4,
            "name": "bbbbb",
            "description": "12313",
            "type": "bbbbb",
            "price": "123.00",
            "createdAt": "2025-07-29T06:22:08.517+00:00",
            "updatedAt": "2025-07-29T06:22:08.517+00:00"
        },
        {
            "id": 7,
            "userId": 4,
            "name": "cccc",
            "description": "12313",
            "type": "cccc",
            "price": "123.00",
            "createdAt": "2025-07-29T06:25:02.867+00:00",
            "updatedAt": "2025-07-29T06:25:02.867+00:00"
        },
        {
            "id": 8,
            "userId": 4,
            "name": "dddd",
            "description": "12313",
            "type": "dddd",
            "price": "123.00",
            "createdAt": "2025-07-29T06:25:07.699+00:00",
            "updatedAt": "2025-07-29T06:25:07.699+00:00"
        }
    ],
    "total": 4,
    "page": 1,
    "totalPages": 1
}
```
**You can also add a custom limit per page and the page you wanted to see.**

Add limit and page as a query parameters

Example: http://localhost:3333/items?limit=1&page=1
```json
{
    "items": [
        {
            "id": 5,
            "userId": 4,
            "name": "aaaa",
            "description": "12313",
            "type": "asdads",
            "price": "123.00",
            "createdAt": "2025-07-29T06:09:55.023+00:00",
            "updatedAt": "2025-07-29T06:09:55.023+00:00"
        }
    ],
    "total": 4,
    "page": 1,
    "totalPages": 4
}
```
#### `POST /items`
**You must add Authorization JWT Token** *see more about Authorization at GET Profile section*

Add Products.

**Body (JSON):**
```json
{
  "name": "Ferrari",
  "description": "This is my dream",
  "type": "Luxury Car",
  "price": 10000000,
}
```
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `name`         | string | Product name.                        | Mandatory     |
| `description` | text | Product decription.     | Optional     |
| `type` | string | Product type.     | Mandatory     |
| `price` | decimal | Product price.     | Mandatory, maximum length is 12|

**Response (JSON):**
```json
{
    "message": "Product created",
    "product": {
        "name": "Ferrari",
        "type": "Luxury Car",
        "description": "This is my dream",
        "price": 10000000,
        "userId": 5,
        "createdAt": "2025-07-29T07:45:27.791+00:00",
        "updatedAt": "2025-07-29T07:45:27.791+00:00",
        "id": 11
    }
}
```

#### `PUT /items/:id`
**You must add Authorization JWT Token** *see more about Authorization at GET Profile section*

Update Products. All value is optional, if nothing is filled then nothing is changed.

Example: http://localhost:3333/items/11
**Body (JSON):**
```json
{
  "description": "This is not my dream anymore",
  "type": "normal Car",
}
```
| Name               | Type   | Description                                                                 | Rule                |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `name`         | string | Product name.                        | Optional     |
| `description` | text | Product decription.     | Optional     |
| `type` | string | Product type.     | Optional     |
| `price` | decimal | Product price.     | Optional, maximum length is 12|

**Response (JSON):**
```json
{
    "message": "product updated",
    "product": {
        "id": 11,
        "userId": 5,
        "description": "This is not my dream anymore",
        "type": "normal Car",
        "createdAt": "2025-07-29T07:45:27.791+00:00",
        "updatedAt": "2025-07-29T07:52:20.592+00:00"
    }
}
```

#### `DELETE /items/:id`
**You must add Authorization JWT Token** *see more about Authorization at GET Profile section*

Delete any item that belong to you. 

Example: http://localhost:3333/items/11 
``` json
{
    "message": "Product deleted",
}
```

##  Error Handling
All endpoints may return error responses with the following structure:
```json
{
  "message": "Description of the error"
  "errors": [
      {

      }
  ]
}
```

### 400 Bad Request
Occurs when the request body or query parameters are invalid.

```json
{
    "message": "Validation failed",
    "errors": [
        {
            "field": "type",
            "message": "type must be a string"
        }
    ]
}
```

### 401 Unauthorized
Occurs when a requested task is not granted because the product or the account didnt belong to you.
```json
{
  "message": "Invalid token"
}
```

### 404 Not Found
Occurs when a requested task is not found by ID.
```json
{
    "message": "Product not found"
}
```

### 500 Internal Server Error
Occurs when an unexpected error happens on the server.
```json
{
    "message": "Internal server error",
    "error": "unexpected error"
}
```
