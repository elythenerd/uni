export interface CourseInterface {
    Name: string,
    Id: string,
    SubjectId : string,
    TeacherId: string,
    Status : boolean
}


export interface coursesState {
    courses : coursesValue
}

export interface coursesValue{
    value: {courses:CourseInterface[]}
}