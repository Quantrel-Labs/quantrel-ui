# Firebase Security Rules

This file contains the Firestore security rules that should be deployed to your Firebase project to ensure proper access control.

## Firestore Security Rules

Copy and paste these rules into your Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read all user documents
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
      
      // Admins can update user roles
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    // Example: Store owners can manage their store data
    match /stores/{storeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "store" ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin");
    }
    
    // Example: Products - stores can manage their own products
    match /products/{productId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "store" ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin");
      allow update, delete: if request.auth != null && 
        (resource.data.ownerId == request.auth.uid ||
         (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin"));
    }
    
    // Example: Orders - users can read their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.customerId == request.auth.uid ||
         resource.data.storeOwnerId == request.auth.uid ||
         (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin"));
      
      allow create: if request.auth != null && request.auth.uid == request.resource.data.customerId;
      
      allow update: if request.auth != null && 
        (resource.data.storeOwnerId == request.auth.uid ||
         (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin"));
    }
  }
}
```

## Authentication Rules (Firebase Authentication)

These are automatically handled by Firebase Authentication, but make sure to:

1. Enable Email/Password authentication
2. Enable Google Sign-In
3. Configure email verification requirements
4. Set up proper OAuth redirect domains

## Setup Instructions

1. Go to Firebase Console > Your Project > Firestore Database
2. Click on "Rules" tab
3. Replace the existing rules with the rules above
4. Click "Publish" to deploy the rules

## Security Features

- **User Isolation**: Users can only access their own profile data
- **Role-Based Access**: Different permissions for admin, store, and customer roles
- **Admin Privileges**: Admins can read and modify all user data
- **Store Owner Rights**: Store owners can manage their own products and orders
- **Customer Protection**: Customers can only access their own orders and data
- **Authentication Required**: All operations require authentication

## Important Notes

- These rules assume email verification is enforced at the application level
- Modify the rules according to your specific data structure
- Test rules thoroughly before deploying to production
- Consider using Firebase Local Emulator Suite for testing