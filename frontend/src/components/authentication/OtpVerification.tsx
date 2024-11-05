"use client";
import { motion } from 'framer-motion';
import { MultiStepLoader } from '../ui/multi-step-loader'; // Import your MultiStepLoader
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { InputComponent } from '../ui/input-component';
import { useState } from 'react';

interface OTPFormProps {
    otp: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ otp, onChange, onSubmit }) => {
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
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
            {loading ? (
                <MultiStepLoader
                    loadingStates={[{ text: 'Verifying OTP...' }, { text: 'OTP Verified!' }]} // Customize loading states
                    loading={loading}
                    currentStep={currentStep}
                    duration={1000} // Adjust duration as needed
                    loop={false} // Don't loop for OTP verification
                />
            ) : (
                <div className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full">
                    <div className="mb-8">
                        <TextGenerateEffect words="Verify your OTP" className="text-3xl font-bold text-white mb-2" />
                        <p className="text-gray-400">Enter the OTP sent to your email</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputComponent
                            name="otp"
                            label="OTP"
                            placeholder="Enter OTP"
                            type="text"
                            value={otp}
                            onChange={onChange}
                        />

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-gradient-to-br from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
                            type="submit"
                        >
                            Verify OTP
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-gray-400">
                        Didn't receive the OTP?{' '}
                        <button className="text-violet-500 hover:text-violet-400" onClick={() => alert('Resend OTP functionality here')}>
                            Resend
                        </button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default OTPForm;
