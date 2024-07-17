import react, { useContext } from 'react';
import { BiShow } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useState, ChangeEvent, createContext } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'
import { GenderType, JobType, User, UserContextType, UserLabels } from '../../types/User';
import { JobOption, jobOptions, genderOptions, GenderOption } from './Options';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/usersContext';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../store/Users';
import { UseSelector } from 'react-redux';
import { usersState } from '../../types/User';
import axios from 'axios';
const SignUp = () => {
    const [Id, setID] = useState<string>('')
    const [Name, setName] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [Job, setJob] = useState<JobType>()
    const [Gender, setGender] = useState<GenderType>()
    const [DateOfBirth, setDateOfBirth] = useState<string>('')
    const [ProfilePicture, setProfilePicture] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const Users = useSelector((state: usersState) => state)
    const dispatch = useDispatch()
    const Navigator = useNavigate()
    async function createUser(newUser: User){
        try{
            const res = await axios.post('http://localhost:8000/api/users/create',newUser)
            console.log('post created')
        }catch (e){
            console.log('posting user failed:',e)
        }
        
        
    }
    const checkBirthDate = (e: ChangeEvent<HTMLInputElement>) => {
        if (new Date(e.target.value) < new Date()) {
            setDateOfBirth(e.target.value)
        } else {
            setDateOfBirth('')
        }
    }
    const checkSignUp = () => {
        if (!Job || !Id || !Password || !Name || !DateOfBirth || !Gender) {
            window.alert(`שדות ריקים: \n ${!Id && 'ת.ז\n'} ${!Name && 'שם מלא\n'} ${!Password && 'סיסמה\n'} ${!Job && 'תפקיד\n'} ${!DateOfBirth && 'תאריך לידה\n'} ${!Gender && 'ת.ז\n'}`)
        } else {
            const newUser: User = {
                Id: Id,
                Name: Name,
                Password: Password,
                Job: Job,
                DateOfBirth: DateOfBirth,
                Gender: Gender,
                ProfilePicture: ProfilePicture

            }
            //console.log(newUser)

            // dispatch(setUsers(newUser))
            createUser(newUser)
            // // setUsers([...Users, newUser])
            // setUsers((prev) => {
            //     return [...prev, newUser]
            // })
            //  console.log(Users)
            Navigator('/')
        }
    }
    return (
        <div className='container'>
            <div className='title'>
                <h1>הרשמה</h1>
                <div className='underline'></div>
            </div>
            <div className='body'>
                <div className='signUp-input-container'>

                    <div>
                        <input placeholder='ת.ז' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setID(e.target.value)}></input>


                    </div>
                    <div>
                        <input placeholder='שם מלא' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}></input>
                    </div>

                    <div className='password-container'>
                        <BiShow onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} />
                        <input placeholder='סיסמה' type={showPassword ? 'text' : 'password'} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}></input>
                    </div>

                </div>
                <div className='footer'>
                    <div className='date-file-container'>

                        <input className='file-selector' type='file' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setProfilePicture(URL.createObjectURL(e.target.files[0]));
                                console.log(ProfilePicture)
                            }

                        }}></input>
                        <input type='date' title='תאריך לילה' onChange={(e: ChangeEvent<HTMLInputElement>) => { checkBirthDate(e) }}></input>
                    </div>
                    <div className='dropdown-login-container'>

                        <div className='dropdown'>


                            <Autocomplete
                                sx={{ width: '8rem', height: '6rem' }}
                                renderInput={(params) => <TextField {...params} label="מגדר" />}
                                options={genderOptions}
                                onChange={(e: React.SyntheticEvent, newValue: GenderOption | null) => {
                                    const selectedGenderValue: GenderType | undefined = newValue?.value
                                    setGender(selectedGenderValue)
                                }}
                            />
                            <Autocomplete
                                sx={{ width: '8rem', height: '6rem' }}
                                renderInput={(params) => <TextField {...params} label="תפקיד" />}
                                options={jobOptions}
                                getOptionLabel={(option) => option.label}
                                onChange={(e: React.SyntheticEvent, newValue: JobOption | null) => {
                                    const selectedJobValue: JobType | undefined = newValue?.value
                                    setJob(selectedJobValue)
                                }}
                            />
                        </div>
                        <div className='link-container'>
                            <label>כבר רשומים? </label>
                            <Link className='link' to={'/LogIn'}>כניסה למנויים</Link>

                        </div>

                    </div>
                </div>

                <div className='end'>

                    <button className='signup-button' onClick={() => checkSignUp()}>הרשמה</button>
                </div>
            </div>
        </div>
    )
}
export default SignUp