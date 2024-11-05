"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '../ui/text-generate-effect'; 
import { InputComponent } from '../ui/input-component'; 
import Link from 'next/link';
import { MultiStepLoader } from '@/components/ui/multi-step-loader'; // Adjust the path accordingly

interface LoginFormProps {
    email: string;
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, password, onChange, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const loadingStates = [
        { text: 'Validating email...' },
        { text: 'Checking password...' },
        { text: 'Logging in...' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setCurrentStep(0); // Reset currentStep to the start

        try {
            // Validate email (Simulating with a timeout for illustration)
            setCurrentStep(0);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate validation delay

            // Check password (Simulating with a timeout for illustration)
            setCurrentStep(1);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate checking delay

            // Attempt login (Simulating with a timeout for illustration)
            setCurrentStep(2);
            await onSubmit(e); // Call the onSubmit prop for actual login logic
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
            {/* Removed BackgroundGradient component */}
            <div className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full">
                <div className="mb-8">
                    <TextGenerateEffect words="Welcome Back!" className="text-3xl font-bold text-white mb-2" />
                    <p className="text-gray-400">Please login to your account</p>
                </div>

                {loading && (
                    <MultiStepLoader
                        loadingStates={loadingStates}
                        loading={loading}
                        duration={2000}
                        loop={false}
                        currentStep={currentStep} // Pass currentStep to the loader
                    />
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputComponent
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={onChange}
                    />
                    <InputComponent
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={onChange}
                    />

                    <motion.button
                        className="w-full bg-gradient-to-br from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
                        type="submit"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Loading...' : 'Login'} {/* Change button text based on loading state */}
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/authentication/signup" className="text-violet-500 hover:text-violet-400">
                        Sign Up
                    </Link>
                </p>

                <p className="mt-2 text-center text-gray-400">
                    Forgot your password?{' '}
                    <Link href="/authentication/forgotPassword" className="text-violet-500 hover:text-violet-400">
                        Reset Password
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
