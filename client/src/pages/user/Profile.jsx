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
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg">
          <div>
            <img className="mx-auto h-[12rem] w-auto rounded-full border-4 border-blue-500 shadow-2xl transition-transform duration-500 hover:scale-110 animate-glow" src={user?.avatar?.secure_url} alt="Profile"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold capitalize text-white">
              {user?.fullName}
            </h2>
          </div>
          <div className="mt-8 space-y-6 bg-gray-900 p-4 rounded-lg shadow-lg">
            <div className="rounded-md shadow-sm space-y-2 font-extrabold leading-loose ">
              <p className="text-sm text-blue-500">Email : <span className="text-blue-600 ml-1">{user?.email}</span></p>
              <p className="text-sm text-blue-500 capitalize">Role : <span className="text-blue-600 ml-1">{user?.role}</span></p>
              <p className="text-sm text-blue-500 capitalize">Subscription : <span className="text-blue-600 ml-1">{user?.role === "ADMIN" ? "Active" : ( user?.subscription?.status === "Active" ? "Active" : "Inactive") }</span></p>
            </div>

            <div className="flex items-center justify-between">
              <Link to='/changePassword' className="group relative  flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Change Password
              </Link>
              <Link to='/user/editProfile' className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit Profile
              </Link>
            </div>
            <div className="flex-col items-center justify-center space-y-3 ">
              <Link to='/course' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Courses
              </Link>

              {
                user?.role === "ADMIN" ? 
                  <>
                    <Link to='/admin/dashboard' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Dashboard
                    </Link>
                  </>
                : 
                  user?.subscription?.status === "Active" ? 
                    <Link to='/cancelSubscription'
                          onClick={handleCancellation}
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Cancel Subscription
                    </Link>
                  :
                    null
              }
              
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile