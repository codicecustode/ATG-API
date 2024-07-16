
## Authentication
- None required for the endpoints provided.

## Endpoints

### 1. Sign Up

**Endpoint:** `/signup`  
**Method:** `POST`  

**Request Parameters:**
- `username` (string, required): The desired username.
- `password` (string, required): The desired password.
- `email` (string, required): The user's email address.

**Request Example:**

{
  "username": "john_doe",
  "password": "securepassword123",
  "email": "john@example.com"
}

**Response Example:**
{
    "user": {
        "username": "atg@",
        "password": "YOl4cKWxZWXRze1GC",
        "email": "sni@gmaeil.com",
        "_id": "6690296b",
        "__v": 0
    },
    "token": "eyJhbGciOiI6ImpZCI6IjY2OTAyODM5NwmSlg5vXygXzU"
}

### 2.Log In

**Endpoint:** `/login`  
**Method:** `POST`  

**Request Parameters:**
- username (string, required): The username of the user.
- password (string, required): The password of the user.

**Request Example:**

{
  "username": "john_doe",
  "password": "securepassword123"
}
**Response Example:**
{
    "message": "user login successful",
    "token": "nQCIsImlkIj7BxeMMDTvrWo",
    "username": "atg@",
    "email": "sni@gmail.com"
}

### 3. Reset Password

**Endpoint:** `/reset-password`  
**Method:** `POST`  

**Request Parameters:**
- username (string, required): The username of the user.
- password (string, required): The password of the user.

**Request Example:**

{
  "email": "john@example.com"
  "username":"exaple@"
  "newpassword":"securepassword"
}

**Response Example:**
{
    "message": "Password reset successful"
}




