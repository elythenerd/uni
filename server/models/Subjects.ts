import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { cousresInterface } from "../types/courses";
import { subjectInterface } from "../types/subject";
const SubjectsSchema = new Schema<subjectInterface>(
    {
        Id: { type: String, require: true, unique: true },
        Name: { type: String, require: true },
        Active: { type: Boolean, require: true }




    }
)

class Subjects {
    private subjects: Model<subjectInterface>
    constructor() {
        this.subjects = mongoose.model<subjectInterface>('Subjects', SubjectsSchema)
    }
    async create(body: subjectInterface): Promise<subjectInterface> {
        return this.subjects.create(body)
    }

    async get(): Promise<subjectInterface[]> {
        return this.subjects.find()
    }
    async delete(id:string): Promise<subjectInterface[] |null>{
        return this.subjects.findOneAndUpdate(
            {Id:id},
            {Active:false},
            {new:true}
        )
    }
    async aggregate(id: string):Promise<subjectInterface[]>{
        return this.subjects.aggregate(
            [
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
                      '$ne': '329877922'
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
              ]
        )
    }
    


}


export default new Subjects()