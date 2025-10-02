import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";

import HomeLayout from "../layouts/Layout";
import { forgotPassword } from "../redux/slices/authSlice";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        try {
            const response = await dispatch(forgotPassword(email));
            if (response?.payload?.success) {
                toast.success("Password reset email sent! Check your inbox.");
                // Don't navigate immediately, let user see success message
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to send reset email");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="w-full max-w-md">
                    {/* Back to Login Link */}
                    <div className="mb-6">
                        <Link 
                            to="/login"
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        >
                            <FaArrowLeft />
                            <span>Back to Login</span>
                        </Link>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaEnvelope className="text-3xl text-blue-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                            <p className="text-gray-300">
                                No worries! Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your email address"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    "Send Reset Email"
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                Remember your password?{" "}
                                <Link 
                                    to="/login" 
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        <p>
                            If you don't receive an email within a few minutes, check your spam folder or contact support.
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ForgotPassword;