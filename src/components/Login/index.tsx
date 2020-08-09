import React = require("react")
import { networkCall } from "../../utils/networkCall"
import SNButton from "../Button"
import SNTextbox from "../Textbox"
import "./index.scss"
import { useAuth } from "../../context/auth"
import { useUser } from "../../context/user"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

const LoginMessage = styled.div`
    color: white;
    height: 2em;
    display: flex;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${(props) => (props.success ? props.theme.success : props.theme.error)};
`

function Login() {
    const history = useHistory()
    const [message, setMessage] = React.useState({ show: false, success: false, text: "" })
    const { setUser } = useUser()
    const { authToken, setAuthToken } = useAuth()
    const [formType, setFormType] = React.useState("login")

    const showMessage = (success, message) => {
        setMessage({ show: true, success, text: message })
        setTimeout(() => setMessage({ show: false, success, text: "" }), 2000)
    }

    React.useLayoutEffect(() => {
        if (authToken) {
            history.push("/")
        }
    }, [])

    const login = async (event) => {
        event.preventDefault()
        const payload = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        networkCall("/auth/login", "POST", payload).then((response) => {
            if (response.status === 200) {
                showMessage(true, "Login successful!")
                setAuthToken(response.body.token)
                delete response.body.token
                setUser(response.body)
                setTimeout(() => history.push("/"), 2000)
            } else {
                showMessage(
                    false,
                    response.status === 404 ? response.body.message : "Incorrect username/password"
                )
            }
        })
    }

    const createAcccount = async (event) => {
        event.preventDefault()
        const payload = {
            name: event.target.name.value,
            username: event.target.username.value,
            password: event.target.passwordCreate.value
        }
        networkCall("/users/new-user", "POST", payload).then((response) => {
            if (response.status === 201) {
                showMessage(true, "User created. Please login.")
                setTimeout(() => {
                    setFormType("login")
                    document.getElementsByName("password")[0].value = ""
                }, 2000)
            } else {
                showMessage(false, response.body.message)
            }
        })
    }

    return (
        <div className="login-card">
            <div className="login-header">SimpleNews</div>
            {message.show && <LoginMessage success={message.success}>{message.text}</LoginMessage>}
            {formType === "login" ? (
                <form onSubmit={login}>
                    <SNTextbox
                        name="username"
                        placeholder="Username"
                        required={true}
                        autocomplete="username"
                    />
                    <SNTextbox
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                        autocomplete="current-password"
                    />
                    <SNButton colorTheme="primary" type="submit" name="login" value="Login" />
                    <div className="no-account-yet" onClick={() => setFormType("create")}>
                        Create an account?
                    </div>
                </form>
            ) : (
                    <form onSubmit={createAcccount}>
                        <SNTextbox
                            name="username"
                            placeholder="Username"
                            required={true}
                            autocomplete="username"
                        />
                        <SNTextbox name="name" placeholder="Name" required={true} autocomplete="name" />
                        <SNTextbox
                            type="password"
                            name="passwordCreate"
                            placeholder="Password"
                            required={true}
                            autocomplete="new-password"
                        />
                        <SNButton
                            colorTheme="primary"
                            type="submit"
                            name="create-acccount"
                            value="Sign up"
                        />
                        <div className="no-account-yet" onClick={() => setFormType("login")}>
                            Login
                    </div>
                    </form>
                )}
        </div>
    )
}

export default Login
