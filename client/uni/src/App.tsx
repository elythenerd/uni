import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './pages/SignUp/SignUp';
import LogInPage from './pages/LogIn/LogIn';
import { Home } from './pages/Home/Home';
import UserContextProvider from './context/UsersContextProvider';
import Teacher from './pages/teacher/Teacher';
import BossPage from './pages/boss/Boss';
import { Provider } from 'react-redux';
import OpenContextProvider from './context/SubjectContext/openContext/openContextProvider';
import { store } from './store/Store';
import Course from './pages/course/Course';
function App() {


  return (
    <>
      <Provider store={store} stabilityCheck="never">
        <UserContextProvider>
          <OpenContextProvider>

            <Router>

              <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/SignUp' element={<SignUpPage></SignUpPage>}></Route>
                <Route path='/LogIn' element={<LogInPage></LogInPage>}></Route>
                <Route path='/Teacher' element={<Teacher></Teacher>}></Route>
                <Route path='/Boss' element={<BossPage></BossPage>}></Route>
                <Route path='/Course' element={<Course></Course>}></Route>

              </Routes>
            </Router>
          </OpenContextProvider>

        </UserContextProvider>
      </Provider>
    </>
  )
}

export default App
