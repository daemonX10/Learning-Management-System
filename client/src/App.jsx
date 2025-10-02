import { Route,Routes } from "react-router-dom"

import RequireAuth from "./components/auth/RequireAuth"
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import CourseDescription from "./pages/Course/CourseDescription"
import CourseList from "./pages/Course/CourseList"
import CreateCourse from "./pages/Course/CreateCourse"
import EditCourse from "./pages/Course/EditCourse"
import DisplayLecture from "./pages/Dashboard/DisplayLecture"
import AdminDashboard from "./pages/Dashboard/AdminDashboard"
import Denied from "./pages/Denied"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import RequestAdmin from "./pages/RequestAdmin"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import SubscribeSuccess from "./pages/Payment/SubscibeSuccess"
import Subscribe from "./pages/Payment/Subscribe"
import SubscribeFail from "./pages/Payment/SubscribeFail"
import SignIn from "./pages/SignIn"
import SignUP from "./pages/SignUP"
import EditProfile from "./pages/user/EditProfile"
import Profile from "./pages/user/Profile"
import AddLecture from "./pages/Dashboard/AddLecture"


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<SignUP/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={< Denied />} />

        {/* User */}
        <Route element={<RequireAuth allowedRoles={['ADMIN','USER']} />} >
          <Route path="/user/profile" element={<Profile/>} />
          <Route path="/user/editProfile" element={<EditProfile/>} />
          <Route path="/request-admin" element={<RequestAdmin/>} />
        </Route>
        
        {/* Courses */}
        <Route path="/course" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/course/displayLecture" element={<DisplayLecture /> } />
        
        <Route element={<RequireAuth allowedRoles ={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse/>} />
          <Route path="/course/edit" element={<EditCourse/>} />
          <Route path="/course/addLecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Payment */}
        <Route element={<RequireAuth allowedRoles ={["ADMIN","USER"]} />}>
          <Route path="/payment/subscribe" element={<Subscribe />} />
          <Route path="/payment/subscribe/success" element={<SubscribeSuccess />} />
          <Route path="/payment/subscribe/fail" element={<SubscribeFail />} />
        </Route>
        
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  ) 
}

export default App