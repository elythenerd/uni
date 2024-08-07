export interface TeachersSubjects {
    Id :string,
    SubjectId: string,
    TeacherId: string,
    Active : boolean,
    Name?:string
}

export interface teachersSubjectsState {
    teachersSubjects : teachersSubjectsValue
}

export interface teachersSubjectsValue{
    value: {teachersSubjects:TeachersSubjects[]}
}