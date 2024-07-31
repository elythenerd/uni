import { Response, Request } from "express";
import Students from "../../models/Students";
import { studentInterface } from "../../types/student";
import { io } from "..";
export async function createStudents(req: Request, res: Response) {
  try {
    console.log('Students')
    const students: studentInterface = req.body
    const student = await Students.update({ Id: students.Id },
      {
        $set: { Status: true,Name:students.Name,BirthYear:students.BirthYear },
        $setOnInsert: {  ...students,
          
          Status: undefined,Name:undefined,BirthYear:undefined}
      },
      { new: true, upsert: true })

    res.status(200).json(students)
    // if (students.Id!== student?.Id){
      io.addStudent(student as studentInterface)
    // }
   
  } catch (e) {
    res.status(400).send(e)
  }
}




export async function getStudents(req: Request, res: Response) {
  try {
    // console.log(Students)

    const students: studentInterface[] = await Students.get()
    res.send(students).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}

export async function deleteStudents(req: Request, res: Response) {
  try {
    // console.log(Subjects)

    const studentId: string = req.params.id
    const student  = await  Students.update({ Id: studentId },
      { Status: false },
      { new: true })
    res.send(studentId).status(200)
    io.removeStudent(student as studentInterface)
  } catch (e) {
    res.send(e).status(400)
  }
}


export async function getCourseStudents(req: Request, res: Response) {
  try {
    console.log(Students)
    const CourseId = req.params.id
    const students: studentInterface[] = await Students.aggregate([
      {
        '$lookup': {
          'from': 'courseparticipants',
          'localField': 'Id',
          'foreignField': 'StudentId',
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
          '__v': 1,
          'CourseId': '$result.CourseId'
        }
      }, {
        '$match': {
          'CourseId': CourseId
        }
      }
    ])
    res.send(students).status(200)
    
  } catch (e) {
    res.send(e).status(400)
  }
}



export async function getAvgGrades(req: Request, res: Response) {
  const id = req.params.id

  try {
    // console.log(Students)
    // const CourseId = req.params.id
    const avgGrades: studentInterface[] = await Students.aggregate(
      [
        {
          '$lookup': {
            'from': 'AvgGradeView',
            'localField': 'Id',
            'foreignField': 'StudentId',
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
            'Status': 1,
            'Grade': '$result.avgGrade',
            'CourseId': '$result.CourseId'
          }
        }, {
          '$match': {
            'CourseId': id
          }
        },
        {
          '$project': {
            'Id': 1,
            'Name': 1,
            'BirthYear': 1,
            'Status': 1,
            'Grade': 1
          }
        }
      ]
    )
    res.send(avgGrades).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}




export async function getAddStudentCourseOptions(req: Request, res: Response) {
  // const id = req.params.id

  try {
    // console.log(Students)
    const CourseId = req.params.id
    const year = req.params.year
    const avgGrades: studentInterface[] = await Students.aggregate(
      [
        {
          '$lookup': {
            'from': 'courseparticipants',
            'localField': 'Id',
            'foreignField': 'StudentId',
            'as': 'result'
          }
        }, {
          '$match': {
            'result.CourseId': {
              '$ne':CourseId
            }
          }
        }, {
          '$project': {
            '_id': 1,
            'Id': 1,
            'Name': 1,
            'BirthYear': 1,
            'Status': 1
          }
        },{
          '$match': {
            'BirthYear': year
          }
        }
      ]
    )
    res.send(avgGrades).status(200)
    
  } catch (e) {
    res.send(e).status(400)
  }
}