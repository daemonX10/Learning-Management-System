/**
 * The above code is a React component for a sign-in page that handles user input, form submission, and
 * navigation.
 */
import { useState } from 'react';
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { isEmail } from '../helper/regexMatcher';
import HomeLayout from '../layouts/Layout'
import { login } from '../redux/slices/authSlice';


const SignIn = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signInDetails, setSignInDetails] = useState({
        email: '',
        password:''
    });

    function handleUserInput(e){
        const {name,value} = e.target;
        setSignInDetails({
            ...signInDetails,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!signInDetails.email || !signInDetails.password){
            toast.error("Please fill Email and Password");
            return;
        }

        if(!isEmail(signInDetails.email)){
            toast.error("Enter a Valid Email");
            return;
        }

        const response = await dispatch(login(signInDetails));
        if(response?.payload?.data){
            navigate("/");
        }

        setSignInDetails({
            email:'',
            password:''
        });
    }


  return (
    <HomeLayout>
        <div className='flex items-center justify-center min-h-[90vh] px-4 py-8'>
            <div className='w-full max-w-md'>
                <form onSubmit={onFormSubmit} className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-2xl' >
                    <h1 className='text-3xl text-center font-bold text-white mb-8'>Welcome Back</h1>
                    
                    <div className='space-y-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='font-semibold text-gray-200 text-sm'>
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name='email'
                                onChange={handleUserInput}
                                value={signInDetails.email}
                                id='email'
                                placeholder='Enter your registered email'
                                autoComplete='email'
                                className='p-3 rounded-lg outline-none bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300' 
                            />
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className='font-semibold text-gray-200 text-sm'>
                                Password
                            </label>
                            <input 
                                type="password" 
                                name='password'
                                onChange={handleUserInput}
                                value={signInDetails.password}
                                id='password'
                                placeholder='Enter your password'
                                autoComplete='current-password'
                                className='p-3 rounded-lg outline-none bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300' 
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all ease-in-out duration-300 p-3 rounded-lg mt-8 cursor-pointer font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        type="submit"
                    >
                        Sign In
                    </button>

                    {/* Forgot password link */}
                    <div className="text-center mt-4">
                        <Link 
                            to="/forgot-password" 
                            className="text-blue-400 hover:text-blue-300 transition-all ease-in-out duration-300 text-sm"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-gray-300 mt-6">
                        Don't have an account? {' '}
                        <Link to={`/signup`} className="text-blue-400 hover:text-blue-300 transition-all ease-in-out duration-300 font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </HomeLayout>
  )
}

export default SignIn