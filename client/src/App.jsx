import { Route,Routes } from "react-router-dom"

import AboutUs from "./pages/AboutUs"
import Home from "./pages/Home"
import SignUP from "./pages/SignUP"


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signup" element={<SignUP/>} />
      
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default App