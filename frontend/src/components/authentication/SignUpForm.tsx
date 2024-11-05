"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { InputComponent } from '../ui/input-component';
import { MultiStepLoader } from '@/components/ui/multi-step-loader'; 

interface SignUpFormProps {
  formData: {
    username: string; 
    email: string;
    password: string;
    age: number | null;  // Allow null
    height: number | null;  // Allow null
    weight: number | null;  // Allow null
    gender: string;
    workoutLevel: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>; 
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onChange, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const loadingSteps = [
    { text: 'Validating your information...' },
    { text: 'Sending signup request...' },
    { text: 'Processing your data...' },
    { text: 'Completing your registration...' },
    { text: 'Finalizing account setup...' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setLoadingStepIndex(0); // Reset the loading step index to the first step

    try {
      for (const step of loadingSteps) {
        // Simulate loading step for each part (replace this with your actual logic)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for each step
        setLoadingStepIndex((prevIndex) => prevIndex + 1);
      }

      await onSubmit(e); 
    } catch (error) {
      console.error("Sign up failed", error);
    } finally {
      setLoading(false); 
      setLoadingStepIndex(0); // Reset loading step index after completion
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full">
        <div className="mb-8">
          <TextGenerateEffect words="Create your account" className="text-3xl font-bold text-white mb-2" />
          <p className="text-gray-400">Enter your details to get started</p>
        </div>

        {loading && (
          <MultiStepLoader
            loadingStates={loadingSteps}
            loading={loading}
            duration={2000} // You can adjust the duration here if necessary
            loop={false}
            currentStep={loadingStepIndex} // Add currentStep prop to control the displayed step
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputComponent
            name="username" 
            label="Username"
            placeholder="Your username"
            type="text"
            value={formData.username} 
            onChange={onChange}
            disabled={loading} 
          />

          <InputComponent
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={onChange}
            disabled={loading} 
          />

          <InputComponent
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={onChange}
            disabled={loading} 
          />

          <InputComponent
            name="age"
            label="Age"
            placeholder="Your age"
            type="number"
            value={formData.age ?? ''}  // Show empty if null
            onChange={onChange}
            disabled={loading} 
          />

          <InputComponent
            name="height"
            label="Height (cm)"
            placeholder="Your height in cm"
            type="number"
            value={formData.height ?? ''}  // Show empty if null
            onChange={onChange}
            disabled={loading} 
          />

          <InputComponent
            name="weight"
            label="Weight (kg)"
            placeholder="Your weight in kg"
            type="number"
            value={formData.weight ?? ''}  // Show empty if null
            onChange={onChange}
            disabled={loading} 
          />

          <div>
            <label className="block text-gray-200">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="block w-full p-2 bg-gray-800 text-white rounded-lg"
              disabled={loading} 
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-200">Workout Level</label>
            <select
              name="workoutLevel"
              value={formData.workoutLevel}
              onChange={onChange}
              className="block w-full p-2 bg-gray-800 text-white rounded-lg"
              disabled={loading} 
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-gradient-to-br from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
            type="submit"
            disabled={loading} 
          >
            {loading ? 'Loading...' : 'Sign up'}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a href="#" className="text-violet-500 hover:text-violet-400">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
