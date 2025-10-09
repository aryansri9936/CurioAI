# CurioAI - Complete Study Companion Application

A full-stack educational application that helps students learn from their PDFs using AI-powered features like chat, quizzes, and progress tracking.

## 🚀 Features Implemented

### ✅ Core Features
- **User Authentication**: Secure JWT-based login/register system
- **PDF Management**: Upload, store, and process PDFs in MongoDB
- **AI Chat Interface**: Ask questions about your PDFs using Google Gemini API
- **Quiz Generation**: Auto-generated MCQs, SAQs, and LAQs from PDF content
- **Progress Tracking**: Monitor study time, topic mastery, and learning analytics
- **Gamification**: XP system, levels, badges, and study streaks

### ✅ Advanced Features  
- **Per-PDF Chat History**: Persistent conversations stored per document
- **Educational Games**: Word scramble, memory match, quiz battles
- **Flashcard System**: Spaced repetition learning
- **Study Analytics**: Weekly charts, subject distribution, goal tracking
- **Achievement System**: Unlock badges and track milestones
- **Responsive Design**: Mobile-first, modern UI/UX

## 📁 Project Structure

```
curioai/
├── backend/              # Node.js/Express API
│   ├── config/          # Database and CORS configuration
│   ├── models/          # MongoDB/Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication, upload, error handling
│   ├── services/        # AI services (Gemini, PDF processing)
│   ├── utils/           # Helper functions and constants
│   └── server.js        # Express server entry point
│
└── frontend/            # React Application
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── pages/       # Main application pages
    │   ├── context/     # React Context providers
    │   ├── services/    # API services
    │   ├── utils/       # Utility functions
    │   └── styles/      # CSS files
    └── package.json     # Dependencies
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt
- **File Upload**: Multer with filesystem storage
- **PDF Processing**: pdf-parse library
- **AI Integration**: Google Gemini API
- **Security**: Helmet, CORS, rate limiting

### Frontend
- **Framework**: React 18 with hooks and context
- **Routing**: React Router v6
- **Styling**: CSS with CSS variables for theming
- **Animations**: Framer Motion
- **Charts**: Recharts for analytics
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios with interceptors

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Google AI Studio account for Gemini API key

### 1. Environment Setup

Create `.env` files with these variables:

**Backend `.env`:**
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/curioai

# JWT
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_here
JWT_EXPIRES_IN=30d

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration  
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
```

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=CurioAI
```

### 2. Installation & Running

```bash
# Install and run backend
cd backend
npm install
npm run dev

# Install and run frontend (in another terminal)
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 3. API Keys Setup

#### MongoDB Atlas:
1. Create account at https://cloud.mongodb.com
2. Create a free cluster
3. Get connection string and add to MONGO_URI

#### Google Gemini API:
1. Go to https://aistudio.google.com
2. Create API key
3. Add to GEMINI_API_KEY environment variable

## 📱 Application Features

### User Experience
- **Seamless Onboarding**: Quick registration with profile setup
- **Intuitive Navigation**: Clean sidebar with visual feedback
- **Real-time Updates**: Live progress tracking and notifications
- **Mobile Responsive**: Works perfectly on all device sizes

### Learning Features
- **Smart PDF Processing**: Automatic text extraction and chunking
- **AI-Powered Chat**: Educational explanations with citations
- **Dynamic Quizzes**: Generated from your specific PDF content
- **Progress Analytics**: Detailed insights into learning patterns
- **Gamification**: Engaging XP system with achievements

### Technical Features
- **Secure Authentication**: JWT tokens with proper validation
- **File Management**: Efficient PDF storage and duplicate prevention
- **Real-time Processing**: Background PDF processing with status updates
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Optimized queries and lazy loading

## 🔒 Security Features

- **Input Validation**: Joi schema validation on all endpoints
- **Rate Limiting**: Prevent abuse with request limits
- **CORS Protection**: Configured for specific origins
- **File Upload Security**: Size limits and type validation
- **JWT Security**: Secure token generation and validation
- **Error Sanitization**: No sensitive data in error responses

## 🎯 Key Differentiators

1. **User-Centric Design**: No pre-stored demo data - everything is user-generated
2. **PDF-First Approach**: All features revolve around uploaded documents
3. **Educational Focus**: AI responses designed for learning, not just answers
4. **Progress Tracking**: Comprehensive analytics for learning improvement
5. **Gamification**: Makes studying engaging with levels and achievements

## 📊 Database Schema

### User Model
- Authentication (email, password, username)
- Profile information (name, grade, subjects)
- Gamification data (XP, level, badges, streaks)
- Study time tracking (daily, weekly totals)
- Preferences (theme, notifications)

### PDF Model
- File metadata (title, size, path, processing status)
- Extracted content (text, pages, chunks)
- Analytics (access count, questions generated)
- User ownership and access control

### Chat Model
- Conversation history per PDF
- Message threads with AI responses
- Citation tracking for PDF references
- Metadata (subject, topics, difficulty)

### Quiz Model
- Generated questions from PDF content
- User attempts and scoring
- Analytics (completion rates, average scores)
- Support for multiple question types

## 🚀 Deployment Ready

The application is production-ready with:
- Environment-based configuration
- Error logging and monitoring
- Security best practices
- Scalable architecture
- Docker support (can be added)

## 🤝 Contributing

This is a complete, functional application ready for use. You can:
1. Add additional AI models (OpenAI, Claude, etc.)
2. Implement real-time collaboration features
3. Add video/audio content support
4. Create mobile apps using the same backend
5. Add advanced analytics and reporting

## 📞 Support

For setup help or questions:
1. Check the error logs in both frontend and backend
2. Ensure all environment variables are set correctly
3. Verify API keys are valid and have proper permissions
4. Check MongoDB connection string format

---

**Built with ❤️ for education and learning**
