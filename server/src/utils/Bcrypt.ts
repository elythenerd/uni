import bcrypt from 'bcrypt'



export const hashPassword = (password:string)=>{
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}
export const comparePassword = (plain:string,hashed:string)=>{
    return bcrypt.compareSync(plain,hashed)
}