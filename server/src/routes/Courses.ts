import { Router } from "express";
import { createCourse, deleteCourse, getCourses } from "../services/Courses";

const cousreRouter = Router()

cousreRouter.post('/create',createCourse)
cousreRouter.get('/get',getCourses)
cousreRouter.patch('/delete/:id',deleteCourse)



export default cousreRouter