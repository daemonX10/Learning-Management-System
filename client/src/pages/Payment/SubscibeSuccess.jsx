
import { useEffect } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import HomeLayout from '../../layouts/Layout'
import { getUserData } from '../../redux/slices/authSlice';

const SubscibeSuccess = () => {

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getUserData());
    })

  return (
    <HomeLayout>
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-slate-800'>
            <div className='w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto flex flex-col justify-center bg-white rounded-xl shadow-lg p-6'>
                <div className='flex justify-center'>
                    <AiFillCheckCircle className='text-6xl text-green-500' />
                </div>
                <h1 className='text-3xl font-bold text-center text-gray-700 mb-4'>
                    Payment Successful
                </h1>
                <p className='text-lg text-gray-600 mt-2 text-center leading-relaxed'>
                    Welcome to Pro bundle. You have successfully subscribed to our Pro bundle. You can now enjoy all the benefits that come with it.
                </p>
                <button className='mt-6 px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none'>
                    <Link to='/'>
                        Continue
                    </Link>
                </button>
            </div>
        </div>
    </HomeLayout>
  )
}

export default SubscibeSuccess