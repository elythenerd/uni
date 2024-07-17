import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { cousresInterface } from "../types/courses";
import { TsInterface } from "../types/teachersSubjects";
const TeachersSubjectsSchema = new Schema<TsInterface>(
    {
        Id: { type: String, require: true, unique: true },
        TeacherId: { type: String, require: true },
        subjectId: { type: String, require: true }




    }
)

class TeachersSubjects {
    private teachersSubjects: Model<TsInterface>
    constructor() {
        this.teachersSubjects = mongoose.model<TsInterface>('TeachersSubjects', TeachersSubjectsSchema)
    }
    async create(body: TsInterface): Promise<TsInterface> {
        return this.teachersSubjects.create(body)
    }

    async get(): Promise<TsInterface[]> {
        return this.teachersSubjects.find()
    }



}


export default new TeachersSubjects()