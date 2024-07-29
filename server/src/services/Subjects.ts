import { Response, Request } from "express";
import { cousresInterface } from "../../types/courses";
import { subjectInterface } from "../../types/subject";
import Subjects from "../../models/Subjects";
export async function createSubject(req: Request, res: Response) {
    try {
        console.log(Subjects)
        const subject: subjectInterface = req.body
        await Subjects.update({
            Name: subject.Name
        },
            {$set: {Active: true},
            $setOnInsert:{  ...subject,
            Active: undefined } },
            { new: true, upsert: true }
            
        )
    res.json().status(200)
} catch (e) {
    res.send(e).status(400)
}
}




export async function getSubjects(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const subjects: subjectInterface[] = await Subjects.get()
        res.send(subjects).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}

export async function deleteSubject(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const subjectsId: string = req.params.id
        await Subjects.update({ Id: subjectsId },
            { Active: false },
            { new: true })
        res.send(subjectsId).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}


export async function getSubjectOptions(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const teacherId: string = req.params.id
        const subjects = await Subjects.aggregate([
            {
                '$lookup': {
                    'from': 'teacherssubjects',
                    'localField': 'Id',
                    'foreignField': 'SubjectId',
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
                    'teacherId': '$result.TeacherId',
                    'Active': 1
                }
            }, {
                '$match': {
                    'teacherId': {
                        '$ne': teacherId
                    }
                }
            }, {
                '$project': {
                    '_id': 1,
                    'Id': 1,
                    'Name': 1,
                    'Active': 1
                }
            }
        ])
        console.log(subjects, 1)
        res.send(subjects).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}