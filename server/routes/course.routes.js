import Router from 'express';
import { getAllCourses } from '../controllers/course.controller';



const router = Router();

router
    .route('/')
    .get(getAllCourses)


export default router;