import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ClassesScreen from "./routes/Classes"

import HomeScreen from "./routes/Home"
import LoginScreen from "./routes/Login"
import Preload from "./routes/Preload"
import StudentScreen from "./routes/Students"
import SubjectsScreen from "./routes/Subjects"
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
            </Switch>
        </Router>
    )
}

export default Roteador