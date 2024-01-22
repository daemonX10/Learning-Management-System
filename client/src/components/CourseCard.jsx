
const CourseCard = ({data}) => {

  return (
    <div className='text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700'>
        <div className='overflow-hidden '>
            <img 
                alt='Course Thumbnail'
                src={data?.thumbnail?.secure_url}
                className='w-full h-[200px] object-cover transform group-hover:scale-110 transition-all duration-500'
            />

        </div>

    </div>
  )
}

export default CourseCard