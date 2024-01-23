import { useNavigate } from "react-router-dom"
const CourseCard = ({data}) => {
  
  const navigate = useNavigate();

  return (
    <div 
    onClick={()=>{navigate("/course/description",{state:{...data}})}}
    className='text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700'>
        <div className='overflow-hidden '>
            <img 
                alt='Course Thumbnail'
                src={data?.thumbnail?.secure_url}
                className='w-full h-[200px] object-cover transform group-hover:scale-110 transition-all duration-500'
            />
            <div className="p-3 space-y-1 text-white">
              <h2 className="text-xl font-bold text-white capitalize line-clamp-2">
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