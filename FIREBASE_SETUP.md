# Firebase Setup Guide

This guide will walk you through setting up Firebase for your role-based authentication system.

## 🚀 Firebase Console Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter your project name
4. Enable Google Analytics (optional but recommended)
5. Select or create a Google Analytics account
6. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:

#### Email/Password
- Click on "Email/Password"
- Enable both "Email/Password" and "Email link (passwordless sign-in)"
- Save

#### Google
- Click on "Google" 
- Enable the toggle
- Add your project's domain to authorized domains
- Save

#### Authentication Settings
- Go to **Authentication** > **Settings** > **User actions**
- Enable "Email verification" for enhanced security

### 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location close to your users
5. Click "Done"

### 4. Enable Storage (Optional)

1. Go to **Storage**
2. Click "Get started"
3. Review security rules (we'll customize them)
4. Choose same location as Firestore
5. Click "Done"

## 🔧 Security Rules Deployment

### Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Replace the default rules with the content from `firestore.rules`
3. Click **Publish**

#### Test Your Rules
```javascript
// Test in Firebase Console > Firestore > Rules > Simulator

// Test 1: User reading their own profile
// Authentication: Authenticated as user123
// Path: /users/user123
// Operation: read
// Should: Allow ✅

// Test 2: User reading another user's profile  
// Authentication: Authenticated as user123
// Path: /users/user456
// Operation: read  
// Should: Deny ❌

// Test 3: Admin reading any user profile
// Authentication: Authenticated as admin-user (with role: admin)
// Path: /users/user456
// Operation: read
// Should: Allow ✅
```

### Storage Security Rules

1. Go to **Storage** > **Rules**
2. Replace with content from `storage.rules`
3. Click **Publish**

## 🔐 Environment Configuration

### 1. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" > Web app icon `</>`
4. Register your app with a nickname
5. Copy the configuration object

### 2. Update .env.local

Create or update your `.env.local` file:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF123 # Optional, for Google Analytics
```

## 👤 Create First Admin User

Since there's no admin user initially, you need to create one manually:

### Method 1: Register and Promote (Recommended)

1. Start your application: `npm run dev`
2. Register a new account normally through the UI
3. Go to Firebase Console > **Firestore Database**
4. Find your user document in the `users` collection
5. Edit the document and change `role` from `"customer"` to `"admin"`
6. Save the document
7. Refresh your app - you now have admin access!

### Method 2: Direct Firestore Creation

1. Go to Firebase Console > **Firestore Database**
2. Click "Start collection" and name it `users`
3. Add a document with your user ID as the document ID
4. Add these fields:
   ```json
   {
     "uid": "your-auth-uid",
     "email": "admin@example.com", 
     "displayName": "Admin User",
     "role": "admin",
     "createdAt": 1640995200000
   }
   ```

## 🛡️ Security Best Practices

### 1. Environment Security
- Never commit `.env.local` to version control
- Add `.env.local` to your `.gitignore`
- Use different Firebase projects for development/production
- Rotate API keys regularly in production

### 2. Authentication Security
- Always require email verification in production
- Enable App Check for additional security
- Monitor authentication attempts in Firebase Console
- Set up authentication triggers for suspicious activity

### 3. Database Security
- Test your Firestore rules thoroughly
- Use the Rules Simulator in Firebase Console
- Implement proper data validation
- Regular security audits of your rules

### 4. Storage Security
- Limit file sizes appropriately
- Validate file types on both client and server
- Implement virus scanning for uploaded files
- Use signed URLs for sensitive files

## 📊 Monitoring and Analytics

### 1. Enable Crashlytics
```bash
npm install firebase
# Add Crashlytics to your app for error monitoring
```

### 2. Performance Monitoring
```bash
# Add Performance Monitoring for app performance insights
```

### 3. Security Monitoring
- Monitor Authentication logs
- Set up alerts for suspicious activities  
- Regular security rule audits
- Monitor Storage access patterns

## 🔄 Firebase CLI Setup (Optional)

For advanced operations and local development:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize your project
firebase init

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules

# Run local emulators
firebase emulators:start
```

### Local Emulator Configuration

Create `firebase.json`:
```json
{
  "firestore": {
    "rules": "firestore.rules"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Permission Denied Errors**
   - Check Firestore rules
   - Verify user authentication
   - Ensure correct user role in database

2. **CORS Issues**
   - Add your domain to Firebase authorized domains
   - Check Authentication settings

3. **Storage Upload Failures**
   - Verify Storage rules
   - Check file size and type restrictions
   - Ensure user has proper role

4. **Email Verification Not Working**
   - Check spam folder
   - Verify Authentication settings
   - Ensure authorized domains are configured

### Debug Tools

1. **Firebase Console Logs**
   - Authentication logs
   - Firestore request logs
   - Storage access logs

2. **Browser Developer Tools**
   - Network tab for Firebase requests
   - Console for JavaScript errors
   - Application tab for local storage

3. **Firebase Emulator Suite**
   - Test rules locally
   - Debug without affecting production
   - Simulate different user scenarios

## 📱 Production Deployment

### Pre-deployment Checklist

- [ ] Security rules tested and deployed
- [ ] Environment variables configured
- [ ] Email verification enabled
- [ ] Authorized domains updated
- [ ] App Check configured (recommended)
- [ ] Monitoring and alerts set up
- [ ] Backup strategy implemented

### Deployment Steps

1. Update authorized domains in Authentication settings
2. Deploy security rules: `firebase deploy --only firestore:rules,storage:rules`
3. Test authentication flow on production domain
4. Monitor initial user registrations
5. Verify admin functionalities work correctly

---

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Storage Security](https://firebase.google.com/docs/storage/security)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

Your Firebase backend is now ready for production use! 🎉