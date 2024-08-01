import Users from "../../models/Users";
import { Response,Request } from "express";
import { userCredentials, userInterface } from "../../types/users";
import { Password } from "@mui/icons-material";
import { io } from "../index";
import { comparePassword, hashPassword } from "../utils/Bcrypt";
export async function createUsers(req: Request, res: Response) {
    try {
        const user : userInterface = req.body
        const users:userInterface[] = await Users.get()
        user.Password = hashPassword(user.Password)
        const findUser = users.find((userDB)=>userDB.Id === user.Id )
        console.log(user)
        if (findUser){
            return res.status(401).send('user already signed')
        }else{
            await Users.create(user)
            io.addUser(user)
            console.log('----------------------servr')
            req.session.user = user
            return res.status(200).json(user)
        }
       
    }catch (e){
        res.send(e).status(400)
    }
}

export async function deleteUser(req: Request, res: Response){
    const id = req.params.id
    try{
        const user = await Users.update({ Id: id },
            { Active: false },
            { new: true })
        res.send(id).status(200)
        
        io.deleteUser(user as userInterface)
    }catch(e){
        res.status(400).send(e)
        // console.log('not updated',e)
    }
}


export async function getUsers(req: Request, res: Response) {
    try {
        console.log(Users)
       
        const users:userInterface[] = await Users.get()
        res.send(users).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}



export async function checkUserAuth(req: Request, res: Response) {

    try {
        const User :userCredentials = req.body
        // console.log(Users)
       
        const users:userInterface[] = await Users.get()
        // const Password = users.find((user)=> user.Password === User.Password)
        const selectedUser = users.find((user)=> user.Id === User.Id)
        console.log(selectedUser?.Password)
        if (!selectedUser || !comparePassword(User.Password,selectedUser.Password)){
            return res.status(401).send('bad credentials')
        }
        else {
            // console.log(selectedUser)
            req.session.user = selectedUser
            console.log(req.session)
            return res.status(200).send(selectedUser)
        }
        
    }catch (e){
        res.send(e).status(400)
    }
}
export async function logOut(req: Request, res: Response) {
    console.log('in')
    try {
        
        req.session.destroy((err)=>{
            console.log(err)
           
        })
        res.send('logged out').status(200)
        }
        
    catch (e){
        res.send(e).status(400)
    }
}



export async function checkAuth(req: Request, res: Response) {

    try {
        if (!req.session.user){
            return res.status(401).send({Id:undefined,Password:undefined})
        }else{
            res.status(200).send(req.session.user)
        }
        // const User :userCredentials = req.body
        // console.log(Users)
       
        // const users:userInterface[] = await Users.get()
        // // const Password = users.find((user)=> user.Password === User.Password)
        // const selectedUser = users.find((user)=> user.Id === User.Id)
        
        // if (!selectedUser || selectedUser.Password !==User.Password){
        //     return res.status(401).send('bad credentials')
        // }
        
        
    }catch (e){
        res.send(e).status(400)
    }
}


export async function getTeacherOptions(req: Request, res: Response) {
    try {
        // console.log(Subjects)

        const year: string = req.params.year
        const subjects = await Users.aggregation([
            {
              '$lookup': {
                'from': 'courses', 
                'localField': 'Id', 
                'foreignField': 'TeacherId', 
                'as': 'result'
              }
            }, {
              '$unwind': {
                'path': '$result', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$project': {
                '_id': 1, 
                'Id': 1, 
                'Name': 1, 
                'BirthYear': 1, 
                'Password': 1, 
                'Gender': 1, 
                'Job': 1, 
                '__v': 1, 
                'year': '$result.enrollementYear'
              }
            }, {
              '$match': {
                'year': {'$ne':year}
              }
            }
          ])
        console.log(subjects, 1)
        res.send(subjects).status(200)
    } catch (e) {
        res.send(e).status(400)
    }
}

export const postMulter = async (req: Request, res: Response)=>{
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
    
}