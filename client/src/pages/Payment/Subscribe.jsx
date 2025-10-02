import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { BiRupee } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeLayout from '../../layouts/Layout';
import { purchaseCourseBundle, verifyUserPayment } from '../../redux/slices/razorPaySlice';
import { getRazorPayId } from '../../redux/slices/razorPaySlice';

const Subscribe = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const razorpayKey = useSelector((state) =>( state?.razorpay?.key))

  const subscription_id = useSelector((state )=> (state?.razorpay?.subscription_id));


  const isPaymantSuccess = useSelector((state) => (state?.razorpay?.isPaymantSuccess))
  const userData = useSelector((state) => (state?.auth?.user))

  const paymentDetails = {
    razorpay_payment_id: '',
    razorpay_subscription_id: '',
    razorpay_signature: '',
  }

  async function load() {
    await dispatch(getRazorPayId())
  }

  useEffect(() => {
    load()
  }, []);


  async function handleSubscription(e){
    e.preventDefault()
    if(!razorpayKey){
      toast.error('Invalid Payment Gateway')
      return
    }

    // Wait for the purchaseCourseBundle action to complete
    try {
      const response = await dispatch (purchaseCourseBundle());
      
      if(!response.payload || !response.payload.subscription_id){
        toast.error("Failed to Create Subscription Id")
        return
      }

    const option = {
      key: razorpayKey,
      subscription_id: response.payload.subscription_id,
      name: "Git daemonX10",
      description: " No money will be deducted from your account",
      theme: {
        color: '#3B82F6'
      },
      handler : async function (response ){
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id
        paymentDetails.razorpay_signature = response.razorpay_signature

        toast.success('Payment Success');

        // Verifing the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success ? navigate('/payment/subscribe/success') : navigate('/payment/subscribe/fail')
      }
    }
    
    const paymentOption = new window.Razorpay(option);
    paymentOption.open()
  
      } catch (error) {
    console.log(error);
    toast.error('An error occurred while processing your subscription' + error.message)
  }
}

  return (
    <HomeLayout>
      <div className='min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='w-full max-w-lg'>
          <form onSubmit={handleSubscription} className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl overflow-hidden'>
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center'>
              <h1 className='text-3xl font-bold text-white'>Premium Subscription</h1>
              <p className='text-blue-100 mt-2'>Unlock unlimited access to all courses</p>
            </div>

            {/* Content */}
            <div className='p-8 space-y-6'>
              {/* Features */}
              <div className='space-y-4'>
                <h2 className='text-xl font-semibold text-white text-center'>What's Included</h2>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-gray-300'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span>Access to all current and future courses</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-300'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span>Learn at your own pace, anytime, anywhere</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-300'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span>Expert instructors and industry professionals</span>
                  </div>
                  <div className='flex items-center gap-3 text-gray-300'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <span className='text-emerald-400 font-medium'>1 full year of unlimited access</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className='bg-white/5 rounded-xl p-6 text-center'>
                <div className='flex items-center justify-center text-4xl font-bold text-white mb-2'>
                  <BiRupee className='text-green-400' />
                  <span className='text-green-400'>1</span>
                </div>
                <p className='text-gray-300 text-lg'>One-time payment</p>
                <p className='text-gray-400 text-sm mt-1'>No hidden fees or recurring charges</p>
              </div>

              {/* Guarantee */}
              <div className='bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center'>
                <p className='text-green-400 font-semibold text-lg'>💯 100% Money-Back Guarantee</p>
                <p className='text-gray-400 text-sm mt-1'>Terms and conditions apply *</p>
              </div>

              {/* CTA Button */}
              <button 
                type='submit' 
                className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg'
              >
                Subscribe Now →
              </button>

              {/* Additional Info */}
              <div className='text-center text-gray-400 text-sm'>
                <p>Secure payment powered by Razorpay</p>
                <p className='mt-1'>No payment will be deducted during testing</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Subscribe