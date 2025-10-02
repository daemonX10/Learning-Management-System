import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/Layout";

const CourseDescription = () => {
    const {state } = useLocation();
    const navigate = useNavigate();

    const  { role, user } = useSelector((state)=>state.auth)

  // ...

  return (
    <HomeLayout>
      <motion.div 
        className="min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              
              {/* Left side - Course Image and Info */}
              <motion.div 
                className="space-y-6"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="relative">
                  <img
                    className="w-full h-72 object-cover rounded-xl shadow-lg"
                    src={state?.thumbnail?.secure_url}
                    alt="Course thumbnail"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium">Total Lectures:</span>
                      <span className="text-blue-400 font-bold text-lg">{state?.numberOfLectures}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium">Instructor:</span>
                      <span className="text-blue-400 font-bold text-lg">{state?.createdBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium">Category:</span>
                      <span className="text-blue-400 font-bold text-lg">{state?.category}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    {role === "ADMIN" || user?.subscription?.status === "Active" ? (
                      <button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 px-6 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        onClick={() => navigate("/course/displayLecture", {state: {...state}})}
                      >
                        Watch Lectures
                      </button>
                    ) : (
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 px-6 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        onClick={() => navigate("/payment/subscribe")}
                      >
                        Subscribe to Access
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right side - Course Details */}
              <motion.div 
                className="space-y-6"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {state?.title}
                  </h1>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400">Course Description</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {state?.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400">What You'll Learn</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Comprehensive course content from industry experts</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Practical knowledge and real-world applications</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Access to {state?.numberOfLectures} detailed lectures</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Learn at your own pace, anytime, anywhere</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </HomeLayout>
  )
}

export default CourseDescription