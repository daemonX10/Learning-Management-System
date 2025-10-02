import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaUsers, FaGraduationCap, FaDollarSign, FaEye, FaTrash, FaEdit, FaCrown } from "react-icons/fa";
import { toast } from "react-hot-toast";

import HomeLayout from "../../layouts/Layout";
import { getAllCourses, deleteCourse } from "../../redux/slices/courseSlice";
import { getAdminRequests, reviewAdminRequest } from "../../redux/slices/authSlice";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        subscribedUsers: 0,
        totalCourses: 0,
        totalRevenue: 0
    });
    const [adminRequests, setAdminRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(false);

    const { courseList } = useSelector(state => state.course);
    const { user } = useSelector(state => state.auth);



    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                const response = await dispatch(deleteCourse(courseId));
                if (response?.payload?.success) {
                    // Course will be removed from state by the reducer
                }
            } catch (error) {
                toast.error('Failed to delete course');
            }
        }
    };

    const handleEditCourse = (course) => {
        navigate('/course/edit', { state: course });
    };

    const loadAdminRequests = async () => {
        setLoadingRequests(true);
        try {
            const response = await dispatch(getAdminRequests());
            if (response.payload?.data) {
                setAdminRequests(response.payload.data);
            }
        } catch (error) {
            toast.error('Failed to load admin requests');
        } finally {
            setLoadingRequests(false);
        }
    };

    const handleReviewRequest = async (requestId, status, reviewNotes = '') => {
        try {
            const response = await dispatch(reviewAdminRequest({
                requestId,
                status,
                reviewNotes
            }));
            if (response?.payload?.success) {
                await loadAdminRequests(); // Reload requests
            }
        } catch (error) {
            toast.error('Failed to review request');
        }
    };

    useEffect(() => {
        dispatch(getAllCourses());
        loadAdminRequests();
        // Mock stats (replace with real API calls)
        setStats({
            totalUsers: 1250,
            subscribedUsers: 890,
            totalCourses: courseList?.length || 0,
            totalRevenue: 45678
        });
    }, [dispatch, courseList?.length]);

    if (!user || user.role !== 'ADMIN') {
        return (
            <HomeLayout>
                <div className="min-h-[90vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
                        <p className="text-gray-300">You don't have permission to access this page.</p>
                    </div>
                </div>
            </HomeLayout>
        );
    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaCrown className="text-3xl text-yellow-400" />
                            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                        </div>
                        <p className="text-gray-300">Welcome back, {user?.fullName}! Here's your platform overview.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 text-sm">Total Users</p>
                                    <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                                </div>
                                <FaUsers className="text-3xl text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 text-sm">Subscribed Users</p>
                                    <p className="text-3xl font-bold text-white">{stats.subscribedUsers}</p>
                                </div>
                                <FaGraduationCap className="text-3xl text-green-400" />
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 text-sm">Total Courses</p>
                                    <p className="text-3xl font-bold text-white">{courseList?.length || 0}</p>
                                </div>
                                <FaGraduationCap className="text-3xl text-purple-400" />
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-300 text-sm">Total Revenue</p>
                                    <p className="text-3xl font-bold text-white">₹{stats.totalRevenue}</p>
                                </div>
                                <FaDollarSign className="text-3xl text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    {/* Visual Statistics Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">User Distribution</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Total Users</span>
                                    <span className="text-blue-400 font-semibold">{stats.totalUsers}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{width: `${(stats.totalUsers / (stats.totalUsers + 100)) * 100}%`}}></div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">Subscribed Users</span>
                                    <span className="text-green-400 font-semibold">{stats.subscribedUsers}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: `${(stats.subscribedUsers / stats.totalUsers) * 100}%`}}></div>
                                </div>
                                
                                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">
                                            {Math.round((stats.subscribedUsers / stats.totalUsers) * 100)}%
                                        </div>
                                        <div className="text-gray-400 text-sm">Subscription Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6">Course Overview</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4 text-center">
                                        <div className="text-xl font-bold text-purple-400">{courseList?.length || 0}</div>
                                        <div className="text-gray-400 text-sm">Total Courses</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 text-center">
                                        <div className="text-xl font-bold text-yellow-400">
                                            {courseList?.reduce((sum, course) => sum + (course.numberOfLectures || 0), 0) || 0}
                                        </div>
                                        <div className="text-gray-400 text-sm">Total Lectures</div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h4 className="text-gray-300 font-medium">Recent Activity</h4>
                                    {courseList?.slice(0, 3).map((course, index) => (
                                        <div key={course._id} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white text-sm font-medium">{course.title}</div>
                                                <div className="text-gray-400 text-xs">{course.numberOfLectures} lectures</div>
                                            </div>
                                        </div>
                                    )) || (
                                        <div className="text-gray-400 text-sm text-center py-4">No courses available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courses Management */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Course Management</h3>
                            <button
                                onClick={() => navigate('/course/create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                            >
                                Create New Course
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="text-gray-300 pb-3">Course</th>
                                        <th className="text-gray-300 pb-3">Category</th>
                                        <th className="text-gray-300 pb-3">Instructor</th>
                                        <th className="text-gray-300 pb-3">Lectures</th>
                                        <th className="text-gray-300 pb-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList?.map((course) => (
                                        <tr key={course._id} className="border-b border-white/10">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <img 
                                                        src={course.thumbnail?.secure_url} 
                                                        alt={course.title}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="text-white font-semibold">{course.title}</p>
                                                        <p className="text-gray-400 text-sm">{course.description?.slice(0, 50)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-300">{course.category}</td>
                                            <td className="py-4 text-gray-300">{course.createdBy}</td>
                                            <td className="py-4 text-gray-300">{course.numberOfLectures}</td>
                                            <td className="py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => navigate('/course/description', { state: course })}
                                                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-300"
                                                        title="View Course"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditCourse(course)}
                                                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-300"
                                                        title="Edit Course"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCourse(course._id)}
                                                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-300"
                                                        title="Delete Course"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Admin Requests Management */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-xl mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Admin Access Requests</h3>
                            <button
                                onClick={loadAdminRequests}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                                disabled={loadingRequests}
                            >
                                {loadingRequests ? 'Loading...' : 'Refresh'}
                            </button>
                        </div>

                        {adminRequests.length === 0 ? (
                            <div className="text-center py-8">
                                <FaCrown className="text-4xl text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">No admin requests found</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {adminRequests.map((request) => (
                                    <div
                                        key={request._id}
                                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img
                                                        src={request.user.avatar?.secure_url || '/default-avatar.png'}
                                                        alt={request.user.fullName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <h4 className="text-white font-semibold">{request.user.fullName}</h4>
                                                        <p className="text-gray-400 text-sm">{request.user.email}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                                        request.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                                                        request.status === 'approved' ? 'bg-green-400/20 text-green-400' :
                                                        'bg-red-400/20 text-red-400'
                                                    }`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <h5 className="text-gray-300 font-medium text-sm mb-1">Reason:</h5>
                                                    <p className="text-white text-sm">{request.reason}</p>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <h5 className="text-gray-300 font-medium text-sm mb-1">Experience:</h5>
                                                    <p className="text-white text-sm">{request.experience}</p>
                                                </div>

                                                <div className="flex justify-between text-xs text-gray-400">
                                                    <span>Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
                                                    {request.reviewedAt && (
                                                        <span>Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}</span>
                                                    )}
                                                </div>

                                                {request.reviewNotes && (
                                                    <div className="mt-2">
                                                        <h5 className="text-gray-300 font-medium text-sm mb-1">Review Notes:</h5>
                                                        <p className="text-white text-sm bg-white/5 p-2 rounded">{request.reviewNotes}</p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {request.status === 'pending' && (
                                                <div className="flex gap-2 ml-4">
                                                    <button
                                                        onClick={() => {
                                                            const reviewNotes = prompt('Enter review notes (optional):');
                                                            handleReviewRequest(request._id, 'approved', reviewNotes || '');
                                                        }}
                                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors duration-300"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const reviewNotes = prompt('Enter reason for rejection:');
                                                            if (reviewNotes) {
                                                                handleReviewRequest(request._id, 'rejected', reviewNotes);
                                                            }
                                                        }}
                                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors duration-300"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AdminDashboard;