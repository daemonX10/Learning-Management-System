import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

import HomeLayout from "../../layouts/Layout";
import { updateCourse } from "../../redux/slices/courseSlice";

const EditCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const courseData = location.state;

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: ""
    });

    useEffect(() => {
        if (courseData) {
            setUserInput({
                title: courseData.title || "",
                description: courseData.description || "",
                category: courseData.category || "",
                createdBy: courseData.createdBy || "",
                thumbnail: null,
                previewImage: courseData.thumbnail?.secure_url || ""
            });
        }
    }, [courseData]);

    const handleImageUpload = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            });
        }
    };

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy) {
            toast.error("All fields are mandatory");
            return;
        }

        const formData = {
            courseId: courseData._id,
            title: userInput.title,
            description: userInput.description,
            category: userInput.category,
            createdBy: userInput.createdBy,
            thumbnail: userInput.thumbnail
        };

        try {
            const response = await dispatch(updateCourse(formData));
            if (response?.payload?.success) {
                navigate("/admin/dashboard");
            }
        } catch (error) {
            toast.error("Failed to update course");
        }
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-16 pb-8 px-4 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={() => navigate("/admin/dashboard")}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        >
                            <AiOutlineArrowLeft className="text-xl" />
                            <span>Back to Dashboard</span>
                        </button>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-xl">
                        <h1 className="text-3xl font-bold text-white mb-8 text-center">Edit Course</h1>
                        
                        <form onSubmit={onFormSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Form Fields */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                            Course Title *
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Enter course title"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            value={userInput.title}
                                            onChange={handleUserInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="createdBy" className="block text-sm font-medium text-gray-300 mb-2">
                                            Instructor Name *
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="createdBy"
                                            id="createdBy"
                                            placeholder="Enter instructor name"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            value={userInput.createdBy}
                                            onChange={handleUserInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                                            Course Category *
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="category"
                                            id="category"
                                            placeholder="Enter course category"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            value={userInput.category}
                                            onChange={handleUserInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                            Course Description *
                                        </label>
                                        <textarea
                                            required
                                            name="description"
                                            id="description"
                                            placeholder="Enter course description"
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                            rows="4"
                                            value={userInput.description}
                                            onChange={handleUserInput}
                                        />
                                    </div>
                                </div>

                                {/* Right Column - Image Upload */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Course Thumbnail
                                        </label>
                                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors duration-300">
                                            {userInput.previewImage ? (
                                                <div className="space-y-4">
                                                    <img
                                                        className="mx-auto h-48 w-full object-cover rounded-lg"
                                                        src={userInput.previewImage}
                                                        alt="Course thumbnail preview"
                                                    />
                                                    <p className="text-sm text-gray-400">
                                                        Click below to change thumbnail
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div>
                                                        <p className="text-gray-300">Upload course thumbnail</p>
                                                        <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                                                    </div>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                id="image_uploads"
                                                accept=".jpg, .jpeg, .png"
                                                name="image_uploads"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                            <label
                                                htmlFor="image_uploads"
                                                className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
                                            >
                                                Choose Image
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    Update Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default EditCourse;