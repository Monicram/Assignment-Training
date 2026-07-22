# HTTP Status Codes

## 200 OK
The request was successful.
Eg: A user requests `/users` and the server returns the user list.

## 201 Created
A new resource was created successfully.
Eg: A new user account is created after registration.

## 400 Bad Request
The request contains invalid data.
Eg: Required fields are missing in a form submission.

## 401 Unauthorized
Authentication is required or failed.
Eg: A user tries to access an API without logging in.

## 403 Forbidden
The user is authenticated but does not have permission.
Eg: A normal user tries to access the admin dashboard.

## 404 Not Found
The requested resource does not exist.
Eg: Visiting `/profile/1000` when no such profile exists.

## 500 Internal Server Error
The server encountered an unexpected error.
Eg: The application crashes because of a database connection failure.