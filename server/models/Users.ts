import { Model, PipelineStage, Schema } from "mongoose";
import mongoose from "mongoose";
import { userInterface } from "../types/users";
const UsersSchema = new Schema<userInterface>(
    {
        Id: { type: String, require: true, unique: true },
        Name: { type: String, require: true },
        Password: { type: String, require: true },
        Gender: { type: String, require: true },
        BirthDate: { type: String, require: true },
        Job: { type: String, require: true },
        Active: { type: Boolean, require: true }

    }
)

// const users = 
class Users{
    private users : Model<userInterface>
    constructor(){
        this.users = mongoose.model<userInterface>('Users', UsersSchema)
    }
    async create(body:userInterface): Promise<userInterface>{
        return this.users.create(body)
    }

    async get():Promise<userInterface[]>{
        return this.users.find()
    }
    async update(expression={},apply={},how={}):Promise<userInterface | null>{
        return this.users.findOneAndUpdate(expression,apply,how)
    }
    async aggregation(pipeline:PipelineStage[]): Promise<userInterface[] | null> {
        return this.users.aggregate(
            pipeline
        )
    }
    
    
    
    }
    

export default new Users()