import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaArrowLeft, FaPaperPlane, FaCheck, FaClock, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";

import HomeLayout from "../layouts/Layout";
import { requestAdminAccess, getUserAdminRequest } from "../redux/slices/authSlice";

const RequestAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, role } = useSelector(state => state.auth);
    
    const [formData, setFormData] = useState({
        reason: "",
        experience: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [existingRequest, setExistingRequest] = useState(null);
    const [loadingRequest, setLoadingRequest] = useState(true);

    useEffect(() => {
        if (role === 'ADMIN') {
            navigate('/admin/dashboard');
            return;
        }
        
        // Check if user has existing request
        const checkExistingRequest = async () => {
            try {
                const response = await dispatch(getUserAdminRequest());
                if (response.payload?.data) {
                    setExistingRequest(response.payload.data);
                }
            } catch (error) {
                // No existing request found
            } finally {
                setLoadingRequest(false);
            }
        };

        checkExistingRequest();
    }, [dispatch, role, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.reason.trim() || !formData.experience.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        if (formData.reason.length < 10) {
            toast.error("Reason must be at least 10 characters long");
            return;
        }

        if (formData.experience.length < 10) {
            toast.error("Experience must be at least 10 characters long");
            return;
        }

        setIsLoading(true);
        try {
            const response = await dispatch(requestAdminAccess(formData));
            if (response?.payload?.success) {
                setExistingRequest(response.payload.data);
                setFormData({ reason: "", experience: "" });
            }
        } catch (error) {
            toast.error("Failed to submit admin request");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <FaClock className="text-yellow-400" />;
            case 'approved':
                return <FaCheck className="text-green-400" />;
            case 'rejected':
                return <FaTimes className="text-red-400" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/20';
            case 'approved':
                return 'text-green-400 bg-green-400/20';
            case 'rejected':
                return 'text-red-400 bg-red-400/20';
            default:
                return 'text-gray-400 bg-gray-400/20';
        }
    };

    if (loadingRequest) {
        return (
            <HomeLayout>
                <div className="min-h-[90vh] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/user/profile')}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-4"
                        >
                            <FaArrowLeft />
                            <span>Back to Profile</span>
                        </button>
                        
                        <div className="flex items-center gap-3 mb-4">
                            <FaCrown className="text-3xl text-yellow-400" />
                            <h1 className="text-4xl font-bold text-white">Request Admin Access</h1>
                        </div>
                        <p className="text-gray-300">
                            Apply for administrator privileges to manage courses and users.
                        </p>
                    </div>

                    {/* Existing Request Status */}
                    {existingRequest && (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                {getStatusIcon(existingRequest.status)}
                                <h3 className="text-xl font-bold text-white">Your Current Request</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(existingRequest.status)}`}>
                                    {existingRequest.status}
                                </span>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-gray-300 font-medium mb-2">Reason for Admin Access:</h4>
                                    <p className="text-white bg-white/5 p-3 rounded-lg">{existingRequest.reason}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-gray-300 font-medium mb-2">Experience:</h4>
                                    <p className="text-white bg-white/5 p-3 rounded-lg">{existingRequest.experience}</p>
                                </div>

                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Submitted: {new Date(existingRequest.createdAt).toLocaleDateString()}</span>
                                    {existingRequest.reviewedAt && (
                                        <span>Reviewed: {new Date(existingRequest.reviewedAt).toLocaleDateString()}</span>
                                    )}
                                </div>

                                {existingRequest.reviewNotes && (
                                    <div>
                                        <h4 className="text-gray-300 font-medium mb-2">Review Notes:</h4>
                                        <p className="text-white bg-white/5 p-3 rounded-lg">{existingRequest.reviewNotes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Request Form - Only show if no existing request */}
                    {!existingRequest && (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-6">Submit Admin Request</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                                        Why do you want admin access? *
                                    </label>
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                                        placeholder="Explain why you need admin privileges and how you plan to use them..."
                                        required
                                        minLength="10"
                                        maxLength="500"
                                        disabled={isLoading}
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Minimum 10 characters</span>
                                        <span>{formData.reason.length}/500</span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                                        Your relevant experience *
                                    </label>
                                    <textarea
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        rows="6"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                                        placeholder="Describe your background, experience with LMS platforms, teaching experience, technical skills, etc..."
                                        required
                                        minLength="10"
                                        maxLength="1000"
                                        disabled={isLoading}
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Minimum 10 characters</span>
                                        <span>{formData.experience.length}/1000</span>
                                    </div>
                                </div>

                                <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                                    <h4 className="text-blue-400 font-medium mb-2">What happens next?</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Your request will be reviewed by existing administrators</li>
                                        <li>• You'll receive an email notification about the decision</li>
                                        <li>• If approved, your account will be upgraded to admin status</li>
                                        <li>• Processing typically takes 1-3 business days</li>
                                    </ul>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Submitting...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <FaPaperPlane />
                                            <span>Submit Request</span>
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
};

export default RequestAdmin;