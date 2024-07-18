import { Response,Request } from "express";
import { cousresInterface } from "../../types/courses"; 
import { subjectInterface } from "../../types/subject";
import Subjects from "../../models/Subjects";
export async function createSubject(req: Request, res: Response) {
    try {
        console.log(Subjects)
        const subject : subjectInterface = req.body
        await Subjects.create(subject)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    }
}




export async function getSubjects(req: Request, res: Response) {
    try {
        // console.log(Subjects)
       
        const subjects:subjectInterface[] = await Subjects.get()
        res.send(subjects).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}

export async function deleteSubject(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const subjectsId: string = req.params.id
        Subjects.delete(subjectsId)
        res.send(subjectsId).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}


export async function getSubjectOptions(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const teacherId: string = req.params.id
        const subjects = await Subjects.aggregate(teacherId)
        console.log(subjects,1)
        res.send(subjects).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}