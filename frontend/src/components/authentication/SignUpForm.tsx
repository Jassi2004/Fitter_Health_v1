"use client";
import { motion } from 'framer-motion';
import { BackgroundGradient } from '../ui/background-gradient';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { InputComponent } from '../ui/input-component';

interface SignUpFormProps {
  formData: {
    username: string; // Change 'name' to 'username'
    email: string;
    password: string;
    age: number;
    height: number;
    weight: number;
    gender: string;
    workoutLevel: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full">
        <div className="mb-8">
          <TextGenerateEffect words="Create your account" className="text-3xl font-bold text-white mb-2" />
          <p className="text-gray-400">Enter your details to get started</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 bg-grey-500">
          <InputComponent
            name="username" // Update name prop to 'username'
            label="Username" // Change label to 'Username'
            placeholder="Your username"
            type="text"
            value={formData.username} // Update value prop to match formData.username
            onChange={onChange}
          />

          <InputComponent
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={onChange}
          />

          <InputComponent
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={onChange}
          />

          <InputComponent
            name="age"
            label="Age"
            placeholder="Your age"
            type="number"
            value={formData.age}
            onChange={onChange}
          />

          <InputComponent
            name="height"
            label="Height (cm)"
            placeholder="Your height in cm"
            type="number"
            value={formData.height}
            onChange={onChange}
          />

          <InputComponent
            name="weight"
            label="Weight (kg)"
            placeholder="Your weight in kg"
            type="number"
            value={formData.weight}
            onChange={onChange}
          />

          <div>
            <label className="block text-gray-200">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="block w-full p-2 bg-gray-800 text-white rounded-lg"
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
          >
            Sign up
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a href="#" className="text-violet-500 hover:text-violet-400">
            Sign in
          </a>
        </p>
      </BackgroundGradient>
    </div>
  );
};

export default SignUpForm;
