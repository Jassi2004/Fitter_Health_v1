// pages/login/LoginPage.tsx

"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/authentication/LoginForm';
import sendLogin from '@/services/authentication/sendLogin';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await sendLogin({ email, password });
            console.log('Login successful:', result);
            router.push('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <LoginForm
                email={email}
                password={password}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default LoginPage;
