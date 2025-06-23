import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home'
import CourseList from './Pages/Student/CourseList'
import CourseDetail from './Pages/Student/CourseDetail'
import MyEnrollment from './Pages/Student/MyEnrollment'
import Player from './Pages/Student/Player'
import Educator from './Pages/Educator/Educator'
import Dashboard from './Pages/Educator/Dashboard'
import AddCourse from './Pages/Educator/AddCourse'
import MyCourse from './Pages/Educator/MyCourse'
import StudentEnroll from './Pages/Educator/StudentEnroll'
import Navbar from './Components/Student/Navbar'
import "quill/dist/quill.snow.css";

const App = () => {

  const isEducatorRoute =useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white' >
      {!isEducatorRoute &&  <Navbar />}
     
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Course-list' element={<CourseList />}/>
        <Route path='/Course-list/:input' element={<CourseList />}/>
        <Route path='/course/:id' element={<CourseDetail />}/>
        <Route path='/my-enrollments' element={<MyEnrollment />} />
        <Route path='/player/:courseId' element={<Player />}/>
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element ={<Dashboard />}/>
          <Route path='add-course' element ={<AddCourse/>}/>
          <Route path='my-course' element ={<MyCourse />}/>
          <Route path='student-enroll' element ={<StudentEnroll />}/>

        </Route>

      </Routes>
    </div>
  )
}

export default App