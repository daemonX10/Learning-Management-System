import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";



const initialState = {
    courseList:[],
}

export const getAllCourses = createAsyncThunk("/course/getAllCourses",async(data)=>{
    try {
        const responsePromise = axiosInstance.get('course', data);
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
        return response.data.data;
    } catch (err) {
        return console.log(err.response?.data?.message || "Something went wrong while fetching the courses");
    }
})

export const createNewCourse = createAsyncThunk("/course/create",async(data)=>{
    try {
        let formData = new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("category",data?.category);
        formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);

        const response = axiosInstance.post('course', formData);
        toast.promise(response,{
            loading:"Loading...",
            success:(res)=>{
                return res.data?.message || "Promise Success , course created"
            },
            error:(err)=>{
                return err.response?.data?.message || "Promise is rejected , Unable to create course"
            }
        })
        return (await response).data;
        
    } catch (err) {
        return console.log(err.response?.data?.message || "Something went wrong while creating the course")
    }
})

export const deleteCourse = createAsyncThunk("/course/delete", async (courseId) => {
    try {
        const responsePromise = axiosInstance.delete(`course/${courseId}`);
        toast.promise(responsePromise, {
            loading: "Deleting course...",
            success: (res) => {
                return res.data?.message || "Course deleted successfully";
            },
            error: (err) => {
                return err.response?.data?.message || "Failed to delete course";
            }
        });

        const response = await responsePromise;
        return response.data;
    } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong while deleting the course");
        throw error;
    }
});

export const updateCourse = createAsyncThunk("/course/update", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        if (data?.thumbnail) {
            formData.append("thumbnail", data?.thumbnail);
        }

        const responsePromise = axiosInstance.put(`course/${data.courseId}`, formData);
        toast.promise(responsePromise, {
            loading: "Updating course...",
            success: (res) => {
                return res.data?.message || "Course updated successfully";
            },
            error: (err) => {
                return err.response?.data?.message || "Failed to update course";
            }
        });

        const response = await responsePromise;
        return response.data;
    } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong while updating the course");
        throw error;
    }
});


const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers: {} ,
    extraReducers: (builder)=>{
        builder
        .addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action?.payload) {
                state.courseList = [...action.payload]
            }
        })
        .addCase(deleteCourse.fulfilled, (state, action) => {
            // Remove the deleted course from the courseList
            state.courseList = state.courseList.filter(course => course._id !== action.meta.arg);
        })
        .addCase(updateCourse.fulfilled, (state, action) => {
            // Update the course in the courseList
            const updatedCourse = action.payload.data;
            const courseIndex = state.courseList.findIndex(course => course._id === updatedCourse._id);
            if (courseIndex !== -1) {
                state.courseList[courseIndex] = updatedCourse;
            }
        })
        .addCase(createNewCourse.fulfilled, (state, action) => {
            // Add the new course to the courseList
            if (action.payload?.data) {
                state.courseList.push(action.payload.data);
            }
        })
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