import { toast } from "react-hot-toast"
import {  useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import HomeLayout from "../../layouts/Layout"
import { getUserData } from "../../redux/slices/authSlice"
import { cancelCourseBundle } from "../../redux/slices/razorPaySlice"



const Profile = () => {
  
  const user = useSelector(state => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancellation = async () =>{
    toast("Initiating Cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    navigate('/');
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
              <div className="relative inline-block">
                <img 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" 
                  src={user?.avatar?.secure_url} 
                  alt="Profile"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-white capitalize">
                {user?.fullName}
              </h1>
              <p className="text-blue-100 text-lg mt-2">
                {user?.role === "ADMIN" ? "Administrator" : "Student"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="p-8 space-y-6">
              <div className="bg-white/5 rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300 font-medium">Email:</span>
                    <span className="text-blue-400 font-semibold">{user?.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300 font-medium">Role:</span>
                    <span className="text-blue-400 font-semibold capitalize">{user?.role}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-300 font-medium">Subscription:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      user?.role === "ADMIN" || user?.subscription?.status === "Active" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {user?.role === "ADMIN" ? "Active" : (user?.subscription?.status === "Active" ? "Active" : "Inactive")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link 
                    to='/changePassword' 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Change Password
                  </Link>
                  <Link 
                    to='/user/editProfile' 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Edit Profile
                  </Link>
                </div>
                
                <Link 
                  to='/course' 
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View Courses
                </Link>

                {/* Admin Request Button - Only show for regular users */}
                {user?.role === 'USER' && (
                  <Link 
                    to='/request-admin' 
                    className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Request Admin Access
                  </Link>
                )}

                {user?.role === "ADMIN" ? (
                  <Link 
                    to='/admin/dashboard' 
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Admin Dashboard
                  </Link>
                ) : user?.subscription?.status === "Active" ? (
                  <button
                    onClick={handleCancellation}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Cancel Subscription
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile