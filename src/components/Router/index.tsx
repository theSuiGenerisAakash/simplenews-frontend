import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import LoaderPage from "../../pages/LoaderPage"
const LoginPage = React.lazy(() => import("../../pages/LoginPage"))

import PrivateRoute from "../Router/privateRoute"

export default function SNRoutes(): any {
    return (
        <Router>
            <React.Suspense fallback={LoaderPage()}>
                <Switch>
                    <PrivateRoute exact path="/" component={LoginPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </React.Suspense>
        </Router>
    )
}
