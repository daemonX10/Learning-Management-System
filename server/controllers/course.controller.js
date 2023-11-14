import AppError from "../utils/appError.js";
import Course from "../models/courser.model.js"
import cloudinary from 'cloudinary';
import fs from 'fs/promises'



export const getAllCourses = async (req, res,next) => {
    try {
        const courses = await Course.find({}).select("-lectures");
        res.status(200).json({
            status: "success",
            message: "All courses",
            data: courses
        })
    } catch (error) {
        return next(new AppError(error.message || "unable to fetch the course", 500))
    }
};

export const getLecturesByCourseId = async (req, res,next) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);// populate("lectures");
        /* The `populate("lectures")` method is used to
        populate the `lectures` field of the `Course`
        model. It fetches the lectures associated
        with the course and replaces the lecture IDs
        with the actual lecture objects. This allows
        you to retrieve the lectures along with the
        course information in a single query. */
        

        if(!course) {
            return next(new AppError("No course found with that ID", 404));
        };

        res.status(200).json({
            status: "success",
            message: "All lectures",
            data: course.lectures
        });

    } catch (error) {
        return next (new AppError (error.message || "unable to View the Course ", 500))
    }
}

export const createCourse = async (req, res,next) =>{
    try {
        const {
            title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return next(new AppError(" title, description , category and created by are required to create course", 400));
        }
        // TODO: CREATE COURSE UNIQUE ID FOR SEARCH

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail:{
                public_id : 'dummy',
                secure_url : 'dummy'
            },
        });

        if(req.file){
            const result = cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
                widht: 250,
                height: 250,
                gravity:'center',
                crop: 'fill'
            });

            if(result){
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
                fs.rm('./' + req.file.path);
            }
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: course
        })
    } catch (error) {
        return next (new AppError(error.message || "Unable to create your course", 400));
    }

}

export const updateCourse = async (req, res,next) =>{

}

export const deleteCourse = async (req, res,next) =>{

}