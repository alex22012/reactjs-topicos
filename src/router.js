import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ClassesScreen from "./routes/Classes"

import HomeScreen from "./routes/Home"
import LoginScreen from "./routes/Login"
import Preload from "./routes/Preload"
import StudentGradesScreen from "./routes/StudentGrades"
import StudentScreen from "./routes/Students"
import StudentScheduleScreen from "./routes/StudentSchedule"
import StudentSubjectsScreen from "./routes/StudentSubjects"
import SubjectsScreen from "./routes/Subjects"
import TeacherNewActivityScreen from "./routes/TeacherNewActivity"
import TeacherNewGrade from "./routes/TeacherNewGrade"
import TeachersScreen from "./routes/Teachers"

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
                <Route path="/dashboard/students">
                    <StudentScreen />
                </Route>
                <Route path="/dashboard/classes">
                    <ClassesScreen />
                </Route>
                <Route path="/dashboard/subjects">
                    <SubjectsScreen/>
                </Route>
                <Route path="/dashboard/teachers">
                    <TeachersScreen />
                </Route>
                <Route path="/dashboard/student/schedule">
                    <StudentScheduleScreen />
                </Route>
                <Route path="/dashboard/student/subjects">
                    <StudentSubjectsScreen />
                </Route>
                <Route path="/dashboard/student/grades">
                    <StudentGradesScreen />
                </Route>
                <Route path="/dashboard/teacher/new-activity">
                    <TeacherNewActivityScreen />
                </Route>
                <Route path="/dashboard/teacher/new-grade">
                    <TeacherNewGrade />
                </Route>
            </Switch>
        </Router>
    )
}

export default Roteador