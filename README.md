
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

### 4.Post 

**Endpoint:** `/post`  
**Method:** `POST`  

**Request Parameters:**
- image (file, required): image for posting.
- caption (string, required): caption for image post

**Request Example:**

{
  "image": "post file",
  "caotion": "about post"
}
**Response Example:**
{
    "message": "post created succcessful",
    "savedPost": {
        "user": "669693e",
        "image": "https://res.cloudinary.com/dfhznayn4/image/upload/v172zphgwhci.png",
        "caption": "new added cap 1",
        "likes": [],
        "comments": [],
        "_id": "6697e301c",
        "createdAt": "2024-07-17T15:28:03.875Z",
        "updatedAt": "2024-07-17T15:28:03.875Z",
    }
}

**Endpoint:** /post/:id
**Method:** `GET`  

**Description:**
Get the post by id 

**Endpoint:** /get-all-post
**Method:** `GET`  

**Description:**
Get the all the post of logged-id user

**Endpoint:** `/update-post-caption/:id`  
**Method:** `PUT`  

**Request Parameters:**
- caption (string, required): caption for update post caption

**Request Example:**

{
  {
    "newUpdatedCaption":"i am updated caption"
}
}
**Response Example:**
{
    "message": "Post updated successfully",
    "updatedPost": {
        "_id": "66975e",
        "user": "69df3e",
        "image": "image url",
        "caption": "i am updated caption",
        "likes": [],
        "comments": [],
        "createdAt": "2024-07-17T06:02:17.624Z",
        "updatedAt": "2024-07-17T16:13:17.072Z",
    }
}

**Endpoint:** /delete-post/:id`  
**Method:** `DELETE`  

**Description:**
Delete the post and also delete the like and comment on that post

**Response Example:**
{
    "message": "Post has been deleted and associated like and comment also deleted"
}


### 5. Comment 

**Endpoint:** `/add-comment/:id`  
**Method:** `POST`  

**Request Parameters:**
- comment (string, required): caption for update post caption

**Request Example:**
{
    "comment":"like comment"
}
**Response Example:**
{
    "message": "Comment added successfully",
    "comment": {
        "user": "66969b9a8d96438ae549df3e",
        "post": "6697d10b87140e7915c8df4b",
        "comment": "like comment",
        "_id": "6697efc6e11a77573a0ba256",
        "createdAt": "2024-07-17T16:22:30.739Z",
        "updatedAt": "2024-07-17T16:22:30.739Z",
        "__v": 0
    },
    "updatedPost": {
        "_id": "6697d10b87140e7915c8df4b",
        "user": "66969b9a8d96438ae549df3e",
        "image": "https://res.cloudinary.com/dfhznayn4/image/upload/v1721225482/ATG/hzafxiqfoz1jmuyb9a8j.png",
        "caption": "new added post",
        "likes": [
            "6697d7ec5a7d7713a3fc2faf"
        ],
        "comments": [
            {
                "_id": "6697d9702db33065945d862a",
                "user": "66969b9a8d96438ae549df3e",
                "post": "6697d10b87140e7915c8df4b",
                "comment": "like comment",
                "createdAt": "2024-07-17T14:47:12.053Z",
                "updatedAt": "2024-07-17T14:47:12.053Z",
                "__v": 0
            },
            {
                "_id": "6697d9722db33065945d862f",
                "user": "66969b9a8d96438ae549df3e",
                "post": "6697d10b87140e7915c8df4b",
                "comment": "like comment",
                "createdAt": "2024-07-17T14:47:14.187Z",
                "updatedAt": "2024-07-17T14:47:14.187Z",
                "__v": 0
            },
            {
                "_id": "6697d9732db33065945d8634",
                "user": "66969b9a8d96438ae549df3e",
                "post": "6697d10b87140e7915c8df4b",
                "comment": "like comment",
                "createdAt": "2024-07-17T14:47:15.819Z",
                "updatedAt": "2024-07-17T14:47:15.819Z",
                "__v": 0
            },
            {
                "_id": "6697ef98e11a77573a0ba251",
                "user": "66969b9a8d96438ae549df3e",
                "post": "6697d10b87140e7915c8df4b",
                "comment": "like comment",
                "createdAt": "2024-07-17T16:21:44.670Z",
                "updatedAt": "2024-07-17T16:21:44.670Z",
                "__v": 0
            },
            {
                "_id": "6697efc6e11a77573a0ba256",
                "user": "66969b9a8d96438ae549df3e",
                "post": "6697d10b87140e7915c8df4b",
                "comment": "like comment",
                "createdAt": "2024-07-17T16:22:30.739Z",
                "updatedAt": "2024-07-17T16:22:30.739Z",
                "__v": 0
            }
        ],
        "createdAt": "2024-07-17T14:11:23.181Z",
        "updatedAt": "2024-07-17T16:22:30.802Z",
        "__v": 0
    }
}



**Endpoint:** `/get-comment/:id`  
**Method:** `GET`  

**Description:**
get comment by id


**Response Example:**
{
    "commentDetails": {
        "user": "669e",
        "post": "8df4b",
        "text": "like comment",
        "createdAt": "2024-07-17T16:22:30.739Z"
    }
}


**Endpoint:** `/get-all-comment-on-post/:id`  
**Method:** `GET`  

**Description:**
get all comment on posy by post id


**Response Example:**
[
    {
        "_id": "5f267",
        "user": {
            "_id": "6df3e",
            "username": "test1"
        },
        "post": "6697d259",
        "comment": "hello i am  comment",
        "createdAt": "2024-07-17T14:20:33.869Z",
        "updatedAt": "2024-07-17T14:20:33.869Z",
    },
    
]



**Endpoint:** `/update-comment/:id`  
**Method:** `PUT`  

**Request Parameters:**
- comment (string, required): new comment for updation

**Request Example:**

{
    "editedComment":"hello i am not comment"
}
**Response Example:**
{
    "message": "Comment updated successfully",
    "updatedComment": {
        "_id": "66271",
        "user": "6df3e",
        "post": "59",
        "comment": "hello i am not comment",
        "createdAt": "2024-07-17T14:20:37.395Z",
        "updatedAt": "2024-07-17T16:31:28.618Z",
        "__v": 0
    }
}

**Endpoint:** `/update-comment/:id`  
**Method:** `PUT`  

**Request Parameters:**
- comment (string, required): new comment for updation

**Request Example:**

{
    "editedComment":"hello i am not comment"
}
**Response Example:**
{
    "message": "Comment deleted successfully",
    "updatedPost": {
        "_id": "6697d3259",
        "user": "a8d96",
        "image": "post url",
        "caption": "new added cap 1",
        "likes": [],
        "comments": [
            "6697d326c",
            "6f276"
        ],
        "createdAt": "2024-07-17T14:20:00.849Z",
        "updatedAt": "2024-07-17T16:33:58.785Z",
        "__v": 0
    }
}

### 6 . Like

**Endpoint:** `/get-all-like/:id`  
**Method:** `POST`  


**Response Example:**
{
    "message": "Liked"
}

**Endpoint:** `/like-post/:id`  
**Method:** `GET`  


**Response Example:**
[
    {
        "_id": "668d",
        "user": {
            "_id": "643f3e",
            "username": "test1"
        },
        "post": "66",
        "createdAt": "2024-07-17T14:24:35.085Z",
        "updatedAt": "2024-07-17T14:24:35.085Z",
        "__v": 0
    },
    
]
