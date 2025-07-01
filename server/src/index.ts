import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());

// Validation schemas
const createUserSchema = z.object({
  age: z.number().min(13).max(100),
  goals: z.array(z.string()).min(1),
  intensity: z.enum(['beginner', 'intermediate', 'advanced'])
});

// Fitness plan generation logic
function generateFitnessPlan(age: number, goals: string[], intensity: string) {
  const exercises = {
    'strength & conditioning': {
      beginner: [
        { name: 'Push-ups', sets: 3, reps: '8-12', rest: '60s' },
        { name: 'Bodyweight Squats', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Plank', sets: 3, duration: '30s', rest: '45s' },
        { name: 'Modified Burpees', sets: 2, reps: '5-8', rest: '90s' }
      ],
      intermediate: [
        { name: 'Push-ups', sets: 4, reps: '12-16', rest: '45s' },
        { name: 'Jump Squats', sets: 4, reps: '10-15', rest: '60s' },
        { name: 'Mountain Climbers', sets: 3, reps: '20', rest: '45s' },
        { name: 'Burpees', sets: 3, reps: '8-12', rest: '90s' },
        { name: 'Lunges', sets: 3, reps: '12 each leg', rest: '60s' }
      ],
      advanced: [
        { name: 'Diamond Push-ups', sets: 4, reps: '10-15', rest: '30s' },
        { name: 'Pistol Squats', sets: 4, reps: '6-10 each leg', rest: '60s' },
        { name: 'Burpee Box Jumps', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Handstand Push-ups', sets: 3, reps: '5-8', rest: '120s' },
        { name: 'Single-leg Deadlifts', sets: 3, reps: '10 each leg', rest: '60s' }
      ]
    },
    'general health': {
      beginner: [
        { name: 'Walking', duration: '20-30 minutes', intensity: 'moderate' },
        { name: 'Bodyweight Squats', sets: 2, reps: '8-12', rest: '60s' },
        { name: 'Wall Push-ups', sets: 2, reps: '8-12', rest: '60s' },
        { name: 'Standing Marches', sets: 2, reps: '20 each leg', rest: '45s' }
      ],
      intermediate: [
        { name: 'Brisk Walking/Light Jogging', duration: '25-35 minutes' },
        { name: 'Push-ups', sets: 3, reps: '10-15', rest: '45s' },
        { name: 'Squats', sets: 3, reps: '12-18', rest: '45s' },
        { name: 'Plank', sets: 3, duration: '45s', rest: '60s' },
        { name: 'Step-ups', sets: 2, reps: '10 each leg', rest: '60s' }
      ],
      advanced: [
        { name: 'Running', duration: '30-45 minutes', intensity: 'moderate to high' },
        { name: 'Circuit Training', sets: 4, exercises: 'Mixed compound movements', rest: '30s between exercises' },
        { name: 'HIIT Cardio', duration: '20 minutes', rest: 'High intensity intervals' }
      ]
    },
    'weight loss': {
      beginner: [
        { name: 'Walking', duration: '30 minutes', intensity: 'brisk pace' },
        { name: 'Bodyweight Squats', sets: 3, reps: '10-15', rest: '45s' },
        { name: 'Modified Push-ups', sets: 2, reps: '8-12', rest: '60s' },
        { name: 'Marching in Place', duration: '5 minutes', intensity: 'moderate' }
      ],
      intermediate: [
        { name: 'Jogging/Running', duration: '25-30 minutes' },
        { name: 'Jump Squats', sets: 3, reps: '12-16', rest: '45s' },
        { name: 'Burpees', sets: 3, reps: '6-10', rest: '90s' },
        { name: 'High Knees', sets: 3, duration: '30s', rest: '30s' },
        { name: 'Mountain Climbers', sets: 3, reps: '20', rest: '45s' }
      ],
      advanced: [
        { name: 'HIIT Running', duration: '30 minutes', intensity: 'intervals' },
        { name: 'Burpee Variations', sets: 4, reps: '10-15', rest: '60s' },
        { name: 'Tabata Protocol', duration: '20 minutes', intensity: 'maximum effort' },
        { name: 'Circuit Training', sets: 5, exercises: 'Full body compound movements' }
      ]
    }
  };

  // Generate plan based on goals and intensity
  let planExercises: any[] = [];
  let title = '';
  let description = '';
  let duration = '';
  let frequency = '';

  if (goals.includes('strength & conditioning')) {
    planExercises = planExercises.concat(exercises['strength & conditioning'][intensity as keyof typeof exercises['strength & conditioning']] || []);
    title += 'Strength & Conditioning ';
  }

  if (goals.includes('general health')) {
    planExercises = planExercises.concat(exercises['general health'][intensity as keyof typeof exercises['general health']] || []);
    title += 'General Health ';
  }

  if (goals.includes('weight loss')) {
    planExercises = planExercises.concat(exercises['weight loss'][intensity as keyof typeof exercises['weight loss']] || []);
    title += 'Weight Loss ';
  }

  // Set plan parameters based on intensity and age
  switch (intensity) {
    case 'beginner':
      duration = age > 50 ? '6 weeks' : '4 weeks';
      frequency = '3x per week';
      description = `A beginner-friendly plan focusing on building foundational fitness and proper form.`;
      break;
    case 'intermediate':
      duration = '6 weeks';
      frequency = '4x per week';
      description = `An intermediate plan designed to challenge your current fitness level and promote progression.`;
      break;
    case 'advanced':
      duration = '8 weeks';
      frequency = '5x per week';
      description = `An advanced plan for experienced individuals looking to push their limits and achieve peak performance.`;
      break;
  }

  title = title.trim() + ` - ${intensity.charAt(0).toUpperCase() + intensity.slice(1)} Plan`;

  return {
    title,
    description,
    exercises: planExercises,
    duration,
    frequency
  };
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fitness Planner API is running' });
});

app.post('/api/users', async (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    
    const user = await prisma.user.create({
      data: validatedData
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/fitness-plans', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const planData = generateFitnessPlan(user.age, user.goals, user.intensity);

    const fitnessplan = await prisma.fitnessPlan.create({
      data: {
        userId: user.id,
        title: planData.title,
        description: planData.description,
        exercises: planData.exercises,
        duration: planData.duration,
        frequency: planData.frequency
      }
    });

    res.status(201).json(fitnessplan);
  } catch (error) {
    console.error('Error creating fitness plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:userId/fitness-plans', async (req, res) => {
  try {
    const { userId } = req.params;

    const plans = await prisma.fitnessPlan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(plans);
  } catch (error) {
    console.error('Error fetching fitness plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/fitness-plans/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await prisma.fitnessPlan.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!plan) {
      return res.status(404).json({ error: 'Fitness plan not found' });
    }

    res.json(plan);
  } catch (error) {
    console.error('Error fetching fitness plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});