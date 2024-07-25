import { Dispatch,SetStateAction } from "react";
export interface User {
    Id : string,
    Name:  string,
    Password:string,
    Job : JobType,
    Gender : GenderType ,
    DateOfBirth: string,
    ProfilePicture?: string
}


export enum JobType{
    Boss = 'boss',
    Teacher = 'teacher',
    BossLabel = 'מנהל',
    TeacherLabel = 'מורה'

}

export enum GenderType{
    Male = 'male',
    Female = 'female',
    Other = 'other',
    MaleLabel = 'זכר',
    FemaleLabel = 'נקבה',
    OtherLabel = 'אחר',
    
}

export enum UserLabels{
    Id = 'ת.ז',
    Name = 'שם מלא',
    Password = 'סיסמה',
    Job = 'תפקיד',
    Gender = 'מגדר',
    DareOfBirth = 'תאריך לידה'
    
}

export type UserContextType  = {
    Users: User[] ;
    setUsers: Dispatch<SetStateAction<User[]>>;
};



export interface usersState {
    users : usersValue
}

export interface usersValue{
    value: {users:User[]}
}
export interface userCredentials{
    Id:string,
    Password:string
}


export interface userState {
    user : userValue
}

export interface userValue{
    value: {user:User | undefined}
}