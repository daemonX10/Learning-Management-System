import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import HomeLayout from "../../layouts/Layout"
import { createNewCourse } from "../../redux/slices/courseSlice";


const CreateCourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ userInput, setUserInput ] = useState({
    title: "",
    description: "",
    createdBy: "",
    category: "",
    thumbnail: "",
    prevThumbnail: "",
    fileName: "",
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/jpg", "image/svg", "image/gif"],
    onDrop: (acceptedFile)=>{
      const uploadImage = acceptedFile[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onloadend = () => {
        setUserInput({
          ...userInput,
          thumbnail: uploadImage,
          prevThumbnail: fileReader.result,
          fileName: uploadImage.name,
        });
      }
    },
    onDropRejected:()=>{
      toast.error("Please select a valid image file. Please select a file with extension .jpeg, .png, .jpg, .svg, .gif");
    }
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    const validMimeType = ["image/jpeg","image/png","image/jpg","image/svg","image/gif"];
    if(uploadImage && validMimeType.includes(uploadImage.type)){
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onloadend = () => { // use addEventListener when using multiple events
        setUserInput({
          ...userInput,
          thumbnail: uploadImage,
          prevThumbnail: fileReader.result
        });
      }
    } else{
      toast.error("Please select a valid image file. Please select a file with extension .jpeg, .png, .jpg, .svg, .gif");
    }
  };

  const handleUserInput = (e) => {
    const { name , value } = e.target;
    setUserInput({
      ...userInput,
      [name]:value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(userInput.title === "" || userInput.description === "" || userInput.createdBy === "" || userInput.instructor === "" || userInput.thumbnail === ""){
      toast.error("Please fill all the fields");
      return;
  }

  if(userInput.description.length < 20){
    toast.error("Description should be atleast 20 characters long");
    return;
  }

  const response = await dispatch(createNewCourse(userInput));
  if(response.payload){
    toast.success(response.payload.message);
    // setUserInput({
    //   title: "",
    //   description: "",
    //   createdBy: "",
    //   instructor: "",
    //   thumbnail: "",
    //   prevThumbnail: "",
    // });
    navigate("/course");
  }
}


  return (
    <HomeLayout>
        <div className="min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
              <h1 className="text-3xl font-bold text-white text-center mb-8">
                Create New Course
              </h1>
              
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="block text-sm font-semibold text-gray-200">
                        Course Title
                      </label>
                      <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Enter course title"
                        value={userInput.title}
                        onChange={handleUserInput}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="createdBy" className="block text-sm font-semibold text-gray-200">
                        Instructor Name
                      </label>
                      <input 
                        type="text" 
                        name="createdBy" 
                        id="createdBy" 
                        placeholder="Enter instructor name"
                        value={userInput.createdBy}
                        onChange={handleUserInput}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="block text-sm font-semibold text-gray-200">
                        Category
                      </label>
                      <input 
                        type="text" 
                        name="category" 
                        id="category" 
                        placeholder="Enter course category"
                        value={userInput.category}
                        onChange={handleUserInput}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="block text-sm font-semibold text-gray-200">
                        Course Description
                      </label>
                      <textarea 
                        name="description" 
                        id="description" 
                        rows="6"
                        placeholder="Enter detailed course description (minimum 20 characters)"
                        value={userInput.description}
                        onChange={handleUserInput}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 outline-none resize-none"
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Right Column - Image Upload */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-200">
                        Course Thumbnail
                      </label>
                      
                      {/* Traditional File Input */}
                      <div className="space-y-4">
                        {userInput.fileName ? (
                          <div className="px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white">
                            <span className="text-gray-300">Selected file: </span>
                            <span className="font-semibold text-blue-400">{userInput.fileName}</span>
                          </div>
                        ) : (
                          <input 
                            type="file"
                            name="thumbnail" 
                            id="thumbnail" 
                            onChange={handleImageUpload}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                          />
                        )}
                      </div>
                      
                      {/* Drag & Drop Zone */}
                      <div className="mt-4">
                        <div 
                          {...getRootProps()} 
                          className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white/5"
                        >
                          <input {...getInputProps()} />
                          {userInput.prevThumbnail ? (
                            <div className="space-y-4">
                              <img
                                src={userInput.prevThumbnail}
                                alt="Course thumbnail preview"
                                className="max-h-64 max-w-full mx-auto rounded-lg object-cover shadow-lg"
                              />
                              <p className="text-gray-300 text-sm">Click or drag to change image</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <p className="text-white font-semibold">Drag & drop an image here</p>
                              <p className="text-gray-400 text-sm">or click to select a file</p>
                              <p className="text-gray-500 text-xs">Supported formats: JPEG, PNG, JPG, SVG, GIF</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </HomeLayout>
  )
}

export default CreateCourse

{/* {
  "success": true,
  "message": "Course created successfully",
  "data": {
    "title": "Full Stack Developer",
    "description": "Best course for Web Development . Build on latext Tech stack . NodeJs ,NextJs , ReactJs , Js , HTML , Css",
    "category": "Web Developer",
    "thumbnail": {
      "public_id": "lms/kwowk07nwgek4e72c6ey",
      "secure_url": "https://res.cloudinary.com/dpzitkiqb/image/upload/v1706640352/lms/kwowk07nwgek4e72c6ey.jpg"
    },
    "numberOfLectures": 0,
    "createdBy": "damodar yadav",
    "_id": "65b943de8837a391864f0458",
    "lectures": [],
    "createdAt": "2024-01-30T18:45:50.667Z",
    "updatedAt": "2024-01-30T18:45:52.812Z",
    "__v": 0
  }
} */}