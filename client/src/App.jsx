import { useEffect } from "react"
import toast from "react-hot-toast"

const App = () => {
  useEffect(()=>{
    toast.success('Hello World')
})


  return (
    <>
    <h1 className=" 
    text-4xl
    text-center
    text-blue-500
    font-bold
    ">
      Hello World
    </h1>
    </>
  )
}

export default App