import { useNavigate } from "react-router-dom"

const CourseCard = ({data}) => {
  
  const navigate = useNavigate();

  return (
    <div 
    onClick={()=>{navigate("/course/description",{state:{...data}})}}
    className='bg-gray-900 text-white w-72 h-[120] shadow-lg rounded-lg cursor-pointer group overflow-hidden transition-all duration-500 hover:scale-105'>
        <div className='overflow-hidden '>
            <img 
                alt='Course Thumbnail'
                src={data?.thumbnail?.secure_url}
                className='w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-500'
            />
            <div className="p-4 space-y-2 text-white">
              <h2 className="text-2xl font-bold text-white capitalize line-clamp-2">
                {data?.title}
              </h2>
                <p className="line-clamp-2 text-gray-400">
                  {data?.description}
                </p>
                <p className="font-semibold">
                  Category:<span className="font-bold text-blue-600">{data?.category}</span>
                </p>
                <p className="font-semibold ">
                  Instructor:<span className="font-bold text-blue-600">{data?.createdBy}</span>
                </p>
                <p className="font-semibold inline-block">
                  Lectures : <span className="font-bold text-blue-600">{data?.numberOfLectures}</span>
                </p>
            </div>

        </div>

    </div>
  )
}

export default CourseCard