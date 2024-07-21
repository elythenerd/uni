import { Response,Request } from "express";
import CourseParticipants from "../../models/CourseParticipants";
import { avgGradesInterface, cpInterface } from "../../types/courseParticipants";
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
        const coursePrticipantsId = req.params.id
        const coursePrticipants:cpInterface[] = await CourseParticipants.get({CourseId:coursePrticipantsId})  
        res.send(coursePrticipants).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}
export async function getAllCourseParticipants(req: Request, res: Response) {
    try {
        console.log(CourseParticipants)
        const coursePrticipants:cpInterface[] = await CourseParticipants.get()  
        res.send(coursePrticipants).status(200)
    }catch (e){
        res.send(e).status(400)
    }
    // export async function getAllCourseParticipants(req: Request, res: Response) {
    //     try {
    //         console.log(CourseParticipants)
    //         const coursePrticipants:cpInterface[] = await CourseParticipants.get()  
    //         res.send(coursePrticipants).status(200)
    //     }catch (e){
    //         res.send(e).status(400)
    //     }
}

export async function createManyCourseParticipants(req:Request,res:Response){
    try{
        const coursePrticipants : cpInterface[] = req.body
        await CourseParticipants.createMany(coursePrticipants)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    
    }
}


export async function getAvgGrades(req: Request, res: Response) {
    try {
        // console.log(Students)
        // const CourseId = req.params.id
        const avgGrades:avgGradesInterface[] = await CourseParticipants.aggregate(
            [
                {
                  '$addFields': {
                    'gradeInt': {
                      '$toInt': '$Grade'
                    }
                  }
                }, {
                  '$group': {
                    '_id': '$StudentId', 
                    'avgGrade': {
                      '$avg': '$gradeInt'
                    }
                  }
                }
              ]
        )
        res.send(avgGrades).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}