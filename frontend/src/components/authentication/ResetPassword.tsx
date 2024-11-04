import React from "react";

interface ResetPasswordFormProps {
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ password, onChange, onSubmit }) => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
            <div className="rounded-[22px] p-4 sm:p-10 bg-gray-900 max-w-md w-full shadow-lg">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-gray-400">Enter your new password below</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter new password"
                            required
                            className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-700 rounded-md placeholder-gray-400 focus:ring-violet-500 focus:border-violet-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-br from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Remembered your password?{" "}
                    <a href="/authentication/login" className="text-violet-500 hover:text-violet-400 transition-colors">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
