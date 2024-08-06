import { Model, PipelineStage, Schema } from "mongoose";
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

    async get(body={}): Promise<TsInterface[]> {
        return this.teachersSubjects.find(body)
    }

    async delete(id: string): Promise<TsInterface[] | null> {
        return this.teachersSubjects.findOneAndUpdate(
            { Id: id },
            { Active: false },
            { new: true }
        )
    }
    async update(expression={},apply={},how={}):Promise<TsInterface | null>{
        return this.teachersSubjects.findOneAndUpdate(expression,apply,how)
    }
    async aggregation(pipeline:PipelineStage[]): Promise<subjectInterface[] | null> {
        return this.teachersSubjects.aggregate(
            pipeline
        )
    }

}


export default new TeachersSubjects()