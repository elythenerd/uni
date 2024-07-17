import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { cousresInterface } from "../types/courses";
const CoursesSchema = new Schema<cousresInterface>(
    {
        Id: { type: String, require: true, unique: true },
        Name: { type: String, require: true },
        TeacherId: { type: String, require: true },
        Status:  { type: Boolean, require: true }
       
        
        

    }
)

class Courses{
    private courses : Model<cousresInterface>
    constructor(){
        this.courses = mongoose.model<cousresInterface>('Courses', CoursesSchema)
    }
    async create(body:cousresInterface): Promise<cousresInterface>{
        return this.courses.create(body)
    }

    async get():Promise<cousresInterface[]>{
        return this.courses.find()
    }
    
    
    
    }
    

export default new Courses()