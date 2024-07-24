import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        user: userInterface; // Adjust the type as needed
    }
}



export interface userInterface{
    Id: string,
    Name: string,
    Password : string,
    Gender : String,
    BirthDate: string,
    Job: string,
    Active : boolean
    
}
export interface userCredentials{
    Id:string,
    Password:string
}