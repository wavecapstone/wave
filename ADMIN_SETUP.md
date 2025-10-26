# Admin Account Setup Guide

## Issue: "Account Not Found" or "User not found in system"

This error occurs when an admin user exists in Firebase Authentication but doesn't have a corresponding Firestore document.

## How to Set Up Admin Accounts

### Option 1: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Navigate to **Authentication** → **Users**
3. Find the admin user's email
4. Note their **User UID**

5. Navigate to **Firestore Database**
6. Go to the `users` collection
7. Create a new document with the User UID as the document ID
8. Add the following fields:
   ```json
   {
     "email": "admin@example.com",
     "fullName": "Admin User",
     "createdAt": "2025-01-01T00:00:00.000Z",
     "isAdmin": true
   }
   ```
   **Important:** Set `isAdmin` to `true` for admin access

### Option 2: Create Admin User Through App (Temporary Workaround)

If you need immediate access, you can sign up through the regular user sign-up flow, then manually update the Firestore document:

1. Sign up using the regular **Sign Up** page
2. Go to **Firestore Database** in Firebase Console
3. Find the document in the `users` collection
4. Edit the document and change `isAdmin` from `false` to `true`

### Option 3: Programmatic Setup (For Developers)

Create an admin user programmatically:

```javascript
// In Firebase Console or through an admin script
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from './config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Create the user
const userCredential = await createUserWithEmailAndPassword(
  auth, 
  'admin@example.com', 
  'secure-password'
);

// Create the Firestore document with admin privileges
await setDoc(doc(firestore, 'users', userCredential.user.uid), {
  email: 'admin@example.com',
  fullName: 'Admin User',
  createdAt: new Date().toISOString(),
  isAdmin: true  // This is the key field
});
```

## Verifying Admin Setup

1. The admin user should have a document in Firestore:
   - Collection: `users`
   - Document ID: User UID
   - Field `isAdmin` must be `true`

2. Check the User ID shown in the error message:
   - The error will display the User UID
   - Use this ID to create/find the Firestore document

## Security Notes

- Only set `isAdmin: true` for trusted users
- Regular users created through sign-up will have `isAdmin: false` by default
- Admin users cannot login through the regular User Login screen (they'll be redirected to Admin Login)
- Regular users cannot access the Admin Login screen

## Troubleshooting

### "Account Not Found" Error
- User exists in Firebase Auth but has no Firestore document
- Solution: Create the Firestore document as described above

### "Access Denied - Admin privileges required"
- User exists in Firestore but `isAdmin` is `false`
- Solution: Update the `isAdmin` field to `true` in Firestore

### Firebase Rules
Make sure your Firestore rules allow reading user documents:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

