import { Link } from "react-router-dom";

import homePageMainImage from "../assets/Images/homePageMainImage.png";
import HomeLayout from "../layouts/HomeLayout";


function Home(){

    return (
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center  gap-10 mx-16 h-[90vh] ">
                <div className="w-1/2 space-y-6 pl-20 ">
                    <h1 className="text-4xl
                     font-semibold align-middle"> Find out best <span className="text-blue-500 font-bold">online courses</span></h1>
                     <p className="text-xl text-gray-200">
                        We provide best online courses for you. You can learn from anywhere and anytime.
                     </p>
                    
                    <div className="space-x-6">
                        <Link to='/courses'>
                            <button className="bg-blue-500 px-5 py-2 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-600 transition-all duration-300">
                                Explore Courses
                            </button>
                        </Link>
                        <Link to='/contact'>
                            <button className="border border-blue-500 px-5 py-2 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-600 transition-all duration-300">
                                Contact Us
                            </button>
                        </Link>
                    </div>


                </div>

                <div className="w-1/2 flex items-center justify-center ">
                    <img src={homePageMainImage} alt="home page" />

                </div>

            </div>
        </HomeLayout>
    )
}

export default Home;