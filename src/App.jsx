import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import Appbar from './AppBar.jsx';
import AddCourse from './AddCourse.jsx';
import Courses from './Courses.jsx';
import Course from './Course.jsx';
import { RecoilRoot } from 'recoil';

function App() {
    return (
        <RecoilRoot>
            <Router>
                <div style={{
                    height: "100vh",
                    width: '100vw',
                    backgroundColor: "#90ecfd"
                }}>
                    <Appbar />
                    <Routes>
                        <Route path='/courses' element={<Courses />} />
                        <Route path='/course/:courseId' element={<Course />} />
                        <Route path='/addcourse' element={<AddCourse />} />
                        <Route path="/login" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </Router>
        </RecoilRoot>
    );
}

export default App;
