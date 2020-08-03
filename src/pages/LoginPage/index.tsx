// import { useHistory, useLocation } from "react-router-dom"
import styled from "styled-components"
import Login from "../../components/Login"
import React from "react"
import theme from "../../assets/styles/globalStyles"

const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.secondary};
`

function LoginPage() {
    return (
        <LoginContainer>
            <Login />
        </LoginContainer>
    )
}

export default LoginPage
