import react from 'react';
import { useState, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiShow } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/usersContext';
import { Box, Button, FormHelperText, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { GenderType, JobType, User, userCredentials } from '../../types/User';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { setLoggedUser } from '../../store/LoggedUser';
import { useDispatch } from 'react-redux';
import { checkID } from '../../utils/checkId';
import { GenderOption, genderOptions, jobOptions } from './Options';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import methods from '../../utils/methods';
const SignUp = () => {
    const [Id, setID] = useState<string>('')
    const [Name, setName] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [Job, setJob] = useState<JobType>()
    const [Gender, setGender] = useState<GenderType>()
    const [DateOfBirth, setDateOfBirth] = useState<string>('')
    const [ProfilePicture, setProfilePicture] = useState<Blob|string>('')
    const [ProfilePictureMulter, setProfilePictureMulter] = useState<File>()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [auth, setAuth] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [idErrorMessage, setIdErrorMessage] = useState<string>()
    // const Users = useSelector((state: usersState) => state)
    const dispatch = useDispatch()
    const Navigator = useNavigate()
    const postMulter = async () => {
        const formData = new FormData()
        formData.append('file', ProfilePicture);
        console.log(ProfilePicture)
        try {
            const response = await axios.post(`http://localhost:8000/api/users/upload/${Id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('File uploaded successfully', response.data);
        } catch (error) {

            console.error('Error uploading file', error);
        }
    }
    const createUser = async (newUser: User) => {
        try {
            const res = await methods.post('http://localhost:8000/api/users/create', newUser)
            if (res.status === 200) {
                console.log('status 200')
                Navigator('/')
                dispatch(setLoggedUser(newUser))
            } else {
                console.log('status err')
                setIdErrorMessage('ת.ז זה כבר קיים במערכת')
            }
        } catch (error) {
            console.log(error)
            setIdErrorMessage('ת.ז זה כבר קיים במערכת')
        }
        // console.log('post created',res.data,11111)
        // setAuth(true)
        // } catch (e) {
        // setAuth(false)
        // console.log('posting user failed:', e)
        // }


    }
    const checkBirthDate = (e: ChangeEvent<HTMLInputElement>) => {
        if (new Date(e.target.value) < new Date()) {
            setDateOfBirth(e.target.value)
        } else {
            setDateOfBirth('')
        }
    }
    const checkSignUp = async () => {
        if (!Job || !Id || !Password || !Name || !DateOfBirth || !Gender) {
            // window.alert(`שדות ריקים: \n ${!Id && 'ת.ז\n'} ${!Name && 'שם מלא\n'} ${!Password && 'סיסמה\n'} ${!Job && 'תפקיד\n'} ${!DateOfBirth && 'תאריך לידה\n'} ${!Gender && 'ת.ז\n'}`)
        } else {
            const newUser: User = {
                Id: Id,
                Name: Name,
                Password: Password,
                Job: Job,
                BirthDate: DateOfBirth,
                Gender: Gender,
                // ProfilePicture: ProfilePicture,
                Active: true

            }
            createUser(newUser)
            postMulter()
            console.log(newUser)

            // dispatch(setUsers(newUser))

            // const userCheck = await createUser(newUser)
            // if (auth){
            //     Navigator('/')
            //     dispatch(setLoggedUser(newUser))

            // }else{
            //     setIdErrorMessage('ת.ז זה כבר קיים במערכת')
            // }
            // console.log('in')
            // Navigator('/')

            // console.log('failed')
            // setAuth(false)


            // // setUsers([...Users, newUser])
            // setUsers((prev) => {
            //     return [...prev, newUser]
            // })
            // console.log(auth)
            // Navigator('/')
        }
    }
    // const handlePictureUpload = async () => {
    //     const formData = new FormData();
    //     formData.append('file', ProfilePicture);

    //     try {
    //         const response = await axios.post('http://localhost:8000/api/users/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log(response)
    //     } catch (error) {

    //         console.error(error);
    //     }
    // };


    return (

        <Stack sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', height: '50%', width: '25%', padding: '3%', alignItems: 'center', borderRadius: '5px', boxShadow: '1px 1px 1px 1px  rgb(239, 239, 239)' }}>
            <Typography variant='h1'>הרשמה</Typography>
            <div className='underline'></div>
            <TextField error={idErrorMessage ? true : false} sx={{ width: '90%' }} helperText={idErrorMessage && idErrorMessage} label={error ? errorMessage : 'ת.ז'} onChange={(e: ChangeEvent<HTMLInputElement>) => checkID(e.target.value, setID, setError, setErrorMessage)}></TextField>
            <TextField sx={{ width: '90%' }} label={'שם'} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}></TextField>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '55%' }}>


                    < TextField sx={{ width: '45%' }} select label="מגדר">
                        {
                            genderOptions.map((option) => {
                                return <MenuItem key={option.value} value={option.value} onClick={() => setGender(option.value)}  >{option.label}</MenuItem>
                            })
                        }
                    </TextField>
                    < TextField sx={{ width: '45%' }} select label="תפקיד">
                        {
                            jobOptions.map((option) => {
                                return <MenuItem key={option.value} value={option.value} onClick={() => setJob(option.value)}>{option.label}</MenuItem>
                            })
                        }
                    </TextField>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', justifyContent: 'space-between', padding: '5px' }}>
                    <input type='date' title='תאריך לילה' onChange={(e: ChangeEvent<HTMLInputElement>) => { checkBirthDate(e) }}></input>
                    <input className='file-selector' name='file' type='file' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setProfilePicture(e.target.files[0]);

                        }

                    }}>

                    </input>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginLeft: '3rem' }}>
                <Typography>לא רשומים?</Typography>
                <Link to={'/LogIn'}> הרשמו כאן</Link>
            </Box>

            <Button variant='contained' onClick={() => checkSignUp()} sx={{ width: '90%', borderRadius: '5px', backgroundColor: ' rgb(80, 139, 241)', color: 'white', }}>כניסה</Button>
        </Stack>
        //         <div className='container'>
        //             <div className='title'>
        //                 <h1>הרשמה</h1>
        //                 <div className='underline'></div>
        //             </div>
        //             <div className='body'>
        //                 <div className='signUp-input-container'>

        //                     <div>
        //                         <input placeholder='ת.ז' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setID(e.target.value)}></input>


        //                     </div>
        //                     <div>
        //                         <input placeholder='שם מלא' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}></input>
        //                     </div>

        //                     <div className='password-container'>
        //                         <BiShow onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} />
        //                         <input placeholder='סיסמה' type={showPassword ? 'text' : 'password'} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}></input>
        //                     </div>

        //                 </div>
        //                 <div className='footer'>
        //                     <div className='date-file-container'>

        //                         <input className='file-selector' type='file' onChange={(e: ChangeEvent<HTMLInputElement>) => {
        //                             if (e.target.files && e.target.files.length > 0) {
        //                                 setProfilePicture(URL.createObjectURL(e.target.files[0]));
        //                                 console.log(ProfilePicture)
        //                             }

        //                         }}></input>
        //                         <input type='date' title='תאריך לילה' onChange={(e: ChangeEvent<HTMLInputElement>) => { checkBirthDate(e) }}></input>
        //                     </div>
        //                     <div className='dropdown-login-container'>

        //                         <div className='dropdown'>


        //                             <Autocomplete
        //                                 sx={{ width: '8rem', height: '6rem' }}
        //                                 renderInput={(params) => <TextField {...params} label="מגדר" />}
        //                                 options={genderOptions}
        //                                 onChange={(e: React.SyntheticEvent, newValue: GenderOption | null) => {
        //                                     const selectedGenderValue: GenderType | undefined = newValue?.value
        //                                     setGender(selectedGenderValue)
        //                                 }}
        //                             />
        //                             <Autocomplete
        //                                 sx={{ width: '8rem', height: '6rem' }}
        //                                 renderInput={(params) => <TextField {...params} label="תפקיד" />}
        //                                 options={jobOptions}
        //                                 getOptionLabel={(option) => option.label}
        //                                 onChange={(e: React.SyntheticEvent, newValue: JobOption | null) => {
        //                                     const selectedJobValue: JobType | undefined = newValue?.value
        //                                     setJob(selectedJobValue)
        //                                 }}
        //                             />
        //                         </div>
        //                         <div className='link-container'>
        //                             <label>כבר רשומים? </label>
        //                             <Link className='link' to={'/LogIn'}>כניסה למנויים</Link>

        //                         </div>

        //                     </div>
        //                 </div>

        //                 <div className='end'>

        //                     <button className='signup-button' onClick={() => checkSignUp()}>הרשמה</button>
        //                 </div>
        //             </div>
        //         </div>
    )
}
export default SignUp





