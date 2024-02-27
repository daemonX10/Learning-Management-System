import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import HomeLayout from "../../layouts/Layout"
import { addCourseLecture } from "../../redux/slices/lectureSlice";

const inputClass = "bg-gray-800 text-white px-4 py-2 border border-gray-700 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500";


const AddLecture = () => {

const courseDetails = useLocation().state;

const dispatch = useDispatch();
const navigate = useNavigate();

const [userInput, setUserInput] = useState({
    courseId:courseDetails?._id,
    lecture:undefined,
    title:'',
    description:'',
    videoSrc:'',
});

const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserInput({...userInput, [name]:value})
};

const getVideo = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    setUserInput({...userInput, lecture:video, videoSrc:source})
}

const handleFormSubmit = async (e) =>{
    e.preventDefault();

    // checking for the empty fields
    if(!userInput.title || !userInput.description || !userInput.lecture){
        toast.error('All fields are required');
        return;
    }

    const response = await dispatch(addCourseLecture(userInput));
    if(response.payload.success){
        toast.success(response.payload.message);
        setUserInput({
            courseId:courseDetails?._id,
            lecture:undefined,
            title:'',
            description:'',
            videoSrc:'',
        });
        navigate('/course');
    }
}

return (
    <HomeLayout>
        <div className="w-full flex flex-col items-center justify-center gap-10 min-h-screen text-white">
            <div className="flex flex-col gap-6 p-8 shadow-lg w-full md:w-1/2 lg:w-1/3 rounded-lg bg-gray-800 text-white">
                <header className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-xl text-green-500"
                    >
                        <AiOutlineArrowLeft />
                    </button>
                    <h1 className="text-2xl text-blue-500 font-semibold">
                        Add Your New Lecture
                    </h1>
                </header>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <input
                        type="text"
                        name="title"
                        value={userInput.title}
                        onChange={handleInputChange}
                        placeholder="Enter the title for the lecture"
                        className={`${inputClass} focus:ring-blue-500 bg-opacity-80`}
                    />

                    <textarea
                        name="description"
                        value={userInput.description}
                        onChange={handleInputChange}
                        placeholder="Enter the description for the lecture"
                        className={`${inputClass} resize-none overflow-y-scroll h-24 focus:ring-blue-500 bg-opacity-80`}
                    />

                    {userInput.videoSrc ? (
                        <video
                            src={userInput.videoSrc}
                            muted
                            controls
                            controlsList="nodownload nofullscreen"
                            disablePictureInPicture
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                        ></video>
                    ) : (
                        <div className="h-20 border flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-gray-800 transition duration-300">
                            <label
                                htmlFor="lecture"
                                className="font-semibold text-xl cursor-pointer text-white"
                            >
                                Choose Your Video
                            </label>
                            <input
                                type="file"
                                name="lecture"
                                id="lecture"
                                onChange={getVideo}
                                accept="video/mp4,video/x-m4v,video/*"
                                className="hidden"
                            />
                        </div>
                    )}
                    <button className="py-2 font-semibold text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow w-full transition duration-300">
                        Add Lecture
                    </button>
                </form>
            </div>
        </div>
    </HomeLayout>
)
}

export default AddLecture