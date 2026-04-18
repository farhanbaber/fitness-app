# Ultra Pro Fitness & Health App

A comprehensive, production-ready fitness application that serves as a complete personal gym trainer, nutrition coach, and health planner.

## 🚀 Features

### 💪 Workout System
- **Muscle Groups**: Chest, Back, Shoulders, Biceps, Triceps, Legs, Abs
- **Exercise Library**: 200+ exercises with proper form instructions
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Progressive Overload**: Automatic progression based on performance
- **Sets & Reps**: Customizable with rest time tracking

### 🥗 Diet & Nutrition System
- **Gym Diet Plans**: Fat loss and muscle gain programs
- **Meal Timing**: Pre/post workout nutrition guidance
- **Macro Tracking**: Protein, carbs, fats breakdown
- **Water Intake**: Daily hydration monitoring
- **Healthy Recipes**: 100+ meal suggestions

### 🏃 Cardio System
- **Jogging Plans**: Time-based training programs
- **Interval Training**: HIIT workout protocols
- **Calorie Estimation**: Accurate burn calculations
- **Progress Tracking**: Weekly schedule management

### 🏊 Swimming Program
- **Technique Training**: Beginner to advanced progression
- **Workout Plans**: Structured swimming routines
- **Benefits & Risks**: Comprehensive safety information
- **Performance Tracking**: Speed and endurance metrics

### 📊 Real-Time Features
- **Adaptive Plans**: AI-powered workout adjustments
- **Weekly Scheduling**: Auto-updating workout calendar
- **Rest Day Recommendations**: Smart recovery planning
- **Progress Analytics**: Comprehensive performance insights

### 📥 Download System
- **Workout Plans**: PDF and JSON export
- **Diet Plans**: Customizable nutrition downloads
- **Weekly Schedules**: Printable workout calendars
- **Progress Reports**: Detailed performance summaries

## 🛠️ Tech Stack

### Frontend
- **React 18** with modern hooks
- **TailwindCSS** for responsive design
- **Vite** for fast development
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **PDFKit** for PDF generation

### Architecture
- **RESTful API** design
- **Modular Components** structure
- **Responsive Design** (mobile-first)
- **Production-ready** code quality

## 📱 Pages

1. **Dashboard**: Overview with real-time stats
2. **Workout Planner**: Gym training programs
3. **Diet & Nutrition**: Meal planning and tracking
4. **Cardio & Swimming**: Cardio programs and swimming plans
5. **Profile & Progress**: User settings and progress tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd fitness-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables
cp backend/.env.example backend/.env
# Edit .env with your MongoDB connection string

# Start the application
npm run dev
```

### Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=your-jwt-secret
PORT=5000
```

## 🏗️ Project Structure

```
fitness-app/
├── backend/          # Node.js API server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth & validation
│   └── utils/        # Helper functions
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── public/       # Static assets
└── README.md
```

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // hashed
  profile: {
    age: Number,
    weight: Number,
    height: Number,
    goal: String, // 'fat_loss' | 'muscle_gain' | 'endurance'
    fitnessLevel: String, // 'beginner' | 'intermediate' | 'advanced'
  },
  preferences: {
    units: String, // 'metric' | 'imperial'
    notifications: Boolean,
    darkMode: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Workout Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  muscleGroup: String,
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    restTime: Number,
    instructions: String,
    difficulty: String
  }],
  difficulty: String,
  duration: Number,
  caloriesBurned: Number,
  completedAt: Date,
  createdAt: Date
}
```

## 🔧 Development

### Running Locally
```bash
# Start backend server
cd backend && npm run dev

# Start frontend development server
cd frontend && npm run dev
```

### Building for Production
```bash
# Build frontend
cd frontend && npm run build

# Start production server
cd backend && npm start
```

## 📄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Workouts
- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Create workout
- `GET /api/workouts/muscle/:group` - Get exercises by muscle group
- `PUT /api/workouts/:id/progress` - Update workout progress

### Nutrition
- `GET /api/nutrition/plans` - Get diet plans
- `POST /api/nutrition/track` - Track meal
- `GET /api/nutrition/macros` - Get macro breakdown
- `POST /api/nutrition/water` - Track water intake

### Cardio & Swimming
- `GET /api/cardio/plans` - Get cardio programs
- `GET /api/swimming/plans` - Get swimming programs
- `POST /api/cardio/log` - Log cardio session
- `POST /api/swimming/log` - Log swimming session

### Downloads
- `GET /api/download/workout/:id/pdf` - Download workout PDF
- `GET /api/download/diet/:id/json` - Download diet JSON
- `GET /api/download/progress/:userId` - Download progress report

## 🎯 Features in Detail

### Workout System
- **200+ Exercises**: Complete exercise library with form instructions
- **Muscle Groups**: Targeted training for all major muscle groups
- **Progressive Overload**: Automatic difficulty adjustments
- **Form Videos**: Exercise demonstration links
- **Workout History**: Complete training log

### Nutrition System
- **Custom Meal Plans**: Personalized diet programs
- **Macro Calculator**: Automatic macro calculations
- **Recipe Database**: Healthy meal suggestions
- **Water Tracking**: Daily hydration goals
- **Nutrition Analytics**: Detailed breakdown reports

### Cardio Programs
- **Structured Plans**: 5K, 10K, marathon training
- **HIIT Workouts**: High-intensity interval training
- **Heart Rate Zones**: Targeted cardio intensity
- **Progress Tracking**: Speed, distance, time metrics

### Swimming Programs
- **Technique Training**: Stroke improvement programs
- **Endurance Plans**: Distance-based training
- **Safety Guidelines**: Proper swimming protocols
- **Performance Metrics**: Stroke count, timing analysis

## 📱 Responsive Design

- **Mobile First**: Optimized for all screen sizes
- **Touch Interface**: Mobile-friendly interactions
- **Progressive Web App**: PWA capabilities
- **Offline Support**: Basic functionality without internet

## 🔒 Security

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt encryption
- **Input Validation**: XSS and injection protection
- **Rate Limiting**: API abuse prevention

## 📈 Performance

- **Optimized Bundle**: Code splitting and lazy loading
- **Caching Strategy**: Efficient data management
- **Image Optimization**: Compressed media assets
- **SEO Ready**: Meta tags and structured data

## 🚀 Deployment

### Docker Support
```dockerfile
# Multi-stage build for production
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Configuration
- **Development**: Local MongoDB and hot reload
- **Staging**: Cloud database with testing
- **Production**: Optimized build with monitoring

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For support and questions:
- Email: support@ultraprofitness.com
- Documentation: docs.ultraprofitness.com
- Community: community.ultraprofitness.com
