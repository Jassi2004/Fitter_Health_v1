"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/authentication/LoginForm";
import sendLogin from "@/services/authentication/sendLogin";
// import FormSubmissionLoader from "@/components/authentication/FormSubmission";
import Link from "next/link"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); 

    try {
      const result = await sendLogin({ email, password });
      console.log("Login successful:", result);
      localStorage.setItem("token", result.token);
      const user = result.data.user._id;
      localStorage.setItem("userId",user);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response.status === 401 || error.response?.data.message === "Invalid Credentials") {
        setError("Username and password do not match.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login failed:", error);
      setShowError(true);
    } finally {
      setLoading(false); // Hide loader when done
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
        <FormSubmissionLoader loading={loading} onClose={() => setLoading(false)} /> // Pass loading and onClose
      ) : ( */}
        <>
          <LoginForm
            email={email}
            password={password}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          {/* <div className="mt-4 flex justify-between">
            <Link href="/authentication/forgotPassword" className="text-blue-600 hover:underline">
              Reset Password
            </Link>
            <Link href="/authentication/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div> */}
        </>
      {/* )} */}
    </div>
  );
};

export default LoginPage;
