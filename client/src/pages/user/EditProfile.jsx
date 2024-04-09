import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import HomeLayout from '../../layouts/Layout'
import {  updateProfile } from '../../redux/slices/authSlice';

const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [data,setData] = useState({
        fullName:"",
        previewImage:useSelector((state)=>state?.auth?.user?.avatar?.secure_url),
        avatar:'',
        userId : useSelector((state)=>state?.auth?.user?._id)
    })

    function handleImageUpload(e){
      e.preventDefault();
      const uploadedImage = e.target.files[0];
      if(uploadedImage){
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.addEventListener("load",function(){
          setData({
            ...data,
            previewImage:this.result,
            avatar:uploadedImage
          })
        })
      }
    }

    function handleChange(e){
      e.preventDefault();
      const {name,value} = e.target;
      setData({
        ...data,
        [name]:value
      });
    }

    async function handleSubmit(e){
      e.preventDefault();
      if(!data.fullName || !data.avatar){
        return toast.error("Please fill all the fields")
      }

      if(data.fullName.length < 3){
        return toast.error("Name should be atleast 3 characters long")
      }

      const formData = new FormData();
      formData.append("fullName",data.fullName);
      formData.append("avatar",data.avatar);
      await dispatch(updateProfile(formData));
      navigate('/user/profile');
    }

  return (
    <HomeLayout>
      <div className='min-h-[90vh] flex justify-center items-center bg-gray-900'>
        <form className='w-full max-w-lg h-[80%] mx-3 flex flex-col justify-center items-center gap-6 rounded-lg p-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-opacity-40 text-white shadow-lg backdrop-filter backdrop-blur-md my-8'
              onSubmit={handleSubmit}
        >
          <h1 className='text-3xl font-bold mb-4 text-white'>
            Edit Profile
          </h1>

          <label htmlFor="image_upload" className='w-40 h-40 overflow-hidden cursor-pointer rounded-full mb-6 bg-cover '>
            <img src={data.previewImage} alt="Profile" className='w-full h-full object-cover'/>
          </label>
          <input 
            className='hidden'
            type='file'
            onChange={handleImageUpload}
            id='image_upload'
            name='image_upload'
            accept='.jpg , .png , .jpeg , .svg'
          />

          <div className='flex flex-col gap-4 w-full'>
            <label htmlFor="fullName" className='text-lg font-medium text-white'> Full Name</label>
            <input type="text"
              placeholder='Enter Your name'
              name='fullName'
              id='fullName'
              value={data.fullName}
              onChange={handleChange}
              className='px-4 py-2 bg-white bg-opacity-20 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 mt-6 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded transition-colors duration-200 transform hover:scale-105'
          >
            Update Profile
          </button>
          <Link to='/user/profile' className='mt-4 text-white hover:bg-blue-600 hover:px-2 hover:py1 hover:text-purple-500 transition-colors duration-200 transform hover:scale-105'>
            Cancel
          </Link>
        </form>
      </div>
    </HomeLayout>
  )
}

export default EditProfile