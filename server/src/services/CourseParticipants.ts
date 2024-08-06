import { Response, Request } from "express";
import CourseParticipants from "../../models/CourseParticipants";
import { avgGradesInterface, cpInterface, PieGradesInterface } from "../../types/courseParticipants";
import { io } from "..";
import Students from "../../models/Students";
import { studentInterface } from "../../types/student";
import { avgGrdaesMongo, pieGradesMongo, studentsMongo } from "../utils/MongoAggregate";
export async function createCourseParticipant(req: Request, res: Response) {
  try {
    // console.log(CourseParticipants)
    const coursePrticipant: cpInterface = req.body

    const cp = await CourseParticipants.create(coursePrticipant)
    const student = await Students.aggregate([
      {
        '$match': {
          'Id': cp.StudentId
        }
      }
    ])
    res.json().status(200)
    // console.log(student)
    io.addCp(student[0])
    io.removeStudentOption(student[0])
  } catch (e) {
    res.send(e).status(400)
  }
}
export async function deleteCourseParticipant(req: Request, res: Response) {
  try {
    console.log(CourseParticipants)
    const id: string = req.params.id
    const courseId: string = req.params.courseId
    // const courseParticipants  = await CourseParticipants.get()
    const cp = await Students.aggregate([
      {
        '$match': {
          'Id': id
        }
      }
    ])
    await CourseParticipants.delete({ StudentId: id, CourseId: courseId })
    console.log(cp)
    res.json().status(200)
    io.removeCp(cp[0])
    io.addStudentOption(cp[0])
  } catch (e) {
    res.send(e).status(400)
  }
}





export async function getCourseParticipants(req: Request, res: Response) {
  try {
    console.log(CourseParticipants)
    const coursePrticipantsId = req.params.id
    const coursePrticipants: cpInterface[] = await CourseParticipants.get({ CourseId: coursePrticipantsId })
    res.send(coursePrticipants).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}
export async function getAllCourseParticipants(req: Request, res: Response) {
  try {
    console.log(CourseParticipants)
    const coursePrticipants: cpInterface[] = await CourseParticipants.get()
    res.send(coursePrticipants).status(200)
  } catch (e) {
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

export async function createManyCourseParticipants(req: Request, res: Response) {
  try {
    const coursePrticipants: cpInterface[] = req.body
    console.log(coursePrticipants)
    const cp = await CourseParticipants.createMany(coursePrticipants)
    const courseId = cp[0].CourseId
    const studentIds = cp.map((cp) => { return cp.StudentId })
    const pieGrades: PieGradesInterface[] = await CourseParticipants.aggregate(pieGradesMongo(courseId))
    const students = await Students.aggregate(
      studentsMongo(courseId, studentIds)
    )
    const avgGrades = (await CourseParticipants.aggregate(avgGrdaesMongo(courseId))) as avgGradesInterface[]
    res.json().status(200)
    // console.log(avgGrades)
    io.addGrade(students)
    io.pieGrades(pieGrades)
    io.courseAvgGrade(avgGrades)

  } catch (e) {
    res.send(e).status(400)

  }
}


export async function getAvgGrades(req: Request, res: Response) {
  try {
    // console.log(Students)
    // const CourseId = req.params.id
    const avgGrades = (await CourseParticipants.aggregate(
      [
        {
          '$lookup': {
            'from': 'avgGradeView',
            'localField': 'Id',
            'foreignField': '_id',
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
            'BirthYear': 1,
            'Grade': '$result.avgGrade'
          }
        }
      ]
    )) as avgGradesInterface[]
    res.send(avgGrades).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}



export async function getPieGrades(req: Request, res: Response) {
  try {
    // console.log(Students)
    const CourseId = req.params.id
    const pieGrades: PieGradesInterface[] = await CourseParticipants.aggregate(
      pieGradesMongo(CourseId)
    )
    res.send(pieGrades).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}






export async function getAvgGrade(req: Request, res: Response) {
  try {
    // console.log(Students)
    const CourseId = req.params.id
    const avgGrades = (await CourseParticipants.aggregate(
      avgGrdaesMongo(CourseId)
    )) as avgGradesInterface[]
    res.send(avgGrades).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}