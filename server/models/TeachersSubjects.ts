import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { cousresInterface } from "../types/courses";
import { TsInterface } from "../types/teachersSubjects";
import { subjectInterface } from "../types/subject";
const TeachersSubjectsSchema = new Schema<TsInterface>(
    {
        Id: { type: String, require: true, unique: true },
        TeacherId: { type: String, require: true },
        SubjectId: { type: String, require: true },
        Active: { type: Boolean, required: true }




    }
)

class TeachersSubjects {
    private teachersSubjects: Model<TsInterface>
    constructor() {
        this.teachersSubjects = mongoose.model<TsInterface>('TeachersSubjects', TeachersSubjectsSchema)
    }
    async create(body: TsInterface): Promise<TsInterface> {
        const TeacherId = body.TeacherId
        const subjectId = body.SubjectId
        // console.log(body,'1234567890')
        return this.teachersSubjects.findOneAndUpdate(
            { TeacherId:TeacherId, SubjectId:subjectId },
            { $set: body },
            { new: true, upsert: true }
        )
        // return this.teachersSubjects.create(body)
    }

    async get(): Promise<TsInterface[]> {
        return this.teachersSubjects.find()
    }

    async delete(id: string): Promise<TsInterface[] | null> {
        return this.teachersSubjects.findOneAndUpdate(
            { Id: id },
            { Active: false },
            { new: true }
        )
    }
    async aggregation(id: string): Promise<subjectInterface[] | null> {
        return this.teachersSubjects.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'subjects',
                        'localField': 'SubjectId',
                        'foreignField': 'Id',
                        'as': 'result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$match': {
                        'TeacherId': id
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'Id': '$SubjectId',
                        'Name': '$result.Name'
                    }
                }
            ]
        )
    }

}


export default new TeachersSubjects()