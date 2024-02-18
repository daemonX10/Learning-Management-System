import { useDispatch, useSelector } from 'react-redux';
import HomeLayout from '../../layouts/Layout';
import { useNavigate } from 'react-router-dom';
import { purchaseCourseBundle, verifyUserPayment } from '..//../redux/slices/razorPaySlice';
import toast from 'react-hot-toast';
import { BiRupee } from 'react-icons/bi';
import { useEffect } from 'react';
import { getRazorPayId } from '../../redux/slices/razorPaySlice';

const Subscribe = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const razorpayKey = useSelector((state) =>( state?.razorpay?.key))

  const subscription_id = useSelector((state )=> (state?.razorpay?.subscription_id));
  console.log('subscription_id',subscription_id)
  const isPaymantSuccess = useSelector((state) => (state?.razorpay?.isPaymantSuccess))
  const userData = useSelector((state) => (state?.auth?.user))

  const paymentDetails = {
    razorpay_payment_id: '',
    razorpay_subscription_id: '',
    razorpay_signature: '',
  }

  async function load() {
    await dispatch(getRazorPayId()),
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load()
  }, []);



  async function handleSubscription(e){
    e.preventDefault()
    if(!razorpayKey || !subscription_id){
      toast.error('Invalid Payment Gateway')
      return
    }

    const option = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name : "Course Private Limited",
      description : "Course Subscription",
      theme :{
        color: '#f37254'
      },
      handler : async function (response ){
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id
        paymentDetails.razorpay_signature = response.razorpay_signature

        toast.success('Payment Success');

        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success ? navigate('/subscribe/success') : navigate('/subscribe/fail')
      }
    }

    const paymentOption = new window.Razorpay(option);
    paymentOption.open()

  }

  return (
    <HomeLayout>
    <form className='min-h-screen flex items-center justify-center bg-gray-900' onSubmit={handleSubscription}>
      <div className='w-full max-w-md mx-3 flex-col justify-center items-center bg-white rounded-lg shadow-md '>
        <h1 className='text-2xl font-bold text-center top-0  w-full mb-4 px-4 py-2 bg-blue-500 rounded-t-md text-blue-100'>Subscription</h1>
        

         {/* opinion opener */}
        {/* <div className='mb-4'>
          <label className='block text-sm text-gray-600 mb-2' htmlFor='subscriptionType'>Subscription Type</label>
          <select className='w-full px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' id='subscriptionType' required>
            <option value=''>Select a subscription type</option>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
          </select>
        </div> */}

        <div className='px-4 space-y-5 text-center p-6'>
          <p className='text-[17px] text-slate-950 font-medium'>
              This purchase will allow you to access all the courses on our platform for a  <span className='text-emerald-600'>period of 1 year</span> . All the exitsing courses and the new courses that will be added in the next 1 year will be accessible to you.
          </p>

          <p className=' w-full flex items-center justify-center font-bold tracking-wide text-2xl text-red-500'>
            Price : <BiRupee />
            <span className='text-red-500'> 1 </span>
          </p>

          <div className='text-gray-600 accent-current'>
            <p className='text-lg font-bold text-green-500'>100% refund on cancellation</p>
            <p className='text-sm text-slate-500'>Terms and Conditions apply *</p>
          </div>
        </div>

        <button type='submit' className='w-fit py-2 px-4 m-4 text-sm text-center text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent block mx-auto'> Buy Now {'>>'} </button>
      </div>
    </form>
    </HomeLayout>
  )
}

export default Subscribe