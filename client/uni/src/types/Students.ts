export interface StudentsInterface{
    Id : string,
    Name : string,
    BirthYear :string,
    Grade?:string,
    Status : boolean
}

export interface studentsState {
    students : studentsValue
}

export interface studentsValue{
    value: {students:StudentsInterface[]}
}