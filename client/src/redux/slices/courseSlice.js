import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";



const initialState = {
    courseList:[],
}

export const getAllcourses = createAsyncThunk("course/getAllcourses",async()=>{
    try {
        const responsePromise = axiosInstance.get("/course/getAllCourses");
        toast.promise(responsePromise,{
            loading:"Loading...",
            success:(res)=>{
                return res.data?.message || "Promise Success , Course fetched"
            },
            error:(err)=>{
                return err.response?.data?.message || "Promise is rejected in fetching the course"
            }
        })
        const response = await responsePromise;
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to fetch the course");
        throw error;
    }
})


const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase()
    }
})

export default courseSlice.reducer;