import Courses from "../../models/Courses";
import { Response,Request } from "express";
import { cousresInterface } from "../../types/courses"; 
export async function createCourse(req: Request, res: Response) {
    try {
        console.log(Courses)
        const courses : cousresInterface = req.body
        await Courses.create(courses)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    }
}




export async function getCourses(req: Request, res: Response) {
    try {
        console.log(Courses)
       
        const courses:cousresInterface[] = await Courses.get()
        res.send(courses).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}