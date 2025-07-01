# FitPlan - Personal Fitness Planner

A modern, responsive web application that generates personalized fitness plans based on user goals, age, and fitness level. Built with Next.js, Express.js, and PostgreSQL.

## Features

- **🎯 Personalized Plans**: Tailored workout routines based on individual goals and fitness level
- **🏋️ Multiple Goals**: Support for strength & conditioning, general health, weight loss, muscle building, endurance, and flexibility
- **📊 Difficulty Levels**: Beginner, intermediate, and advanced workout plans
- **💾 Data Persistence**: User input and generated plans stored in PostgreSQL database
- **📱 Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **⚡ Fast & Free**: Instant plan generation without signup requirements

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for modern styling
- **Lucide React** - Beautiful SVG icons

### Backend
- **Express.js** - Node.js web framework
- **Prisma ORM** - Database toolkit with type safety
- **PostgreSQL** - Reliable relational database
- **Zod** - TypeScript-first schema validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run setup
   ```

3. **Set up the database**
   
   Create a PostgreSQL database and update the connection string in `server/.env`:
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/fitness_planner?schema=public"
   ```

4. **Initialize the database**
   ```bash
   npm run db:setup
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:3001) concurrently.

## Project Structure

```
fitness-planner/
├── client/                 # Next.js frontend
│   ├── app/               # App Router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utility functions and API calls
│   └── ...
├── server/                # Express.js backend
│   ├── src/              # Server source code
│   ├── prisma/           # Database schema and migrations
│   └── ...
└── package.json          # Root package.json with workspace configuration
```

## API Endpoints

- `POST /api/users` - Create a new user profile
- `POST /api/fitness-plans` - Generate a fitness plan for a user
- `GET /api/users/:userId/fitness-plans` - Get all plans for a user
- `GET /api/fitness-plans/:id` - Get a specific fitness plan

## Database Schema

### Users Table
- `id` - Unique identifier
- `age` - User's age
- `goals` - Array of fitness goals
- `intensity` - Fitness level (beginner/intermediate/advanced)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Fitness Plans Table
- `id` - Unique identifier
- `userId` - Reference to user
- `title` - Plan title
- `description` - Plan description
- `exercises` - JSON array of exercises
- `duration` - Plan duration (e.g., "4 weeks")
- `frequency` - Workout frequency (e.g., "3x per week")
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Fitness Plan Generation

The application uses intelligent algorithms to generate personalized workout plans:

1. **Goal-Based Selection**: Exercises are selected based on user's chosen fitness goals
2. **Intensity Adjustment**: Sets, reps, and exercise difficulty adjusted based on fitness level
3. **Age Consideration**: Plan duration and intensity modified for different age groups
4. **Progressive Structure**: Plans designed with proper progression in mind

## Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel or your preferred platform
```

### Backend (Railway/Heroku)
```bash
cd server
npm run build
# Deploy to Railway, Heroku, or your preferred platform
```

### Database
Set up a PostgreSQL database on:
- **Railway** - Integrated PostgreSQL
- **Supabase** - PostgreSQL with additional features
- **AWS RDS** - Managed PostgreSQL service

## Environment Variables

### Server (.env)
```
DATABASE_URL=postgresql://username:password@host:port/database
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Client
Update `next.config.js` for production API endpoints.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- **User Authentication** - Allow users to save and track multiple plans
- **Progress Tracking** - Log workouts and track improvements
- **Exercise Videos** - Add instructional content
- **Social Features** - Share plans and progress with friends
- **Mobile App** - React Native mobile application
- **AI Integration** - Advanced plan generation with machine learning

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email your-email@domain.com or create an issue in the repository.