import { Route, RouteProps, Redirect } from "react-router-dom"
import React from "react"
import { useAuth } from "../../context/auth"

function PrivateRoute({ component: Component, ...rest }: RouteProps): any {
    if (!Component) return null
    const isAuthenticated = useAuth()
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute
