import Router from 'express';
import { addLectureToCourseById, createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from '../controllers/course.controller.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';



const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(isLoggedIn,upload.single('thumbnail') ,createCourse);

router
    .route("/:courseId")
    .get(isLoggedIn,getLecturesByCourseId)
    .put(isLoggedIn , authorizedRoles('ADMIN'), updateCourse)
    .delete(isLoggedIn, authorizedRoles('ADMIN'), deleteCourse)
    .post(isLoggedIn,upload.single('lecture'), addLectureToCourseById);


export default router;
