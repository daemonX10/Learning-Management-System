import { Link } from "react-router-dom";

import homePageMainImage from "../assets/Images/MainImage/homePageMainImage.png";
import HomeLayout from "../layouts/Layout";


function Home(){

    return (
        <HomeLayout>
            <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 mx-4 md:mx-16 min-h-[90vh]">
                <div className="w-full md:w-1/2 space-y-6 pl-4 md:pl-20">
                    <h1 className="text-4xl font-semibold align-middle"> Find out best <span className="text-blue-500 font-bold">online courses</span></h1>
                    <p className="text-xl text-gray-200">
                        We provide best online courses for you. You can learn from anywhere and anytime.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link to='/course'>
                            <button className="bg-blue-500 px-5 py-2 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto">
                                Explore Courses
                            </button>
                        </Link>
                        <Link to='/contact'>
                            <button className="border border-blue-500 px-5 py-2 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img className="w-full md:w-auto" src={homePageMainImage} alt="home page" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Home;