import react from 'react';
import { useState, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from "react-icons/bi";
import './Login.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/usersContext';
import { Box, Button, FormHelperText, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { GenderType, JobType, User, userCredentials } from '../../types/User';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { setLoggedUser } from '../../store/LoggedUser';
import { useDispatch } from 'react-redux';
import { checkID } from '../../utils/checkId';
// import { setUser } from '../../store/LoggedUser';
// import { setUsers } from '../../store/Users';

const LogIn = () => {
    const [Id, setID] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)

    const [errorMessage, setErrorMessage] = useState<string>('')

    const [user, setUser] = useState<User>()
    const Navigator = useNavigate()
    const dispatch = useDispatch()
    // const { Users } = useContext(UserContext) || { Users: [] }
    const checkUserAuth = async (body: userCredentials) => {
        try {
            const res = await axios.post('http://localhost:8000/api/users/auth/login', body, { withCredentials: true })
            const userFetched: User = await res.data
            // console.log(userFetched)
            if (res.status == 401) {

                setUser(userFetched)
                setPasswordError(true)
                return userFetched
            } else {
                setPasswordError(false)
                setUser(userFetched)
                return userFetched
            }

        }

        catch (e: any) {
            if (e.response.status == 401) {


                setPasswordError(true)
            }
        }
    }
    const checkLogIn = async () => {
        const userCredentials: userCredentials = {
            Id,
            Password
        }
        const userFetched = await checkUserAuth(userCredentials)
        if (userFetched && userFetched.Id) {
            // console.log(userFetched)
            dispatch(setLoggedUser(userFetched))
            Navigator('/')
        }


    }
   
    return (

        <Stack sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', height: '35%', width: '25%', padding: '3%', alignItems: 'center', borderRadius: '5px', boxShadow: '1px 1px 1px 1px  rgb(239, 239, 239)' }}>
            <Typography variant='h1'>כניסה</Typography>
            <div className='underline'></div>
            <TextField error={error} sx={{ width: '90%' }} label={error ? errorMessage : 'ת.ז'} onChange={(e: ChangeEvent<HTMLInputElement>) => checkID(e.target.value,setID,setError,setErrorMessage)}></TextField>
            <TextField error={passwordError} type={showPassword ? 'text' : 'password'} label='סיסמה' onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                sx={{ width: '90%' }}
                helperText={passwordError && 'סיסמה שגויה'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ padding: '5px' }}>
                            <IconButton onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>
                                <BiShow />

                            </IconButton>

                        </InputAdornment>
                    )
                }} />
            <Box sx={{display: 'flex',justifyContent:'flex-start',width:'100%',marginLeft:'3rem'}}>
                <Typography>לא רשומים?</Typography>
                <Link to={'/SignUp'}> הרשמו כאן</Link>
            </Box>

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

