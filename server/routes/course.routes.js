import Router from 'express';



const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(createCourse);


export default router;