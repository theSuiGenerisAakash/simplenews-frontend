import React = require("react")
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from "../../components/Login"
import PrivateRoute from "../Router/privateRoute"

export default function AuthExample(): any {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    )
}
