import AppError from "../utils/appError.js";
import Course from "../models/courser.model.js"



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

