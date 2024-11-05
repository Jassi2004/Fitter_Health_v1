// components/authentication/ForgotPasswordForm.tsx
import React, { useState } from "react";
import { MultiStepLoader } from '../ui/multi-step-loader';
import { TextGenerateEffect } from '../ui/text-generate-effect'; 

type ForgotPasswordFormProps = {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ email, onChange, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCurrentStep(0);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setCurrentStep(0);
    onSubmit(e);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {loading ? (
        <MultiStepLoader
          loadingStates={[{ text: 'Sending reset link...' }, { text: 'Link sent!' }]}
          loading={loading}
          currentStep={currentStep}
          duration={1000}
          loop={false}
        />
      ) : (
        <div className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full">
          <div className="mb-8">
            <TextGenerateEffect words="Forgot Your Password?" className="text-3xl font-bold text-white mb-2" />
            <p className="text-gray-400">Please enter your email to receive a reset link</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full border rounded-md p-2 bg-gray-800 text-white placeholder-gray-400 focus:ring focus:ring-violet-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-br from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-80 transition-opacity"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
