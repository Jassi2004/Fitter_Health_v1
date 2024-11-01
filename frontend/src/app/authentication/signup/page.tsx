"use client";
import React, { useState } from 'react';
import SignUpForm from '@/components/authentication/SignUpForm';
import sendFormData from '@/services/authentication/signup';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: 0,        
    height: 0,      
    weight: 0,      
    gender: 'Male',
    workoutLevel: 'Beginner',
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Convert age, height, and weight to numbers
    if (name === 'age' || name === 'height' || name === 'weight') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    localStorage.setItem('email', formData.email);
    
    try {
      const response = await sendFormData(formData); 
      if (response && response.status == "success") { 
        router.push('/authentication/otpVerification'); 
      } else {
        
        console.error('Signup failed:', response.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };
  return (
    <div>
      <SignUpForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default SignupPage;
