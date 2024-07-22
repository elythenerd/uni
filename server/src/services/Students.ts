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

export async function deleteStudents(req: Request, res: Response) {
  try {
      // console.log(Subjects)

      const studentId: string = req.params.id
      Students.update({ Id: studentId },
          { Status: false },
          { new: true })
      res.send(studentId).status(200)
  } catch (e) {
      res.send(e).status(400)
  }
}


export async function getCourseStudents(req: Request, res: Response) {
    try {
        console.log(Students)
        const CourseId = req.params.id
        const students:studentInterface[] = await Students.aggregate([
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
    }catch (e){
        res.send(e).status(400)
    }
}



export async function getAvgGrades(req: Request, res: Response) {
  const id = req.params.id
  
  try {
      // console.log(Students)
      // const CourseId = req.params.id
      const avgGrades:studentInterface[] = await Students.aggregate(
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
              'Status':1, 
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
              'Status':1, 
              'Grade': 1
            }
          }
        ]
      )
      res.send(avgGrades).status(200)
  }catch (e){
      res.send(e).status(400)
  }
}




export async function getAddStudentCourseOptions(req: Request, res: Response) {
  const id = req.params.id
  
  try {
      // console.log(Students)
      // const CourseId = req.params.id
      const avgGrades:studentInterface[] = await Students.aggregate(
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
                '$ne': '8a5a8b87-0368-4636-8207-3b7a6aa5d722'
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
          }
        ]
      )
      res.send(avgGrades).status(200)
  }catch (e){
      res.send(e).status(400)
  }
}