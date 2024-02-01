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
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms',
                widht: 
                500,
                height: 500,
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
    try {
        const { courseId } = req.params;

        const course = await Course.findByIdAndUpdate(
            courseId,
            req.body,
            { runValidators: true }
        );

        if (!course) {
            return next(new AppError("Unable to update the course", 400))
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully"
        });
    } catch (error) {
        return next(new AppError(error.message,500));
    }
}

export const deleteCourse = async (req, res,next) =>{
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new AppError("No course exist with this id ", 400));
        }

        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
            success: true,
            message: "Course Deleted successfully"
        });
    } catch (error) {
        return next (new AppError(error.message,500));
    }
}

export const addLectureToCourseById = async (req, res, next) => {
    try {
        const { title , description } = req.body;
        const { courseId } = req.params;

        let lectureData = {};

        if (!title || !description ) {
            return next(new AppError("title, description are required to create lecture", 400));
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new AppError("No course exist with this id ", 400));
        }

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    resource_type: 'video',
                    folder: 'lms', // Save files in a folder named lms
                    chunk_size: 5000000 // 50 mb
                });

                if (result) {
                    lectureData.public_id = result.public_id;
                    lectureData.secure_url = result.secure_url;
                }
                fs.rm(`uploads/${req.file.filename}`); // remove file from local storage
            } catch (error) {
                return next(
                    new AppError(
                        JSON.stringify(error) || "File not uploaded, please try again", 400
                    )
                );
            }
        }

        course.lectures.push({
            title,
            description,
            lecture: lectureData
        });

        course.numberOfLectures = course.lectures.length;
        await course.save();
        
        res.status(200).json({
            success: true,
            message: "Lecture added successfully",
            data: course.lectures
        });
    } catch (error) {
        return next (new AppError(error.message,500));
    }
}

export const deleteLectureById = async (req, res,next) =>{
    const { courseId, lectureId } = req.params;
    const course = await Course.findById(courseId);

    if(!course){
        return next(new AppError("No course exist with this id",404));
    }

    try {
        // it give us the lecture object
        const lecture = course.lectures.find(lecture => lecture._id.toString() === lectureId);

        if (!lecture) {
            return next(new AppError("No lecture exist with this id", 404));
        }

        await cloudinary.v2.uploader.destroy(lecture.lecture.public_id);

        course.lectures.pull({ _id: lectureId });
        // alternative way to delete lecture
        // course.lectures = course.lectures.filter(lecture => lecture._id.toString() !== lectureId);

        course.numberOfLectures = course.lectures.length;
        await course.save();
        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            data: course.lectures
        });

    } catch (error) {
        return next (new AppError(error.message,500));
    }
    /*
    Alternative way to delete lecture
        try {
        const { courseId, lectureId } = req.params;

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new AppError("No course exist with this id ", 400));
        }

        const lecture = course.lectures.find(
            (lecture) => lecture._id.toString() === lectureId
        );

        if (!lecture) {
            return next(new AppError("No lecture exist with this id ", 400));
        }

        await cloudinary.v2.uploader.destroy(lecture.lecture.public_id);

        course.lectures = course.lectures.filter(
            (lecture) => lecture._id.toString() !== lectureId
        );

        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
            data: course.lectures
        });
    } catch (error) {
        return next (new AppError(error.message,500));
    }

    */
}