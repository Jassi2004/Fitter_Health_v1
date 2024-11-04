"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ResetPasswordForm from "@/components/authentication/ResetPassword"; 
import sendResetPassword from "@/services/authentication/resetPassword"; 
// import FormSubmissionLoader from "@/components/authentication/FormSubmission"; 

// Accept the token as a parameter
const ResetPasswordPage: React.FC<{ params: { token: string } }> = ({ params }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get the token from params
  const { token } = params;
  const router = useRouter();

  if (!token) {
    return <p>Error: No token provided.</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    setLoading(true);

    try {
      const result = await sendResetPassword({ token, password });
      console.log(result);
      
      setSuccess(result.message);
      setPassword(""); // Clear the password field after success
      router.push('/authentication/login');
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to reset password");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
    setPassword("");
  };

  return (
    <div className="relative">
      {showError && error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-red-500 bg-opacity-80 text-white p-4 rounded-md w-3/4 max-w-md text-center">
            <p className="font-semibold">{error}</p>
            <button
              onClick={handleCloseError}
              className="mt-2 px-4 py-1 bg-white text-red-600 font-semibold rounded-md hover:bg-gray-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* {loading ? (
        <FormSubmissionLoader loading={loading} onClose={() => setLoading(false)} />
      ) : ( */}
        <ResetPasswordForm
          password={password}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      {/* )} */}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default ResetPasswordPage;
