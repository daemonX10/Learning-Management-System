import { Link } from "react-router-dom";

import homePageMainImage from "../assets/Images/MainImage/homePageMainImage.png";
import HomeLayout from "../layouts/Layout";


function Home(){

    return (
        <HomeLayout>
            <div className="pt-16 pb-8 text-white flex flex-col lg:flex-row items-center justify-center gap-12 mx-4 lg:mx-16 min-h-[90vh]">
                <div className="w-full lg:w-1/2 space-y-8 px-4 lg:pl-8">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight"> 
                        Find out best <span className="text-blue-500 font-extrabold">online courses</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg">
                        We provide the best online courses for you. Learn from anywhere, anytime with our comprehensive educational platform.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to='/course' className="inline-block">
                            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
                                Explore Courses
                            </button>
                        </Link>
                        <Link to='/contact' className="inline-block">
                            <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
                    <img className="w-full max-w-md lg:max-w-lg xl:max-w-xl object-contain" src={homePageMainImage} alt="Learning Management System" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Home;