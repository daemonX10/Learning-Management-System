
const NotFound = () => {

  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white">
        404
      </h1>
      <h2 className=" bg-black font-semibold text-white absolute px-2 text-xl rounded rotate-12">
        Page Not Found
      </h2>
      <button>
        Go Back
      </button>
    </div>
  )
}

export default NotFound