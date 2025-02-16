import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Screens/Dashboard'
import StudentsList from './Screens/Student/StudentsList'
import StudentAdd from './Screens/Student/StudentAdd'
import StudentUpdate from './Screens/Student/StudentUpdate'
import TeacherUpdate from './Screens/Teacher/TeacherUpdate'
import TeachersList from './Screens/Teacher/TeachersList'
import TeacherAdd from './Screens/Teacher/TeacherAdd'
import SignUp from './Screens/AuthenticateUser/SignUp'
import SignIn from './Screens/AuthenticateUser/SignIn'
import AuthenticUser from './Screens/AuthenticateUser/ProtectedRoutes/AuthenticUser'
import UnauthenticUser from './Screens/AuthenticateUser/ProtectedRoutes/UnauthenticUser'
import ExamSchedule from './Screens/Examination/ExamSchedule'
import ExamResults from './Screens/Examination/ExamResults'
import ClassForm from './Screens/Class/ClassForm'
import ClassList from './Screens/Class/ClassList'
import SubjectAdd from './Screens/Subject/SubjectAdd'
import SubjectList from './Screens/Subject/SubjectList'
import FeeStructure from './Screens/Fee/FeeStructure'
import FeeVoucher from './Screens/Fee/FeeVoucher'
import FeePayment from './Screens/Fee/FeePayment'
import SyllabusForm from './Screens/Syllabus/SyllabusForm'
import SyllabusList from './Screens/Syllabus/SyllabusList'
// import SignUp from './Components/Form/Form'

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/"  element={<Dashboard />}/> */}
        <Route element={<AuthenticUser/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<UnauthenticUser />} >
        <Route path="/signup"  element={<SignUp />}/>
        <Route path="/"  element={<SignIn />}/>
        </Route>
        <Route path='/students' element={<StudentsList />} />
        <Route path="/students/students_list" element={<StudentsList />} />
        <Route path='/students/add_student' element={<StudentAdd />} />
        <Route path='/students/update_student' element={<StudentUpdate />} />
        <Route path="/teachers/teachers_list" element={<TeachersList />} />
        <Route path='/teachers/add_teacher' element={<TeacherAdd />} />
        <Route path='/teachers/update_teacher' element={<TeacherUpdate />} />
        <Route path='/examination/examination_schedule' element={<ExamSchedule />}/>
        <Route path='/examination/results' element={<ExamResults />}/>
        <Route path='/classes/class_list' element={<ClassList />} />
        <Route path='/classes/class_form' element={<ClassForm />} />
        <Route path='/subjects/add_subject' element={<SubjectAdd />} />
        <Route path='/subjects/subject_list' element={<SubjectList />} />
        <Route path='/admissions/new_admission' element={<StudentAdd />} />
        <Route path='/fee/fee_structure' element={<FeeStructure />} />
        <Route path='/fee/fee_voucher' element={<FeeVoucher />} />
        <Route path='/fee/fee_payment' element={<FeePayment />} />
        <Route path='/schools/register_school' element={<StudentAdd />} />
        <Route path='/syllabus/syllabus_form' element={<SyllabusForm />} />
        <Route path='/syllabus/syllabus_list' element={<SyllabusList />} />
      </Routes>
    </>
  )
}

export default App