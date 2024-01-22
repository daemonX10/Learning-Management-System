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
        <div className="min-h-[90vh] pt-12 flex flex-col gap-10 text-white">
            <h1 className="text-center text-4xl font-semibold mb-5">
                Explore Courses Made by {" "} 
                <span className="font-bold text-blue-600">Industry Experts</span>
            </h1>
            <div className="mb-10 flex flex-wrap gap-14">
                {
                    courseList?.map(element => <CourseCard key={element._id} data={element} />)
                }
            </div>

        </div>
    </HomeLayout>
  )
}

export default CourseList