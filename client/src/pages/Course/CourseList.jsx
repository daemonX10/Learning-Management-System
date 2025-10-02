import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import CourseCard from "../../components/CourseCard"
import HomeLayout from "../../layouts/Layout"
import { getAllCourses } from "../../redux/slices/courseSlice"

const CourseList = () => {

    const dispatch = useDispatch();
    const  { courseList } = useSelector(state => state.course);

    async function loadCourses(){
        await dispatch(getAllCourses())
    }

    useEffect(()=>{
        loadCourses()
    },[])

  return (
    <HomeLayout>
        <div className="min-h-screen pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Explore Courses Made by {" "} 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Industry Experts
                        </span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Discover high-quality courses designed by professionals to help you advance your career
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {courseList?.length > 0 ? (
                        courseList.map(element => (
                            <CourseCard key={element._id} data={element} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-lg">No courses available at the moment</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </HomeLayout>
  )
}

export default CourseList