import { Response,Request } from "express";
import TeachersSubjects from "../../models/TeachersSubjects";
import { TsInterface } from "../../types/teachersSubjects";
export async function createTeachersSubject(req: Request, res: Response) {
    try {
        const teachersSubjects : TsInterface = req.body
        // console.log(Object.keys().)
        await TeachersSubjects.create(teachersSubjects)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    }
}




export async function getTeachersSubject(req: Request, res: Response) {
    try {
        console.log(TeachersSubjects)
       
        const teachersSubjects:TsInterface[] = await TeachersSubjects.get()
        res.send(teachersSubjects).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}