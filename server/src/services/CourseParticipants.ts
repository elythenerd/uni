import { Response,Request } from "express";
import CourseParticipants from "../../models/CourseParticipants";
import { cpInterface } from "../../types/courseParticipants";
export async function createCourseParticipant(req: Request, res: Response) {
    try {
        console.log(CourseParticipants)
        const coursePrticipant : cpInterface = req.body
        await CourseParticipants.create(coursePrticipant)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    }
}




export async function getCourseParticipants(req: Request, res: Response) {
    try {
        console.log(CourseParticipants)
       
        const coursePrticipant:cpInterface[] = await CourseParticipants.get()
        res.send(coursePrticipant).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}