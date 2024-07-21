import { Model, PipelineStage, Schema } from "mongoose";
import mongoose from "mongoose";
import { avgGradesInterface, cpInterface } from "../types/courseParticipants";
const cpSchema = new Schema<cpInterface>(
    {
        CourseId: { type: String, require: true},
        StudentId: { type: String, require: true },
        Grade: { type: String, require: true },
       
        
        

    }
)

class CourseParticipants{
    private courseParticipants : Model<cpInterface>
    constructor(){
        this.courseParticipants = mongoose.model<cpInterface>('courseParticipants', cpSchema)
    }
    async create(body:cpInterface): Promise<cpInterface>{
        return this.courseParticipants.create(body)
    }

    async get(body={}): Promise<cpInterface[]> {
        return this.courseParticipants.find(body);
    }
    async createMany(body:cpInterface[]):Promise<cpInterface[]>{
        return this.courseParticipants.insertMany(body)
    }
    async aggregate(pipeline:PipelineStage[]): Promise<avgGradesInterface[]> {
        
        return this.courseParticipants.aggregate(pipeline)
    }
    
}
    

export default new CourseParticipants()