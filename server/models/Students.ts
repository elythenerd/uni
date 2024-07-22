import { Model, PipelineStage, Schema } from "mongoose";
import mongoose from "mongoose";
import { studentInterface } from "../types/student";
const studentsSchema = new Schema<studentInterface>(
    {
        Id: { type: String, require: true, unique: true },
        Name: { type: String, require: true },
        BirthYear: { type: String, require: true },
        Status: { type: Boolean, require: true }

    }
)


class Students {
    private students: Model<studentInterface>
    constructor() {
        this.students = mongoose.model<studentInterface>('Students', studentsSchema)
    }
    async create(body: studentInterface): Promise<studentInterface> {
        return this.students.create(body)
    }

    async get(): Promise<studentInterface[]> {
        return this.students.find()
    }

    async aggregate(pipeline: PipelineStage[]): Promise<studentInterface[]> {
        return this.students.aggregate(pipeline)
    }

    async update(expression = {}, apply = {}, how = {}): Promise<studentInterface[] | null> {
        return this.students.findOneAndUpdate(expression, apply, how)
    }
    

}


export default new Students()