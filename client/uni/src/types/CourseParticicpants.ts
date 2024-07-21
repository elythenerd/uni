export interface cpInterface{
    CourseId: string,
    StudentId: string,
    Grade: string,
    
}
export interface cpState {
    courseParticipants : cpValue
}

export interface cpValue{
    value: {courseParticipants:cpInterface[]}
}