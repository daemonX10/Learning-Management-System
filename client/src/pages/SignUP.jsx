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
        <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
            <div className="w-full max-w-md">
                <form onSubmit={onFormSubmit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-2xl">
                    <h1 className="text-3xl text-center font-bold text-white mb-8">Create Account</h1>
                    
                    {/* Avatar Upload */}
                    <div className="flex justify-center mb-6">
                        <label htmlFor="image_upload" className="cursor-pointer group">
                            <div className="relative">
                                {prevImage ? (
                                    <img className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-lg" src={prevImage} alt="Profile Preview" />
                                ) : (
                                    <BsPersonCircle className="w-24 h-24 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                                )}
                                <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-xs font-semibold">Change</span>
                                </div>
                            </div>
                        </label>
                        <input 
                            type="file"
                            className="hidden"
                            onChange={handleAvatar}
                            id="image_upload"
                            name="image_upload"
                            accept=".jpg,.jpeg,.png,.svg" 
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullName" className="font-semibold text-gray-200 text-sm">
                                Full Name
                            </label>
                            <input 
                                type="text"
                                onChange={handleUserInput}
                                value={signUpDetails.fullName}
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                className="p-3 rounded-lg outline-none bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300" 
                            />
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-semibold text-gray-200 text-sm">
                                Email Address
                            </label>
                            <input 
                                type="email"
                                onChange={handleUserInput}
                                value={signUpDetails.email}
                                name="email"
                                id="email"
                                placeholder="Enter your email address"
                                autoComplete="email"
                                className="p-3 rounded-lg outline-none bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300" 
                            />
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="Password" className="font-semibold text-gray-200 text-sm">
                                Password
                            </label>
                            <input 
                                type="password"
                                onChange={handleUserInput}
                                value={signUpDetails.password}
                                name="password"
                                id="Password"
                                autoComplete="new-password"
                                placeholder="Create a strong password"
                                className="p-3 rounded-lg outline-none bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300" 
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Password must be at least 6 characters with uppercase, lowercase, number and special character
                            </p>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all ease-in-out duration-300 p-3 rounded-lg mt-8 cursor-pointer font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        type="submit" 
                    >
                        Create Account
                    </button>
                    
                    {/* Login link */}
                    <p className="text-center text-gray-300 mt-6">
                        Already have an account? {' '}
                        <Link to={`/login`} className="text-blue-400 hover:text-blue-300 transition-all ease-in-out duration-300 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </HomeLayout>
  )
}

export default SignUP