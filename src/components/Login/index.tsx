// import { useHistory, useLocation } from "react-router-dom"
import React = require("react")
import { networkCall } from "../../utils/networkCall"

function Login(): any {
    // const history = useHistory()
    // const location = useLocation()

    // const { from } = location.state || { from: { pathname: "/" } }
    const login = async (event) => {
        console.log(event)
        const response = await networkCall("/auth/login", "POST", event)
        console.log(response)
    }

    return (
        <>
            <div className="login-header"> You need to log in</div>
            <form onSubmit={login}>
                <label>Username</label>
                <input type="text" name="username" id="input-username" />
                <label>Password</label>
                <input type="password" name="password" id="input-password" />
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default Login
