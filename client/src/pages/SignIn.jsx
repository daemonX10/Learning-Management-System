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
        <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
            <form onSubmit={onFormSubmit} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white' >
                <h1 className='text-2xl text-center font-bold'>Login Page</h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email"
                    className='font-semibold'>Email</label>
                    <input type="email" name='email'
                    onChange={handleUserInput}
                    value={signInDetails.email}
                    id='email'
                    placeholder='Enter the Registered Email'
                    autoComplete='email'
                    className='p-2 rounded-lg outline-none bg-transparent border border-white' />
                </div>
                <div className='flex flex-col gap1'>
                    <label htmlFor="password"
                    className='font-semibold'>Password</label>
                    <input type="password" name='password'
                    onChange={handleUserInput}
                    value={signInDetails.password}
                    id='password'
                    placeholder='Enter the Password'
                    autoComplete='current-password'
                    className='p-2 rounded-lg outline-none bg-transparent border border-white' />
                </div>

                  {/* button for submit */}
                <button className="
                bg-blue-700 hover:bg-blue-500 transition-all ease-in-out duration-300 p-2 rounded-lg mt-2 cursor-pointer font-semibold 
                transform active:scale-90 active:bg-blue-700 active:outline-none focus:outline-none"
                type="submit">
                    Login
                </button>

                {/* button for login */}
                <p className="text-center">
                    Don't have an account ?
                    <Link to={`/signup`} className="text-blue-500 hover:text-blue-300 transition-all ease-in-out duration-300"> SignUp </Link>
                </p>
            </form>
        </div>

    </HomeLayout>
  )
}

export default SignIn