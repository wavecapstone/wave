<<<<<<< HEAD
# wave
Wave Capstone
=======
# Wave Mobile App

A React Native mobile application with authentication pages and global styling.

## Features

- **Sign Up Page**: Full Name, Email Address, and Password fields with validation
- **Login Page**: Email and Password authentication
- **Forgot Password Page**: Email-based password reset
- **Admin Login Page**: Separate admin authentication
- **Home Page**: Different views for regular users and admins
- **Global Styles**: Consistent styling across all pages

## Project Structure

```
wave/
├── screens/
│   ├── user/                    # User-facing screens
│   │   ├── LoginScreen.js       # User login
│   │   ├── SignUpScreen.js      # User sign up
│   │   ├── ForgotPasswordScreen.js  # Password reset
│   │   └── HomeScreen.js        # User home/dashboard
│   ├── admin/                   # Admin screens
│   │   └── AdminLoginScreen.js  # Admin authentication
├── styles/
│   └── globalStyles.js          # Global styling (no local stylesheets)
├── auth/
│   └── google-services.json     # Firebase configuration
└── App.js                       # Main app with navigation
```

## Pages

### User Screens (`/screens/user/`)

1. **Sign Up Screen** (`SignUpScreen.js`)
   - Full Name input field
   - Email Address input field
   - Password input field
   - Form validation
   - Navigation to Login page

2. **Login Screen** (`LoginScreen.js`)
   - Email and Password fields
   - Forgot Password link
   - Navigation to Sign Up and Admin Login

3. **Forgot Password Screen** (`ForgotPasswordScreen.js`)
   - Email input for password reset
   - Success confirmation
   - Navigation back to Login

4. **Home Screen** (`HomeScreen.js`)
   - Different features for regular users vs admins
   - Logout functionality
   - Feature placeholders with alerts

### Admin Screens (`/screens/admin/`)

5. **Admin Login Screen** (`AdminLoginScreen.js`)
   - Admin ID and Password fields
   - Admin-specific styling
   - Navigation to Admin Home

## Styling

- **Global Styles** (`/styles/globalStyles.js`)
  - Consistent color scheme
  - Reusable component styles
  - Responsive design
  - No local stylesheets (as requested)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For Web
   ```

## Dependencies

- React Native
- Expo
- React Navigation (Stack Navigator)
- React Native Screens
- React Native Safe Area Context
- React Native Gesture Handler

## Navigation Flow

```
Login Screen (Initial)
├── Sign Up Screen
├── Forgot Password Screen
├── Admin Login Screen
└── Home Screen (User/Admin)
```

## Notes

- All forms include client-side validation
- Simulated API calls with loading states
- Responsive design for different screen sizes
- Clean, modern UI with consistent styling
- No local stylesheets - all styles are global
>>>>>>> f4597f1 (Initial commit)
