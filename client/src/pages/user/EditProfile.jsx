import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeLayout from '../../layouts/Layout'
import toast from 'react-hot-toast';
import { getUserData, updateProfile } from '../../redux/slices/authSlice';

const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [data,setData] = useState({
        fullName:"",
        previewImage:"",
        avatar:"",
        userId : useSelector((state)=>state?.auth?.data?.data?._id)
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

    }

  return (
    <HomeLayout>
      <div className='flex flex-col items-center justify-center min-h-[90vh] space-y-8'>
        <h1 className='text-2xl font-bold'>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='w-full max-w-md'>
          <div className='flex flex-col space-y-2'>
            <label className='font-semibold'>Full Name</label>
            <input type="text" name="fullName" value={data.fullName} onChange={handleChange} className='p-2 border rounded-md'/>
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='font-semibold'>Avatar</label>
            <input type="file" name="avatar" onChange={handleImageUpload} className='p-2 border rounded-md'/>
          </div>
          <div className='flex justify-center'>
            <img src={data.previewImage} alt="preview" className='w-24 h-24 object-cover rounded-full'/>
          </div>
          <div className='flex justify-center'>
            <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-md'>Update</button>
          </div>
        </form>
      </div>
    </HomeLayout>
  )
}

export default EditProfile