import React from "react"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import ClassesScreen from "./routes/Classes"

import HomeScreen from "./routes/Home"
import LoginScreen from "./routes/Login"
import NewClassScreen from "./routes/NewClass"
import NewStudent from "./routes/NewStudent"
import NewSubject from "./routes/NewSubject"
import NewTeacher from "./routes/NewTeacher"
import Preload from "./routes/Preload"
import StudentGradesScreen from "./routes/StudentGrades"
import StudentScreen from "./routes/Students"
import StudentScheduleScreen from "./routes/StudentSchedule"
import StudentSubjectsScreen from "./routes/StudentSubjects"
import SubjectsScreen from "./routes/Subjects"
import TeacherNewActivityScreen from "./routes/TeacherNewActivity"
import TeacherActivityList from "./routes/TeacherActivityList"
import TeachersScreen from "./routes/Teachers"
import TeacherNewGrade from "./routes/TeacherNewGrade"
import StudentActivitySchedule from "./routes/StudentActivitySchedule"
import TeacherViewActivitys from "./routes/TeacherViewActivitys"
import StudentMoreInfo from "./routes/StudentMoreInfo"
import ClassMoreInfo from "./routes/ClassMoreInfo"
import TeacherMoreInfo from "./routes/TeacherMoreInfo"

const PrivateRoute = ({component:Component, ...rest}) => {
    <Route 
        {...rest}
        render={props => {
            //Pega uma logica de autenticação
            1 === 1 ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname:"/login", state: {from:props.location}}} />
            )
        }}
    />
}

const Roteador = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Preload />
                </Route>
                <Route exact path="/dashboard">
                    <HomeScreen />
                </Route>
                <Route path="/login">
                    <LoginScreen />
                </Route>
                <Route exact path="/dashboard/students">
                    <StudentScreen />
                </Route>
                <Route path="/dashboard/students/new-student">
                    <NewStudent />
                </Route>
                <Route exact path="/dashboard/classes">
                    <ClassesScreen />
                </Route>
                <Route path="/dashboard/classes/new-class">
                    <NewClassScreen />
                </Route>
                <Route path="/dashboard/class/:id/more-info">
                    <ClassMoreInfo />
                </Route>
                <Route exact path="/dashboard/subjects">
                    <SubjectsScreen/>
                </Route>
                <Route path="/dashboard/subjects/new-subject">
                    <NewSubject />
                </Route>
                <Route exact path="/dashboard/teachers">
                    <TeachersScreen />
                </Route>
                <Route exact path="/dashboard/teachers/new-teacher">
                    <NewTeacher />
                </Route>
                <Route exact path="/dashboard/student/schedule">
                    <StudentScheduleScreen />
                </Route>
                <Route path="/dashboard/student/schedule/activity/:id">
                    <StudentActivitySchedule />
                </Route>
                <Route path="/dashboard/student/subjects">
                    <StudentSubjectsScreen />
                </Route>
                <Route path="/dashboard/student/grades">
                    <StudentGradesScreen />
                </Route>
                <Route path="/dashboard/student/:id/more-info">
                    <StudentMoreInfo />
                </Route>
                <Route path="/dashboard/teacher/new-activity">
                    <TeacherNewActivityScreen />
                </Route>
                <Route path="/dashboard/teacher/activity-list">
                    <TeacherActivityList />
                </Route>
                <Route exact path="/dashboard/teacher/new-grade">
                    <TeacherNewGrade />
                </Route>
                <Route exact path="/dashboard/teacher/view-activitys">
                    <TeacherViewActivitys />
                </Route>
                <Route path="/dashboard/teacher/:id/more-info">
                    <TeacherMoreInfo />
                </Route>
            </Switch>
        </Router>
    )
}

export default Roteador