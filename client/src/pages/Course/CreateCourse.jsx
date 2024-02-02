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
        <div className="min-h-[100vh] flex items-center justify-center">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black]"
          >
            <h1 className="text-2xl text-center font-semibold">Create New Course</h1>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Enter course title"
                value={userInput.title}
                onChange={handleUserInput}
                className="px-2 py-1 rounded-md bg-[#333333] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea 
                name="description" 
                id="description" 
                cols="30" 
                rows="5"
                placeholder="Enter course description"
                value={userInput.description}
                onChange={handleUserInput}
                className="px-2 py-1 rounded-md bg-[#333333] outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="createdBy">Created By</label>
              <input 
                type="text" 
                name="createdBy" 
                id="createdBy" 
                placeholder="Enter course created by"
                value={userInput.createdBy}
                onChange={handleUserInput}
                className="px-2 py-1 rounded-md bg-[#333333] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor="category">Category</label>
              <input 
                type="text" 
                name="category" 
                id="category" 
                placeholder="Enter course category"
                value={userInput.category}
                onChange={handleUserInput}
                className="px-2 py-1 rounded-md bg-[#333333] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="thumbnail">Thumbnail</label>
              {userInput.fileName ? (
                <div className="px-2 py-1 rounded-md bg-[#333333] text-white outline-none border border-white">
                  Selected file: <span className="font-bold">{userInput.fileName}</span>
                </div>
              ) : (
                <input 
                  type="file"
                  name="thumbnail" 
                  id="thumbnail" 
                  placeholder="Enter course thumbnail"
                  onChange={handleImageUpload}
                  className="px-2 py-1 rounded-md bg-[#333333] outline-none"
                />
              )}
            </div>
          <div className="flex items-center justify-center">
            <div {...getRootProps()} className="dropzone max-w-[250px] bg-gray-500 rounded-md " >
              <input  {...getInputProps()} />
              {userInput.prevThumbnail ? (
                <div className="flex flex-col gap-2 items-center">
                  <img
                    src={userInput.prevThumbnail}
                    alt="thumbnail"
                    className="max-h-[250px] max-w-[250px] rounded-md object-cover"
                  />
                </div>) : (
                <p className="text-center text-white text-xl font-semibold
                ">Drag 'n' drop or click to select file</p>
              )}
            </div>
          </div>

            <div className="flex justify-center">
              <button 
                type="submit"
                className="px-4 py-2 bg-[#333333] rounded-md"
              >Create Course</button>
            </div>
          </form>
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