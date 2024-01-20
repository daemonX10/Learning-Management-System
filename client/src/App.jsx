import { Route,Routes } from "react-router-dom"

import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import Denied from "./pages/Denied"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"
import SignUP from "./pages/SignUP"


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUP/>} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/denied" element={< Denied />} />
      
      {/* <Route path="/courses" element={<AllCourses/>} />
       */}
      

      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App