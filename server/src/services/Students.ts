import { Response,Request } from "express";
import Students from "../../models/Students";
import { studentInterface } from "../../types/student";
export async function createStudents(req: Request, res: Response) {
    try {
        console.log(Students)
        const students : studentInterface = req.body
        await Students.create(students)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    }
}




export async function getStudents(req: Request, res: Response) {
    try {
        console.log(Students)
       
        const students:studentInterface[] = await Students.get()
        res.send(students).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}