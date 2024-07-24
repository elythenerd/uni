export interface cpInterface{
    CourseId: string,
    StudentId: string,
    Grade?: string,
    
    
}
export interface cpState {
    courseParticipants : cpValue
}

export interface cpValue{
    value: {courseParticipants:cpInterface[]}
}


export interface PieGradesInterface{
    _id:string,
    count: number,
    color: string
}

export interface avgGradesInterface{
    _id: string,
    avgGrade:number
}