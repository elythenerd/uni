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



}


export default new Subjects()