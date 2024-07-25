import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import BossPage from "../../pages/boss/Boss";
import Course from "../../pages/course/Course";
import LogInPage from "../../pages/LogIn/LogIn";
import SignUpPage from "../../pages/SignUp/SignUp";
import Teacher from "../../pages/teacher/Teacher";
import { useSelector } from "react-redux";
import { userState } from "../../types/User";
import Auth from "../Auth/Auth";
import { Home } from "../../pages/Home/Home";

const AllRoutes = () => {
  const loggedUser = useSelector((state: userState) => state.user.value.user)
  // console.log('logged user:', loggedUser)
  return (
    <>
      
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/SignUp' element={<SignUpPage></SignUpPage>}></Route>
            <Route path='/LogIn' element={<LogInPage></LogInPage>}></Route>
            <Route path='/Teacher' element={<Teacher></Teacher>}></Route>
            {loggedUser?.Job=='boss'&&<Route path='/Boss' element={<BossPage></BossPage>}></Route>}
            <Route path='/Course' element={<Course></Course>}></Route>

        
      </Routes>
    </>
  )
}

export default AllRoutes