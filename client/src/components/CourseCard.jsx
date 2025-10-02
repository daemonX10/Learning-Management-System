import { useNavigate } from "react-router-dom"

const CourseCard = ({data}) => {
  
  const navigate = useNavigate();

  return (
    <div 
      onClick={()=>{navigate("/course/description",{state:{...data}})}}
      className='bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl cursor-pointer group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400/50 h-fit'
    >
        <div className='overflow-hidden'>
            <img 
                alt='Course Thumbnail'
                src={data?.thumbnail?.secure_url}
                className='w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-500'
            />
            <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-white line-clamp-2 leading-tight">
                    {data?.title}
                </h2>
                <p className="line-clamp-2 text-gray-300 text-sm leading-relaxed">
                    {data?.description}
                </p>
                
                <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Category:</span>
                        <span className="font-semibold text-blue-400 text-sm">{data?.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Instructor:</span>
                        <span className="font-semibold text-blue-400 text-sm">{data?.createdBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Lectures:</span>
                        <span className="font-semibold text-blue-400 text-sm">{data?.numberOfLectures}</span>
                    </div>
                </div>
                
                <div className="pt-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-300">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseCard