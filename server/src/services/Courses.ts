import Courses from "../../models/Courses";
import { Response, Request } from "express";
import { cousresInterface } from "../../types/courses";
import { io } from "..";
export async function createCourse(req: Request, res: Response) {
  try {
    console.log(Courses)
    const courses: cousresInterface = req.body
    const course = await Courses.create(courses)
    res.json().status(200)
    io.addCourse(course)
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
    const course = await Courses.delete(courseId)
    io.removeCourse(course as cousresInterface)
    res.send(courseId).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}


export async function getCourseNames(req: Request, res: Response) {
  try {
    console.log(Courses)
    // const teacherId = req.params.id
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
          'enrollementYear': 1,
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



export async function getCourseNamesByteacherId(req: Request, res: Response) {
  try {
    console.log(Courses)
    const teacherId = req.params.id
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
      },
      {
        '$match': {
          'TeacherId': teacherId
        }
      }
    ])
    res.send(courses).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}