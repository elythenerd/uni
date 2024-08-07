import { Router } from "express";
import { createCourse, deleteCourse, getCourseNames, getCourseNamesByteacherId, getCourses } from "../services/Courses";

const cousreRouter = Router()

cousreRouter.post('/create',createCourse)
cousreRouter.get('/get',getCourses)
cousreRouter.patch('/delete/:id',deleteCourse)
cousreRouter.get('/get/names',getCourseNames)
cousreRouter.get('/get/names/byId/:id',getCourseNamesByteacherId)



export default cousreRouter