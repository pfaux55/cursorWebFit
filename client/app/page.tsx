'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/utils'
import { Dumbbell, Target, Activity, CheckCircle } from 'lucide-react'

interface FitnessPlan {
  id: string
  title: string
  description: string
  exercises: any[]
  duration: string
  frequency: string
  createdAt: string
}

export default function Home() {
  const [formData, setFormData] = useState({
    age: '',
    goals: [] as string[],
    intensity: ''
  })
  const [loading, setLoading] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<FitnessPlan | null>(null)
  const [error, setError] = useState('')

  const fitnessGoals = [
    'strength & conditioning',
    'general health',
    'weight loss',
    'muscle building',
    'endurance',
    'flexibility'
  ]

  const intensityLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to fitness or returning after a break' },
    { value: 'intermediate', label: 'Intermediate', description: 'Regularly active, comfortable with basic exercises' },
    { value: 'advanced', label: 'Advanced', description: 'Very active, experienced with various workout routines' }
  ]

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.age || formData.goals.length === 0 || !formData.intensity) {
        throw new Error('Please fill in all fields')
      }

      // Create user
      const user = await api.createUser({
        age: parseInt(formData.age),
        goals: formData.goals,
        intensity: formData.intensity
      })

      // Generate fitness plan
      const plan = await api.createFitnessPlan(user.id)
      setCurrentPlan(plan)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ age: '', goals: [], intensity: '' })
    setCurrentPlan(null)
    setError('')
  }

  if (currentPlan) {
    return (
      <div className="min-h-screen animated-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Your Personalized Fitness Plan</h1>
              <Button 
                onClick={resetForm}
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Create New Plan
              </Button>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">{currentPlan.title}</CardTitle>
                <CardDescription className="text-lg">{currentPlan.description}</CardDescription>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span className="font-medium">{currentPlan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="font-medium">{currentPlan.frequency}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4 text-green-800">Your Exercises</h3>
                <div className="grid gap-4">
                  {currentPlan.exercises.map((exercise, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">{exercise.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-green-700">
                        {exercise.sets && (
                          <div>
                            <span className="font-medium">Sets:</span> {exercise.sets}
                          </div>
                        )}
                        {exercise.reps && (
                          <div>
                            <span className="font-medium">Reps:</span> {exercise.reps}
                          </div>
                        )}
                        {exercise.duration && (
                          <div>
                            <span className="font-medium">Duration:</span> {exercise.duration}
                          </div>
                        )}
                        {exercise.rest && (
                          <div>
                            <span className="font-medium">Rest:</span> {exercise.rest}
                          </div>
                        )}
                        {exercise.intensity && (
                          <div>
                            <span className="font-medium">Intensity:</span> {exercise.intensity}
                          </div>
                        )}
                        {exercise.exercises && (
                          <div className="md:col-span-3">
                            <span className="font-medium">Notes:</span> {exercise.exercises}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Start with proper warm-up and end with cool-down stretches</li>
                    <li>• Focus on proper form over speed or weight</li>
                    <li>• Stay hydrated throughout your workout</li>
                    <li>• Listen to your body and rest when needed</li>
                    <li>• Track your progress and celebrate small wins</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Dumbbell className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">FitPlan</h1>
            <p className="text-xl text-white/90 mb-2">Your Personal Fitness Planner</p>
            <p className="text-white/80">Get a customized workout plan tailored to your goals and fitness level</p>
          </div>

          {/* Form */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Create Your Fitness Plan</CardTitle>
              <CardDescription>
                Tell us about yourself to generate a personalized workout routine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Age Input */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="13"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter your age"
                    required
                  />
                </div>

                {/* Fitness Goals */}
                <div className="space-y-3">
                  <Label>Fitness Goals (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {fitnessGoals.map((goal) => (
                      <Button
                        key={goal}
                        type="button"
                        variant={formData.goals.includes(goal) ? "default" : "outline"}
                        className="h-auto p-3 justify-start text-left"
                        onClick={() => handleGoalToggle(goal)}
                      >
                        <div className="flex items-center space-x-2">
                          {formData.goals.includes(goal) && (
                            <CheckCircle className="h-4 w-4" />
                          )}
                          <span className="capitalize">{goal}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Intensity Level */}
                <div className="space-y-3">
                  <Label>Fitness Level</Label>
                  <div className="space-y-3">
                    {intensityLevels.map((level) => (
                      <Button
                        key={level.value}
                        type="button"
                        variant={formData.intensity === level.value ? "default" : "outline"}
                        className="w-full h-auto p-4 justify-start text-left"
                        onClick={() => setFormData(prev => ({ ...prev, intensity: level.value }))}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {formData.intensity === level.value && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                            <span className="font-medium">{level.label}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !formData.age || formData.goals.length === 0 || !formData.intensity}
                >
                  {loading ? 'Generating Your Plan...' : 'Generate My Fitness Plan'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Personalized</h3>
                <p className="text-sm text-muted-foreground">Plans tailored to your specific goals and fitness level</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Evidence-Based</h3>
                <p className="text-sm text-muted-foreground">Workouts designed with proven fitness principles</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Free & Easy</h3>
                <p className="text-sm text-muted-foreground">No cost, no signup required, instant results</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}