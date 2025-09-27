# Firebase + React Role-Based Authentication System

A complete end-to-end authentication system built with Firebase, React, TypeScript, and Tailwind CSS featuring role-based access control (RBAC).

## 🚀 Features

### Authentication
- ✅ Email/Password registration and login
- ✅ Google OAuth integration
- ✅ Email verification requirement
- ✅ Protected routes with authentication guards
- ✅ Automatic session management

### Role-Based Access Control (RBAC)
- ✅ Three user roles: **Admin**, **Store Owner**, **Customer**
- ✅ Role-specific dashboards and permissions
- ✅ Route protection based on user roles
- ✅ Admin user management interface

### UI/UX
- ✅ Built with shadcn/ui components
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Clean and modern interface

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Routing**: React Router DOM v7

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Navbar.tsx          # Main navigation
│   └── LoadingSpinner.tsx  # Loading component
├── context/
│   └── AuthContext.tsx     # Authentication context provider
├── hooks/
│   └── useAuth.ts          # Authentication hook
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   ├── roles.ts            # Role definitions and helpers
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Landing.tsx         # Home/landing page
│   ├── Login.tsx           # Login page
│   ├── Register.tsx        # Registration page
│   ├── VerifyEmail.tsx     # Email verification page
│   └── Dashboard/
│       ├── AdminDashboard.tsx     # Admin dashboard
│       ├── StoreDashboard.tsx     # Store owner dashboard
│       └── CustomerDashboard.tsx  # Customer dashboard
├── routes/
│   ├── Router.tsx          # Main routing configuration
│   ├── ProtectedRoute.tsx  # Authentication guard
│   └── RolesRoute.tsx      # Role-based route guard
└── services/
    ├── userService.ts      # User profile management
    └── adminService.ts     # Admin-only operations
```

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd your-project-directory
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Copy your Firebase config to `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Setup Firestore Security Rules

Copy the rules from `FIREBASE_RULES.md` to your Firebase Console > Firestore > Rules.

### 4. Configure Google OAuth (Optional)

1. Go to Firebase Console > Authentication > Sign-in method
2. Enable Google provider
3. Add your domain to authorized domains

### 5. Run the Application

```bash
npm run dev
```

## 👤 User Roles

### Customer (Default)
- Browse products
- Place orders
- View order history
- Manage personal profile

### Store Owner
- All customer permissions
- Create and manage products
- View and manage orders
- Access store analytics
- Manage store profile

### Admin
- All permissions
- Manage all users
- Promote users to admin
- Change user roles
- Access system-wide analytics
- Manage all stores and products

## 🔐 Security Features

### Route Protection
```tsx
// Authentication required
<ProtectedRoute>
  <DashboardComponent />
</ProtectedRoute>

// Role-based access
<RoleRoute allow={[ROLES.ADMIN, ROLES.STORE]}>
  <AdminPanel />
</RoleRoute>
```

### User Profile Management
- Automatic profile creation on registration
- Role assignment during signup
- Admin-controlled role modifications
- Email verification enforcement

### Firestore Security
- User data isolation
- Role-based read/write permissions
- Admin override capabilities
- Authentication requirement for all operations

## 🚀 Usage Examples

### Authentication Hook
```tsx
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, role, signOut, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  
  return (
    <div>
      <p>Welcome, {user?.displayName}</p>
      <p>Role: {role}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Role Checking
```tsx
import { hasRole, ROLES } from '@/lib/roles'

function AdminButton() {
  const { role } = useAuth()
  
  if (!hasRole(role, ROLES.ADMIN)) {
    return null
  }
  
  return <button>Admin Action</button>
}
```

## 🎨 Customization

### Adding New Roles
1. Update `src/lib/roles.ts`
2. Add new dashboard components
3. Update routing configuration
4. Modify Firestore security rules

### Styling
- Modify Tailwind classes in components
- Update `tailwind.config.ts` for theme customization
- Add new shadcn/ui components as needed

## 🔄 State Management

The authentication state is managed through React Context:
- `AuthProvider` wraps the entire app
- `useAuth` hook provides access to auth state
- Automatic profile synchronization with Firestore
- Persistent sessions across browser refreshes

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**: Ensure all dependencies are installed
2. **Firebase configuration errors**: Check your `.env.local` file
3. **Permission denied**: Verify Firestore security rules
4. **Email verification**: Check spam folder, ensure SMTP is configured
5. **Google OAuth issues**: Verify authorized domains in Firebase Console

### First Admin User

To create your first admin user:
1. Register a regular account
2. Go to Firebase Console > Firestore
3. Find your user document in the `users` collection
4. Change the `role` field from `customer` to `admin`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Firebase, React, and TypeScript