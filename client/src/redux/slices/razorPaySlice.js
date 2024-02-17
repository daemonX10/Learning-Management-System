import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../config/axiosInstance'

const initailState = {
    key:'',
    subscription_id:'',
    isPaymantSuccess:false,
    allPaymants:{},
    finalMonths:{},
    monthlySalesRecord:[]
}

export const getRazorPayId = createAsyncThunk('/razorpay/getId',async ()=>{
    try {
        const response = await axiosInstance.get('/payment/razorpay-key');
        return  response.data;
    } catch (error) {
        toast.error("failed to load data")
    }
});

export const verifyUserPayment = createAsyncThunk('/payments/verify', async (data) => {
    try {
        const response = await axiosInstance.post('/payments/verify', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature,
        });
        return response.data;
    } catch (error) {
        toast.error("failed to load data")
    }
});

export const purchaseCourseBundle  = createAsyncThunk('/purchaseCourse',async()=>{
    try {
        const response = await axiosInstance.post('/payment/subscribe')
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'payment failed')
    }
});

export const getPaymentRecord = createAsyncThunk('/payment/record', async () => {
    try {
        const response = axiosInstance.post('/payments?count=100');
        toast.promise(response,{
            loading:"loading data",
            success:(res)=>{
                return res.data?.message || "Promise Success , Accout Created";
            },
            error:(err)=>{
                return err?.response?.data?.message || "Promise is rejected , Unable to  Create Account";
            }
        })
        return ( await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'payment failed')
    }
})

export const cancelCoureseBundle = createAsyncThunk('/cancelCourse',async()=>{
    try {
        const response =  axiosInstance.post('/payments/cancel');
        toast.promise(response,{
            loading:"loading data",
            success:(res)=>{
                return res.data?.message || "Promise Success , Accout Created";
            },
            error:(err)=>{
                return err?.response?.data?.message || "Promise is rejected , Unable to  Create Account";
            }
        })
        return ( await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || 'payment failed')
    }
})



const razorPaySlice = createSlice({
    name: 'razorPay',
    initialState: initailState,
    reducer : {},
    extraReducers: (builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message || 'payment success')
            state.isPaymantSuccess = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.error?.message || 'payment failed')
            state.isPaymantSuccess = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPaymants = action?.payload?.allPaymants;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
    }
})

export default razorPaySlice.reducer;