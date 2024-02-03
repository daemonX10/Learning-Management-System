import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/Layout";

const CourseDescription = () => {
    const {state } = useLocation();
    const navigate = useNavigate();

    const  { role, data } = useSelector((state)=>state.auth)

  // ...

  return (
    <HomeLayout>
      <motion.div 
        className="min-h-[90vh] pt-12 px-4 md:px-20 flex flex-col items-start justify-start text-white bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative max-w-2xl mx-auto border-2 border-blue-500 rounded-lg shadow-lg p-5">
          {/* Left of the grid */}
          <div className="space-y-5 sm:flex sm:items-center sm:flex-col">
            <motion.img
              className="w-full h-auto sm:max-w-sm object-cover rounded-lg"
              src={state?.thumbnail?.secure_url}
              alt="Course thumbnail"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="flex flex-col items-start justify-between text-xl">
              <p className="font-semibold text-2xl">
                <span className="font-bold text-blue-500">Total Lectures: {" "}  </span> {state?.numberOfLectures}
              </p>
              <p className="font-semibold text-2xl capitalize text-white ">
                <span className="font-bold text-blue-500"> Instructor: {" "}  </span> {state?.createdBy}
              </p>
            </div>
              {
              role ==="ADMIN" || data?.subscription?.status === "active" ? (
                <button className="bg-green-500 hover:bg-green-400 text-white font-semibold rounded-md py-1 px-2"
                onClick={()=>navigate("/course/displayLecture", {state:{...state}})}
                >Watch Lectures</button>
              ) : (
                <button className="bg-green-500 hover:bg-green-400 text-white font-semibold rounded-md py-1 px-2"
                onClick={()=>navigate("/payment/subscribe")}
                >Subscribe</button>
              )}
          </div>

          {/* Right of the grid */}
          <div className="space-y-2 text-xl capitalize">
            <h1 className="text-3xl font-bold text-blue-500 mb-5 text-center shadow  ">
              {state?.title}
            </h1>
            <p className="text-blue-500 font-semibold text-center ">
              course Description : {" "} <span className=" text-white md:text-start">{state?.description}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </HomeLayout>
  )
}

export default CourseDescription