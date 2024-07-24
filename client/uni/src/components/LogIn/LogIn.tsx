import react from 'react';
import { useState, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from "react-icons/bi";

import './Login.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/usersContext';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { User, userCredentials } from '../../types/User';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { setUser } from '../../store/LoggedUser';

const LogIn = () => {
    const [Id, setID] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>('')

    const [user, SetUser] = useState<User>()
    const Navigator = useNavigate()

    const { Users } = useContext(UserContext) || { Users: [] }
    const checkUserAuth = async (body: userCredentials) => {
        try {
            const res = await axios.post('http://localhost:8000/api/users/auth/login', body, {withCredentials: true})
            const userFetched: User | string = res.data
            // console.log(userFetched)
            if (res.status == 401) {


                setUser(undefined)
                setPasswordError(true)
                return userFetched
            } else {
                setPasswordError(false)
                
                SetUser(userFetched as User)
                return userFetched
            }

        }

        catch (e: any) {
            if (e.response.status == 401) {


                SetUser(undefined)
                setPasswordError(true)
            }
        }
    }
    const checkLogIn = async  () => {
        const userCredentials: userCredentials = {
            Id,
            Password
        }
        checkUserAuth(userCredentials)
        if (user) {
            console.log(user)
            // dispatch(setUser(user))
            Navigator('/')
        }


    }
    const checkID = (id: string) => {
        setID(id)
        // console.log(id)
        // console.log(Id.length)
        if (parseInt(id) && id.length === 9) {
            setError(false)
        } else {
            setError(true)
            if (!id.length) {
                setError(false)
            } else if (parseInt(id)) {
                setErrorMessage('ת.ז מכיל תשע ספרות')
            }
            else if (Id.length) {
                setErrorMessage('ת.ז מכיל רק ספרות')
            }


        }
    }

    return (

        <Stack sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', height: '35%', width: '25%', padding: '3%', alignItems: 'center', borderRadius: '5px', boxShadow: '1px 1px 1px 1px  rgb(239, 239, 239)' }}>
            <Typography variant='h1'>כניסה</Typography>
            <div className='underline'></div>
            <TextField error={error} sx={{ width: '90%' }} label={error ? errorMessage : 'ת.ז'} onChange={(e: ChangeEvent<HTMLInputElement>) => checkID(e.target.value)}></TextField>
            <TextField error={passwordError} type={showPassword ? 'text' : 'password'} label='סיסמה' onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                sx={{ width: '90%' }}
                helperText={passwordError&&'סיסמה שגויה'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ padding: '5px' }}>
                            <IconButton onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>
                                <BiShow />

                            </IconButton>

                        </InputAdornment>
                    )
                }} />
            <Button variant='contained' onClick={() => checkLogIn()} sx={{ width: '90%', borderRadius: '5px', backgroundColor: ' rgb(80, 139, 241)', color: 'white', }}>כניסה</Button>
        </Stack>

        // <div className='logIn-container'>
        //     <div className='title'>
        //         <h1>כניסה</h1>
        //         <div className='underline'></div>
        //     </div>
        //     <div className='body'>
        //         <div className='signUp-input-container'>
        //             <div>
        //                 <input placeholder='ת.ז' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setID(e.target.value)}></input>
        //             </div>
        //             <div>
        //             <BiShow  onMouseDown={()=>setShowPassword(true)} onMouseUp={()=>setShowPassword(false)}/>
        //                 <input placeholder='סיסמה' type={showPassword?'text':'password'} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}></input>

        //             </div>
        //         </div>



        //         <button className='signup-button' onClick={() => checkLogIn()}>כניסה</button>

        //     </div>
        // </div>
    )
}
export default LogIn

function dispatch(arg0: void) {
    throw new Error('Function not implemented.');
}
