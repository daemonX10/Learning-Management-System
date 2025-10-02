import Router from 'express';
import { addLectureToCourseById, createCourse, deleteCourse, deleteLectureById, getAllCourses, getLecturesByCourseId, updateCourse, updateLecture } from '../controllers/course.controller.js';
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';



const router = Router();

router
    .route('/')
    .get(
        getAllCourses
        )
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
        );

router
    .route("/:courseId")
    .get(
        isLoggedIn,
        authorizedSubscriber,
        getLecturesByCourseId
        )
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'), 
        updateCourse
        )
    .delete(
        isLoggedIn, 
        authorizedRoles('ADMIN'), 
        deleteCourse
        )
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN') ,
        upload.single('lecture'), 
        addLectureToCourseById
        )
    

router
    .route("/:courseId/lectures/:lectureId")
    .delete(
        isLoggedIn, 
        authorizedRoles('ADMIN'),
        deleteLectureById
        )
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        updateLecture
        );

export default router;
