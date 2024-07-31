import { Model, PipelineStage, Schema } from "mongoose";
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

    async get(body={}): Promise<subjectInterface[]> {
        return this.subjects.find(body)
    }
    async delete(id:string): Promise<subjectInterface[] |null>{
        return this.subjects.findOneAndUpdate(
            {Id:id},
            {Active:false},
            {new:true}
        )
    }
    async update(expression={},apply={},how={}):Promise<subjectInterface | null>{
      return this.subjects.findOneAndUpdate(expression,apply,how)
  }
    async aggregate(pipeline: PipelineStage[]):Promise<subjectInterface[]>{
        return this.subjects.aggregate(
           pipeline
        )
    }
    


}


export default new Subjects()