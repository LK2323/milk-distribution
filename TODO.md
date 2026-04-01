# Login Implementation for Milk Distribution System

## Completed Tasks

- [x] Create login.html with form for role selection (admin/user), username, and password
- [x] Add authentication logic in app.js (password: "admin")
- [x] Implement session-based login using sessionStorage
- [x] Add login check to redirect unauthenticated users to login page
- [x] Add logout button to header for authenticated users
- [x] Integrate login functionality with existing app structure

## Features Implemented

- Role-based login (Admin/User)
- Simple password authentication ("admin")
- Session management
- Automatic redirect to login for protected pages
- Logout functionality
- Error message display for invalid credentials

## Usage

1. Open login.html or any page - will redirect to login if not authenticated
2. Select role (Admin or User)
3. Enter username (default: admin) and password (admin)
4. Click Login to access the system
5. Use Logout button in header to log out
