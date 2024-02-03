import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import HomeLayout from "../../layouts/Layout"

const Profile = () => {
  
  const user = useSelector(state => state?.auth?.data?.data);
  const dispatch = useDispatch();
  console.log('user' , user);

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg">
          <div>
            <img className="mx-auto h-[12rem] w-auto rounded-full" src={user?.avatar?.secure_url} alt="Profile"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold capitalize text-white">
              {user?.fullName}
            </h2>
          </div>
          <div className="mt-8 space-y-6 bg-gray-900 p-4 rounded-lg shadow-lg">
            <div className="rounded-md shadow-sm space-y-2 font-extrabold leading-loose ">
              <p className="text-sm text-blue-500">Email : <span className="text-blue-600 ml-1">{user?.email}</span></p>
              <p className="text-sm text-blue-500 capitalize">Role : <span className="text-blue-600 ml-1">{user?.role}</span></p>
              <p className="text-sm text-blue-500 capitalize">Subscription : <span className="text-blue-600 ml-1">{user?.subscription?.status === "Active"?"Active":"Inactive"}</span></p>
            </div>

            <div className="flex items-center justify-between">
              <Link to='/changePassword' className="group relative  flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Change Password
              </Link>
              <Link to='/editProfile' className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit Profile
              </Link>
            </div>
            <div className="flex items-center justify-center">
              {
                user?.role === "ADMIN" ? 
                  <>
                    <Link to='/admin/dashboard' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Dashboard
                    </Link>
                  </>
                : 
                  user?.subscription?.status === "active" ? 
                    <Link to='/cancelSubscription' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Cancel Subscription
                    </Link>
                  :
                    <Link to='/course' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Courses
                    </Link>
              }
              
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile