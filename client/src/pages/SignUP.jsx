import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

import { isEmail, isValidPassword } from "../helper/regexMatcher";
import HomeLayout from "../layouts/Layout";
import { createAccount } from "../redux/slices/authSlice";


const SignUP = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [signUpDetails, setSignUpDetails] = useState({
        email:'',
        fullName:'',
        password:'',
        avatar:'',
    });

    const [prevImage, setPrevImage] = useState(null);

    function handleUserInput(e){
        const { name, value} = e.target;
        setSignUpDetails({
            ...signUpDetails,
            [name]:value,
        });
    }

    function handleAvatar(e){
        e.preventDefault();
        const avatar = e.target.files[0];
        if(avatar.size > 1024 * 1024 * 5){
            toast.error("File size should be less than 5mb");
            return;
        }

        if(avatar.type !== "image/jpeg" && avatar.type !== "image/png" && avatar.type !== "image/jpg"){
            toast.error("File format is not supported");
            return;
        }

        setSignUpDetails({
            ...signUpDetails,
            avatar:avatar,
        });

        const fileReader = new FileReader();
        fileReader.readAsDataURL(avatar);
        fileReader.addEventListener("load",()=>{
            setPrevImage(fileReader.result);
        })

    }

    async function onFormSubmit(e){
        e.preventDefault();
        
        if( !signUpDetails.email || !signUpDetails.fullName || !signUpDetails.password ){
            toast.error("Please fill all the fields");
            return;
        }

        if(signUpDetails.fullName.length < 3){
            toast.error("Name must be atleast 3 characters");
            return;
        }

        if(!isEmail(signUpDetails.email)){
            toast.error("Please enter valid email");
            return;
        }

        if(!isValidPassword(signUpDetails.password)){
            toast.error("Password must be atleast 6 characters with one uppercase, one lowercase, one number and one special character");
            return;
        }

        // creating form data for avatar 
        const formData = new FormData();
        formData.append("fullName", signUpDetails.fullName);
        formData.append("email", signUpDetails.email);
        formData.append("password", signUpDetails.password);
        formData.append("avatar", signUpDetails.avatar);

        const response = await dispatch(createAccount(formData));
        if(response?.payload?.data){
            navigate("/");
        }
        setSignUpDetails({
            email:'',
            fullName:'',
            password:'',
            avatar:'',
        });
        
        setPrevImage(null);
    }

  return (
    <HomeLayout>
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
            <form onSubmit={onFormSubmit} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white">
                <h1 className="text-2xl text-center font-bold">Registration Page</h1>
                <label htmlFor="image_upload" className="cursor-pointer">
                    {
                        prevImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={prevImage} alt="user Image" />
                        ):(
                            <BsPersonCircle className="w-24 h-24 m-auto" />
                        )
                    }
                </label>
                <input type="file"
                className="hidden"
                onChange={handleAvatar}
                id="image_upload"
                name="image_upload"
                accept=" .jpg , .jpeg , .png , .svg" />

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="font-semibold">Name</label>
                    <input type="text"
                    onChange={handleUserInput}
                    value={signUpDetails.fullName}
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="p-2 rounded-lg outline-none bg-transparent border border-white" />
                </div>
                
                {/* Take an email from user */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input type="email"
                    onChange={handleUserInput}
                    value={signUpDetails.email}
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="p-2 rounded-lg outline-none bg-transparent border border-white" />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="Password" className="font-semibold">Password</label>
                    <input type="password"
                        onChange={handleUserInput}
                        value={signUpDetails.password}
                        name="password"
                        id="Password"
                        autoComplete="current-password"
                        placeholder="Enter your Password"
                        className="p-2 rounded-lg outline-none bg-transparent border border-white" />
                </div>

                {/* button for submit */}
                <button className="
                bg-blue-700 hover:bg-blue-500 transition-all ease-in-out duration-300 p-2 rounded-lg mt-2 cursor-pointer font-semibold 
                transform active:scale-90 active:bg-blue-700 active:outline-none focus:outline-none
                "
                type="submit" 
                >
                    Create Account
                </button>
                
                {/* button for login */}
                <p className="text-center">
                    Already have an account ? 
                    <Link to={`/login`} className="text-blue-500 hover:text-blue-300 transition-all ease-in-out duration-300"> Login </Link>
                    
                </p>

            </form>

        </div>
    </HomeLayout>
  )
}

export default SignUP