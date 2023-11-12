import Router from 'express';
import { getAllCourses , createCourse } from '../controllers/course.controller';



const router = Router();

router
    .route('/')
    .get(getAllCourses)


export default router;