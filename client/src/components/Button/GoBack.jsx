import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GoBack = ({ errorCode = 404, message = "Not Found Page" }) => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-blue-600">{errorCode}</h1>
            <h2 className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 text-2xl rounded-lg shadow-md">
                {message}
            </h2>

            {(errorCode === 403) ? 
            <button>
                    <Link to="/" className="mt-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
                    <FontAwesomeIcon icon={faArrowLeft} className='pr-2' />
                    Go Home
                </Link>
            </button> :
            <button
                onClick={ ()=> navigate(-1)}
                className="mt-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            >
                <FontAwesomeIcon icon={faArrowLeft} className='pr-2' />
                Go Back
            </button>}
        </div>
    );
}

export default GoBack;
