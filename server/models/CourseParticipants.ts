import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { cpInterface } from "../types/courseParticipants";
const cpSchema = new Schema<cpInterface>(
    {
        CourseId: { type: String, require: true, unique: true },
        StudentId: { type: String, require: true },
        Grade: { type: String, require: true },
       
        
        

    }
)

class CourseParticipants{
    private courseParticipants : Model<cpInterface>
    constructor(){
        this.courseParticipants = mongoose.model<cpInterface>('CourseParticipants', cpSchema)
    }
    async create(body:cpInterface): Promise<cpInterface>{
        return this.courseParticipants.create(body)
    }

    async get():Promise<cpInterface[]>{
        return this.courseParticipants.find()
    }
    
    
    
    }
    

export default new CourseParticipants()