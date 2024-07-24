import Courses from "../../models/Courses";
import { Response, Request } from "express";
import { cousresInterface } from "../../types/courses";
export async function createCourse(req: Request, res: Response) {
    try {
        console.log(Courses)
        const courses: cousresInterface = req.body
        await Courses.create(courses)
        res.json().status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}




export async function getCourses(req: Request, res: Response) {
    try {
        console.log(Courses)

        const courses: cousresInterface[] = await Courses.get()
        res.send(courses).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}

export async function deleteCourse(req: Request, res: Response) {
    try {
        console.log(Courses)

        const courseId: string = req.params.id
        Courses.delete(courseId)
        res.send(courseId).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}


export async function getCourseNames(req: Request, res: Response) {
    try {
        console.log(Courses)

        const courses: cousresInterface[] = await Courses.aggregate([
            {
              '$lookup': {
                'from': 'subjects', 
                'localField': 'SubjectId', 
                'foreignField': 'Id', 
                'as': 'result'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'TeacherId', 
                'foreignField': 'Id', 
                'as': 'result2'
              }
            }, {
              '$project': {
                'Id': 1, 
                'Name': 1, 
                'Status': 1, 
                'TeacherId': 1, 
                'SubjectId': 1, 
                'SubjectName': {
                  '$arrayElemAt': [
                    '$result.Name', 0
                  ]
                }, 
                'TeacherName': {
                  '$arrayElemAt': [
                    '$result2.Name', 0
                  ]
                }
              }
            }
          ])
        res.send(courses).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}