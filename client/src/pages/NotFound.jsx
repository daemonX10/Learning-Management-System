import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white">
        404
      </h1>
      <h2 className=" bg-black font-semibold text-white absolute px-2 text-xl rounded rotate-12">
        Page Not Found
      </h2>
      <button className="mt-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        <a onClick={()=> navigate(-1)} className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FontAwesomeIcon icon={faArrowLeft} className='pr-2' />
          Go Back
        </a>
      </button>
    </div>
  )
}

export default NotFound