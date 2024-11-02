"use client";
import { motion } from 'framer-motion';
import { BackgroundGradient } from '../ui/background-gradient'; 
import { TextGenerateEffect } from '../ui/text-generate-effect'; 
import { InputComponent } from '../ui/input-component'; 
import Link from 'next/link';

interface LoginFormProps {
    email: string;
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, password, onChange, onSubmit }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full">
                <div className="mb-8">
                    <TextGenerateEffect words="Welcome Back!" className="text-3xl font-bold text-white mb-2" />
                    <p className="text-gray-400">Please login to your account</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
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
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-gradient-to-br from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
                        type="submit"
                    >
                        Login
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
            </BackgroundGradient>
        </div>
    );
};

export default LoginForm;
