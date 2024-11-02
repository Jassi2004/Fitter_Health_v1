// pages/ForgotPasswordPage.tsx
"use client"
import React, { useState } from "react";
import ForgotPasswordForm from "@/components/authentication/ForgotPassword";
import sendForgotPasswordRequest from "@/services/authentication/forgotPassword";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await sendForgotPasswordRequest(email);
      setSuccess(true);
      setEmail(""); // Clear email after successful submission
    } catch (error: any) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading && <p>Loading...</p>}
      {success && <p className="text-green-600">Reset link sent! Please check your email.</p>}
      {error && <p className="text-red-600">{error}</p>}
      <ForgotPasswordForm email={email} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default ForgotPasswordPage;
