export interface TeachersSubjects {
    SubjectId: string,
    TeacherId: string,
    Active : boolean
}

export interface teachersSubjectsState {
    teachersSubjects : teachersSubjectsValue
}

export interface teachersSubjectsValue{
    value: {teachersSubjects:TeachersSubjects[]}
}