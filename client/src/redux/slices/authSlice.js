import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";


const initialState = {
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        data: JSON.parse(localStorage.getItem("data")) || {},
        role: localStorage.getItem("role") || "",
} 


export const createAccount = createAsyncThunk("/auth/signup", async (data)=>{
    try {
        const responsePromise =  axiosInstance.post("user/register",data);
        toast.promise(responsePromise,{
            loading:"Creating account...",
            success:(res)=>{
                return res.data?.message || "Promise Success , Accout Created";
            },
            error:(err)=>{
                return err?.response?.data?.message || "Promise is rejected , Unable to  Create Account";
            }
        })

        const response = await responsePromise;
        
        return  response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        throw error;
    }
})

export const login = createAsyncThunk('auth/login', async(data)=>{
    try {
        const responsePromise = axiosInstance.post("user/login",data);
        toast.promise(responsePromise,{
            loading:"Logging",
            success:(res)=>{
                return res.data?.message || " Promise Success , error in Handling the promise and LoggedIn  "
            },
            error:(err)=>{
                return err.response?.data?.message || "Promise is rejected in Login"
            }
        })

        return ( await responsePromise).data;

    } catch (error) {
        toast.error(error?.response?.data?.message || "unable to login");
        throw error;
    }
})

export const logout= createAsyncThunk('auth/logout', async ()=>{
    try {
        const responsePromise = axiosInstance.get("user/logout");
        toast.promise(responsePromise,{
            loading:"Loading...",
            success:(res)=>{
                return res.data?.message || "Promise success , LogOut"
            },
            error:(err)=>{
                return err.response?.data?.message || 'Promise rejected Error in Logging Out'
            }
        });

        const response = await responsePromise;
        return response.data;

    } catch (error) {
        toast.error(error?.response?.data?.message || " Unable to LogOut")
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // for user login
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.data?.role);
            state.isLoggedIn=true;
            state.data=action?.payload;
            state.role=action?.payload?.data?.role;
        })
        // for Logout
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.data={};
            state.role=''
        })
    }
});

export default authSlice.reducer; 
// {
//     "success": true,
//         "message": "User logged in successfully",
//             "data": {
//         "avatar": {
//             "public_id": "damodarryadav@gmail.com",
//                 "secure_url": "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
//         },
//         "_id": "659b72a5dbf39140f16af552",
//             "fullName": "damodar",
//                 "email": "damodarryadav@gmail.com",
//                     "role": "ADMIN",
//                         "createdAt": "2024-01-08T03:57:25.369Z",
//                             "updatedAt": "2024-01-08T03:57:25.369Z",
//                                 "__v": 0
//     }
// }

