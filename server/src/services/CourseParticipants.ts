import { Response, Request } from "express";
import CourseParticipants from "../../models/CourseParticipants";
import { avgGradesInterface, cpInterface, PieGradesInterface } from "../../types/courseParticipants";
import { io } from "..";
import Students from "../../models/Students";
import { studentInterface } from "../../types/student";
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
    const cp = await CourseParticipants.createMany(coursePrticipants)
    const courseId = cp[0].CourseId
    const studentIds = cp.map((cp)=>{return cp.StudentId})
    const pieGrades: PieGradesInterface[] = await CourseParticipants.aggregate(
      [{
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
          'CourseId': courseId
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
    const students = await Students.aggregate(
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
            'CourseId': courseId
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
        },{
          '$match': {
            'Id': {
              '$in': studentIds
            }
          }
        }
      ]
    )
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
    res.json().status(200)
    console.log(students,studentIds)
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
      [{
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
  } catch (e) {
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
    )) as avgGradesInterface[]
    res.send(avgGrades).status(200)
  } catch (e) {
    res.send(e).status(400)
  }
}