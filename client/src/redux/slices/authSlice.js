import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";


const initialState = {
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        user: JSON.parse(localStorage.getItem("data"))?.data || {},
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

        console.log("login",(await responsePromise).data);

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
        throw error;
    }
})

export const updateProfile = createAsyncThunk('auth/updateProfile' , async(data)=>{
    try {
        const responsePromise = axiosInstance.put(`user/update`,data);
        toast.promise(responsePromise,{
            loading:"Loading...",
            success:(res)=>{
                return res.data?.message || "Promise Success , Profile Updated"
            },
            error:(err)=>{
                return err.response?.data?.message || "Promise rejected , Error in Updating Profile"
            }
        });
        
        return (await responsePromise).data;
    }
        catch (error) {
            toast.error(error?.response?.data?.message || "Unable to Update Profile");
            throw error; // this is important to throw error to handle it in the component where we are using this thunk or use return 
        }
})

export const getUserData = createAsyncThunk('auth/getUserData', async()=>{
    try {
        const responsePromise = axiosInstance.get(`user/profile`);
        toast.promise(responsePromise,{
            loading:"Loading...",
            success:(res)=>{
                return res.data?.message || "Promise Success , User Data"
            },
            error:(err)=>{
                return err.response?.data?.message || "Promise rejected , Error in Getting User Data"
            }
        });
        console.log("getProfile",(await responsePromise));
        return (await responsePromise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to get User Data");
        throw error;
    }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
    try {
        const responsePromise = axiosInstance.post('user/reset', { email });
        toast.promise(responsePromise, {
            loading: "Sending reset email...",
            success: (res) => {
                return res.data?.message || "Password reset email sent successfully";
            },
            error: (err) => {
                return err.response?.data?.message || "Failed to send reset email";
            }
        });
        return (await responsePromise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to send password reset email");
        throw error;
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data) => {
    try {
        const responsePromise = axiosInstance.post(`user/reset/${data.resetToken}`, {
            password: data.password
        });
        toast.promise(responsePromise, {
            loading: "Resetting password...",
            success: (res) => {
                return res.data?.message || "Password reset successfully";
            },
            error: (err) => {
                return err.response?.data?.message || "Failed to reset password";
            }
        });
        return (await responsePromise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to reset password");
        throw error;
    }
});

export const requestAdminAccess = createAsyncThunk('auth/requestAdminAccess', async (data) => {
    try {
        const responsePromise = axiosInstance.post('user/request-admin', data);
        toast.promise(responsePromise, {
            loading: "Submitting admin request...",
            success: (res) => {
                return res.data?.message || "Admin request submitted successfully";
            },
            error: (err) => {
                return err.response?.data?.message || "Failed to submit admin request";
            }
        });
        return (await responsePromise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to submit admin request");
        throw error;
    }
});

export const getAdminRequests = createAsyncThunk('auth/getAdminRequests', async (status) => {
    try {
        const url = status ? `user/admin-requests?status=${status}` : 'user/admin-requests';
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to get admin requests");
        throw error;
    }
});

export const reviewAdminRequest = createAsyncThunk('auth/reviewAdminRequest', async (data) => {
    try {
        const responsePromise = axiosInstance.put(`user/admin-requests/${data.requestId}/review`, {
            status: data.status,
            reviewNotes: data.reviewNotes
        });
        toast.promise(responsePromise, {
            loading: "Reviewing admin request...",
            success: (res) => {
                return res.data?.message || "Admin request reviewed successfully";
            },
            error: (err) => {
                return err.response?.data?.message || "Failed to review admin request";
            }
        });
        return (await responsePromise).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to review admin request");
        throw error;
    }
});

export const getUserAdminRequest = createAsyncThunk('auth/getUserAdminRequest', async () => {
    try {
        const response = await axiosInstance.get('user/my-admin-request');
        return response.data;
    } catch (error) {
        // Don't show toast for this as it's expected to fail if no request exists
        throw error;
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        clearAuth: (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.user = {};
            state.role = '';
        }
    },
    extraReducers:(builder)=>{
        builder
        // for user login
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.data?.role);
            state.isLoggedIn=true;
            state.user=action?.payload?.data;
            state.role=action?.payload?.data?.role;
        })
        .addCase(login.rejected,(state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.user={};
            state.role='';
        })
        // for Logout
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.user={};
            state.role=''
        })
        // for update Profile
        .addCase(updateProfile.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload));
            localStorage.setItem("role",action?.payload?.data?.role);
            localStorage.setItem("isLoggedIn",true);
            state.isLoggedIn=true;
            state.user=action?.payload?.data;
            state.role=action?.payload?.data?.role;
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload));
            localStorage.setItem("role",action?.payload?.data?.role);
            localStorage.setItem("isLoggedIn",true);
            state.isLoggedIn=true;
            state.user=action?.payload?.data;
            state.role=action?.payload?.data?.role;
        })
        .addCase(getUserData.rejected,(state)=>{
            // Clear auth state if getUserData fails (token expired, etc.)
            localStorage.clear();
            state.isLoggedIn=false;
            state.user={};
            state.role='';
        })
    }
});

export const { clearAuth } = authSlice.actions;

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

