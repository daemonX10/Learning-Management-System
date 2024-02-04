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

    console.log(data)

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
      await dispatch(updateProfile([data.userId,formData]));
      await dispatch(getUserData());

      
    }

  return (
    <HomeLayout>
        
    </HomeLayout>
  )
}

export default EditProfile