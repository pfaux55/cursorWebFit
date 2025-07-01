import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = {
  async createUser(userData: { age: number; goals: string[]; intensity: string }) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    
    return response.json();
  },

  async createFitnessPlan(userId: string) {
    const response = await fetch('/api/fitness-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create fitness plan');
    }
    
    return response.json();
  },

  async getFitnessPlans(userId: string) {
    const response = await fetch(`/api/users/${userId}/fitness-plans`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch fitness plans');
    }
    
    return response.json();
  },

  async getFitnessPlan(planId: string) {
    const response = await fetch(`/api/fitness-plans/${planId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch fitness plan');
    }
    
    return response.json();
  },
};