import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    isLogged:  localStorage.getItem("isLoggedin") || false ,
    role: localStorage.getItem("role") || "",
    data:localStorage.getItem("data") || {}
} 

export const createAccount = createAsyncThunk("/auth/signup", async (data)=>{
    try {
        const response = await axiosInstance.post("user/register",data);
        toast.promise(response,{
            loading:"Creating account...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:(err)=>{
                return err?.response?.data?.message || "Something went wrong";
            }
        })
        console.log(response);
        
        return  response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{}
});

export default authSlice.reducer; 