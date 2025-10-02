import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import HomeLayout from "../layouts/Layout";
import { resetPassword } from "../redux/slices/authSlice";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { resetToken } = useParams();
    
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.password || !formData.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(formData.password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        }

        setIsLoading(true);
        try {
            const response = await dispatch(resetPassword({
                resetToken,
                password: formData.password
            }));
            
            if (response?.payload?.success) {
                toast.success("Password reset successfully! You can now login with your new password.");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error("Failed to reset password. The link may have expired.");
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: "" };
        if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-red-500" };
        if (password.length < 8) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
        
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@$!%*?&]/.test(password);
        
        const criteriaMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
        
        if (criteriaMet < 3) return { strength: 60, label: "Good", color: "bg-blue-500" };
        if (criteriaMet === 3) return { strength: 80, label: "Strong", color: "bg-green-500" };
        return { strength: 100, label: "Very Strong", color: "bg-green-600" };
    };

    const passwordStrength = getPasswordStrength(formData.password);

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
                            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaShieldAlt className="text-3xl text-green-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                            <p className="text-gray-300">
                                Create a new secure password for your account.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* New Password */}
                            <div>
                                <label 
                                    htmlFor="password" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter new password"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Password Strength</span>
                                            <span className={`font-medium ${
                                                passwordStrength.strength >= 80 ? 'text-green-400' :
                                                passwordStrength.strength >= 60 ? 'text-blue-400' :
                                                passwordStrength.strength >= 40 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                                style={{ width: `${passwordStrength.strength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label 
                                    htmlFor="confirmPassword" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Confirm new password"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                
                                {/* Password Match Indicator */}
                                {formData.confirmPassword && (
                                    <div className="mt-2">
                                        <span className={`text-xs ${
                                            formData.password === formData.confirmPassword 
                                                ? 'text-green-400' 
                                                : 'text-red-400'
                                        }`}>
                                            {formData.password === formData.confirmPassword 
                                                ? '✓ Passwords match' 
                                                : '✗ Passwords do not match'
                                            }
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Resetting...</span>
                                    </div>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>

                        {/* Password Requirements */}
                        <div className="mt-6 p-4 bg-white/5 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Password Requirements:</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• At least 8 characters long</li>
                                <li>• One uppercase letter (A-Z)</li>
                                <li>• One lowercase letter (a-z)</li>
                                <li>• One number (0-9)</li>
                                <li>• One special character (@$!%*?&)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default ResetPassword;