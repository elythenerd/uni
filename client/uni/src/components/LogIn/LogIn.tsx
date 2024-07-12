import react from 'react';
import { useState, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from "react-icons/bi";

import './Login.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/usersContext';

const LogIn = () => {
    const [Id, setID] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const Navigator = useNavigate()

    const { Users } = useContext(UserContext) || { Users: [] }
    const checkLogIn = () => {
        console.log(Users)
    }

    return (
        <div className='logIn-container'>
            <div className='title'>
                <h1>כניסה</h1>
                <div className='underline'></div>
            </div>
            <div className='body'>
                <div className='signUp-input-container'>
                    <div>
                        <input placeholder='ת.ז' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setID(e.target.value)}></input>
                    </div>
                    <div>
                    <BiShow  onMouseDown={()=>setShowPassword(true)} onMouseUp={()=>setShowPassword(false)}/>
                        <input placeholder='סיסמה' type={showPassword?'text':'password'} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}></input>

                    </div>
                </div>



                <button className='signup-button' onClick={() => checkLogIn()}>כניסה</button>

            </div>
        </div>
    )
}
export default LogIn