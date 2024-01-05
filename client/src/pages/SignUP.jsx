import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"

import HomeLayout from "../layouts/Layout";


const SignUP = () => {
    
    const navigate = useNavigate();
    
    const [signUpDetails, setSignUpDetails] = useState({
        email:'',
        fullname:'',
        password:'',
        avatar:'',
    });

    const [prevImage, setPrevImage] = useState(null);

  return (
    <HomeLayout>
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
            <form noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white">
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
                id="image_upload"
                name="image_upload"
                accept=" .jpg , .jpeg , .png , .svg" />

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="font-semibold">Name</label>
                    <input type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="p-2 rounded-lg outline-none bg-transparent border border-white" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    autoCapitalize="email"
                    className="p-2 rounded-lg outline-none bg-transparent border border-white" />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label htmlFor="Password" className="font-semibold">Password</label>
                    <input type="text"
                        name="Password"
                        id="Password"
                        autoComplete="current-password"
                        placeholder="Enter your Password"
                        className="p-2 rounded-lg outline-none bg-transparent border border-white" />
                </div>

                {/* button for submit */}
                <button className="
                bg-blue-700 hover:bg-blue-500 transition-all ease-in-out duration-300 p-2 rounded-lg mt-2 cursor-pointer font-semibold 
                ">
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