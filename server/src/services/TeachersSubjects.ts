import { Response, Request } from "express";
import TeachersSubjects from "../../models/TeachersSubjects";
import { TsInterface } from "../../types/teachersSubjects";
export async function createTeachersSubject(req: Request, res: Response) {
    try {
        const teachersSubjects: TsInterface = req.body
        // console.log(Object.keys().)
        // await TeachersSubjects.create(teachersSubjects)
        await TeachersSubjects.update({
            TeacherId: teachersSubjects.TeacherId,
            SubjectId: teachersSubjects.Id
        },
            { $set: teachersSubjects },
            { new: true, upsert: true })
        console.log('this is')
        res.json().status(200)
    } catch (e) {
        console.log(e)
        res.send(e).status(400)
    }
}




export async function getTeachersSubject(req: Request, res: Response) {
    try {
        console.log(TeachersSubjects)

        const teachersSubjects: TsInterface[] = await TeachersSubjects.get()
        res.send(teachersSubjects).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}



export async function deleteTeachersSubject(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const teacherSubjectId: string = req.params.id
        TeachersSubjects.update({ Id: teacherSubjectId },
            { Active: false },
            { new: true })
        res.send(teacherSubjectId).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}



export async function getTeachersSubjectOptions(req: Request, res: Response) {
    try {
        // console.log(Subjects)
        const year: string = req.params.year
        const teacherId: string = req.params.id
        const teacherSubjects = await TeachersSubjects.aggregation( [
            {
                '$lookup': {
                    'from': 'subjects',
                    'localField': 'SubjectId',
                    'foreignField': 'Id',
                    'as': 'result'
                }
            }, {
                '$unwind': {
                    'path': '$result',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$match': {
                    'TeacherId': teacherId
                }
            }, {
                '$project': {
                    '_id': 1,
                    'Id': '$SubjectId',
                    'TeacherId':1,
                    'Name': '$result.Name'
                }
            }, {
                '$lookup': {
                    'from': 'courses', 
                    'localField': 'TeacherId', 
                    'foreignField': 'TeacherId', 
                    'as': 'result'
                }
            }, {
                '$unwind': {
                    'path': '$result', 
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    '_id': 1, 
                    'Id': 1, 
                    'Name': 1, 
                    'teacherId': 1, 
                    'Active': 1, 
                    'year': '$result.enrollementYear'
                }
            }, {
                '$match': {
                    'year': {
                        '$ne': year
                    }
                }
            }
        ])
        res.send(teacherSubjects).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}