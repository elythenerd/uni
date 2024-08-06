import { PipelineStage } from "mongoose"

export const avgGrdaesMongo = (courseId: string): PipelineStage[] => {
    return ([
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
                '_id': courseId
            }
        }
    ])
}


export const pieGradesMongo = (courseId: string): PipelineStage[] => {
    return (

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
}


export const studentsMongo = (courseId:string,studentIds:string[]): PipelineStage[] => {
    return (
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
            }, {
              '$match': {
                'Id': {
                  '$in': studentIds
                }
              }
            }
          ]
    )
}