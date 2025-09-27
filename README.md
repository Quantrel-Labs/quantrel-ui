# AI Model & Agent Marketplace 🤖

A comprehensive platform for discovering, integrating, and publishing AI models and agents. Built with React, Firebase, and modern web technologies.

## 🌟 Features

### For AI Developers
- **API Usage Monitoring** - Track your AI model consumption and performance
- **Model Discovery** - Browse and integrate cutting-edge AI models and agents  
- **Credit Management** - Monitor API credits and usage costs
- **Performance Analytics** - View detailed usage statistics and trends

### For AI Providers  
- **Model Publishing** - Publish your AI models with detailed documentation
- **Revenue Tracking** - Monitor earnings and usage analytics
- **Image Upload** - Showcase your models with screenshots and demos
- **API Management** - Set pricing and manage capacity limits

### For Platform Administrators
- **User Management** - Comprehensive user role and permission control
- **System Oversight** - Monitor platform health and performance
- **Analytics Dashboard** - Platform-wide usage and revenue analytics
- **Content Moderation** - Review and approve AI model submissions

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **State Management**: React Context + Hooks

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-tailwind-shadcn-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password + Google)
   - Setup Firestore Database
   - Enable Firebase Storage
   - Copy your config to `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Deploy Firebase Security Rules**
   ```bash
   # Deploy Firestore rules
   firebase deploy --only firestore:rules
   
   # Deploy Storage rules  
   firebase deploy --only storage
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── ProductManagement.tsx  # AI model publishing interface
│   ├── ImageUpload.tsx       # Model screenshot uploader
│   └── LoadingSpinner.tsx    # Loading components
├── context/
│   └── AuthContext.tsx       # Authentication state management
├── hooks/
│   └── useAuth.tsx          # Authentication hook
├── lib/
│   ├── firebase.ts          # Firebase configuration
│   ├── productService.ts    # AI model CRUD operations
│   ├── userService.ts       # User management
│   └── roles.ts             # Role-based access control
├── pages/
│   ├── Dashboard/
│   │   ├── AdminDashboard.tsx    # Admin management interface
│   │   ├── CustomerDashboard.tsx # Developer usage dashboard  
│   │   └── StoreDashboard.tsx    # AI provider dashboard
│   ├── Dashboard.tsx        # Role-based dashboard router
│   ├── Landing.tsx          # Marketing landing page
│   ├── Login.tsx           # Authentication forms
│   └── Register.tsx        # User registration
├── routes/
│   └── Router.tsx          # Protected routing configuration
└── main.tsx
```

## 🔐 Authentication & Roles

### Role Types
- **customer**: AI developers using models and agents
- **store**: AI providers publishing models  
- **admin**: Platform administrators

### Authentication Methods
- Email/Password with verification
- Google OAuth integration
- Role-based dashboard redirection

## 🤖 AI Model Management

### Publishing Models
- Detailed model information forms
- Category selection (Language Models, Computer Vision, etc.)
- API pricing configuration (per 1K tokens/requests)
- Capacity management (available API calls)
- Screenshot and demo uploads
- Status management (Active/Inactive)

### Model Categories
- Language Models
- Computer Vision  
- Audio & Speech
- Data Analysis
- Code Generation
- Creative AI
- Robotics
- Recommendation Systems
- Security & Detection
- Healthcare AI

## 📊 Analytics & Monitoring

### For Developers
- API call tracking and usage trends
- Cost monitoring and credit management
- Model performance analytics
- Integration status monitoring

### For Providers
- Revenue and usage statistics
- Model performance metrics
- Developer adoption rates
- API call distribution

### For Admins
- Platform-wide usage analytics
- User growth and engagement
- Revenue tracking
- System health monitoring

## 🔒 Security Features

### Firebase Security Rules
- Role-based data access control
- User isolation and data protection
- Admin override capabilities
- Secure file upload validation

### Data Protection
- User authentication required for all operations
- Role-based route protection
- Secure API key management
- File upload size and type validation

## 🚀 Available Scripts

- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build  
- `npm run lint` - Run ESLint
- `firebase deploy` - Deploy to Firebase Hosting

## 📚 Documentation

- [Product Management Guide](./PRODUCT_MANAGEMENT_GUIDE.md) - Comprehensive guide to AI model publishing
- [Dashboard Guide](./DASHBOARD_GUIDE.md) - Role-specific dashboard documentation  
- [Firebase Setup](./FIREBASE_SETUP.md) - Detailed Firebase configuration steps

## 🛠️ Development

### Adding New AI Model Categories
1. Update categories array in `ProductManagement.tsx`
2. Update validation logic if needed
3. Test form functionality

### Extending Analytics
1. Add new metrics to dashboard components
2. Create corresponding Firebase queries
3. Update UI components with new data

### Role Management
1. Modify roles in `src/lib/roles.ts`
2. Update route protection logic
3. Add corresponding dashboard components

## 🔮 Future Enhancements

- **Real-time Model Testing** - Integrated playground for trying models
- **API Documentation Generator** - Automatic API docs for published models
- **Model Marketplace** - Advanced search and filtering
- **Usage Alerts** - Notifications for usage thresholds
- **Batch Operations** - Bulk model management
- **Third-party Integrations** - GitHub, Hugging Face, etc.
- **Advanced Analytics** - ML-powered usage insights
- **Model Versioning** - Support for multiple model versions

## 📄 License

MIT License - feel free to use this project for your AI marketplace needs!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable  
5. Submit a pull request

For major changes, please open an issue first to discuss your proposed changes.

---

**Built for the future of AI development and integration** 🚀