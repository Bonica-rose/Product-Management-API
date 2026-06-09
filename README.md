# Product Management API

A simple Product Management REST API built with Express.js using mock data stored in memory.

## Features

- Get all products
- Get single product
- Create product
- Update product
- Partially update product
- Delete product
- Search products
- Sort products
- Pagination
- Validation Middleware
- REST API

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

Server:

```txt
http://localhost:5000
```

## API Endpoints

### Get Products

```http
GET /products
```

### Get Product

```http
GET /products/:id
```

### Create Product

```http
POST /products
```

### Update Product

```http
PUT /products/:id
```

### Partial Update

```http
PATCH /products/:id
```

### Delete Product

```http
DELETE /products/:id
```

### Search

```http
GET /products?keyword=laptop
```

### Pagination

```http
GET /products?page=1&limit=5
```

### Sort

```http
GET /products?sort=price
```

## Tech Stack

- Node.js
- Express.js
- JavaScript