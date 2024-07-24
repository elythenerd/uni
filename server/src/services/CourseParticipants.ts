import { Response,Request } from "express";
import CourseParticipants from "../../models/CourseParticipants";
import { avgGradesInterface, cpInterface, PieGradesInterface } from "../../types/courseParticipants";
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
export async function deleteCourseParticipant(req: Request, res: Response) {
    try {
        console.log(CourseParticipants)
        const id:string = req.params.id
        const courseId:string = req.params.courseId
        await CourseParticipants.delete({StudentId:id,CourseId:courseId})
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
        ) ) as avgGradesInterface[]
        res.send(avgGrades).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}



export async function getPieGrades(req: Request, res: Response) {
    try {
        // console.log(Students)
        const CourseId = req.params.id
        const pieGrades:PieGradesInterface[] = await CourseParticipants.aggregate(
            [ {
                '$addFields': {
                  'gradeInt': {
                    '$toInt': '$Grade'
                  }
                }
              }, {
                '$group': {
                  '_id': {
                    'StudentId': '$StudentId', 
                    'CourseId': '$CourseId'
                  }, 
                  'avgGrade': {
                    '$avg': '$gradeInt'
                  }
                }
              }, {
                '$project': {
                  'StudentId': '$_id.StudentId', 
                  'CourseId': '$_id.CourseId', 
                  'avgGrade': 1, 
                  '_id': 0
                }
              }
                , {
                  '$match': {
                    'CourseId': CourseId
                  }
                }, {
                  '$group': {
                    '_id': {
                      '$switch': {
                        'branches': [
                          {
                            'case': {
                              '$eq': [
                                '$avgGrade', null
                              ]
                            }, 
                            'then': 'null'
                          }, {
                            'case': {
                              '$lte': [
                                '$avgGrade', 55
                              ]
                            }, 
                            'then': '<55'
                          }, {
                            'case': {
                              '$lte': [
                                '$avgGrade', 70
                              ]
                            }, 
                            'then': '55-70'
                          }, {
                            'case': {
                              '$lte': [
                                '$avgGrade', 84
                              ]
                            }, 
                            'then': '70-84'
                          }, {
                            'case': {
                              '$lte': [
                                '$avgGrade', 100
                              ]
                            }, 
                            'then': '85-100'
                          }
                        ], 
                        'default': 'other'
                      }
                    }, 
                    'count': {
                      '$sum': 1
                    }
                  }
                }, {
                  '$addFields': {
                    'color': {
                      '$switch': {
                        'branches': [
                          {
                            'case': {
                              '$eq': [
                                '$_id', '<55'
                              ]
                            }, 
                            'then': 'red'
                          }, {
                            'case': {
                              '$eq': [
                                '$_id', '55-70'
                              ]
                            }, 
                            'then': 'yellow'
                          }, {
                            'case': {
                              '$eq': [
                                '$_id', '70-84'
                              ]
                            }, 
                            'then': 'orange'
                          }, {
                            'case': {
                              '$eq': [
                                '$_id', '85-100'
                              ]
                            }, 
                            'then': 'green'
                          }
                        ], 
                        'default': 'other'
                      }
                    }
                  }
                }
              ]
        )
        res.send(pieGrades).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}






export async function getAvgGrade(req: Request, res: Response) {
  try {
      // console.log(Students)
      const CourseId = req.params.id
      const avgGrades = (await CourseParticipants.aggregate(
        [
          {
            '$addFields': {
              'gradeInt': {
                '$toInt': '$Grade'
              }
            }
          }, {
            '$group': {
              '_id': {
                'CourseId': '$CourseId'
              }, 
              'avgGrade': {
                '$avg': '$gradeInt'
              }
            }
          }, {
            '$project': {
              '_id': '$_id.CourseId', 
              'avgGrade': 1
            }
          }, {
            '$match': {
              '_id': CourseId
            }
          }
        ]
      ) ) as avgGradesInterface[]
      res.send(avgGrades).status(200)
  }catch (e){
      res.send(e).status(400)
  }
}