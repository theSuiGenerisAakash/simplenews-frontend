import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import SuspensePage from "../../pages/SuspensePage"
const LoginPage = React.lazy(() => import("../../pages/LoginPage"))

import PrivateRoute from "../Router/privateRoute"
const NewsPage = React.lazy(() => import("../../pages/NewsPage"))

export default function SNRoutes(): any {
    return (
        <Router>
            <React.Suspense fallback={SuspensePage()}>
                <Switch>
                    <PrivateRoute exact path="/" component={NewsPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </React.Suspense>
        </Router>
    )
}
