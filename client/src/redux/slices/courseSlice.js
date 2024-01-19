import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";



const initialState = {
    courseList:[],
}

export const getAllcourses = createAsyncThunk("course/getAllcourses",async(data)=>{
    try {
        const responsePromise = axiosInstance.get('course/getAllcourses', data);
        toast.promise(responsePromise, {
            loading: "Loading...",
            success: (res) => {
                return res.data?.message || "Promise Success , courseList fetched";
            },
            error: (err) => {
                return err.response?.data?.message || "Promise is rejected , Unable to fetch courseList";
            }
        })

        const response = await responsePromise;
        return response.data;
    } catch (err) {
        return console.log(err.response?.data?.message || "Something went wrong while fetching the courses");
    }
})


const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{

    }
})

export default courseSlice.reducer;


/* 
{
    "status": "success",
        "message": "All courses",
            "data": [
                {
                    "_id": "655391a3a223cdfd66f38f27",
                    "title": "full stack",
                    "description": " cost effectivecost effectivecost effectivecost effectivecost effectivecost effective",
                    "category": "web dev",
                    "numberOfLectures": 0,
                    "createdBy": "damodar yadav",
                    "createdAt": "2023-11-14T15:26:27.186Z",
                    "updatedAt": "2023-11-14T15:26:27.294Z",
                    "__v": 0
                },
                {
                    "_id": "655391efa223cdfd66f38f2a",
                    "title": "full stack 2",
                    "description": " cost effectivecost effectivecost effectivecost effectivecost effectivecost effective",
                    "category": "web dev",
                    "numberOfLectures": 0,
                    "createdBy": "damodar yadav",
                    "createdAt": "2023-11-14T15:27:43.346Z",
                    "updatedAt": "2023-11-14T15:27:43.451Z",
                    "__v": 0
                },
            ]
}
*/