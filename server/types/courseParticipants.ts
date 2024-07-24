export interface cpInterface{
    CourseId: string,
    StudentId: string,
    Grade: string,
    
}
export interface avgGradesInterface{
    _id: string,
    avgGrade:number
}


export interface PieGradesInterface{
    _id:string,
    count: number,
    color: string
}