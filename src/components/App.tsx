import * as React from "react"
import { hot } from "react-hot-loader"
import { AuthContext } from "../context/auth"
import theme from "../assets/styles/globalStyles"
import { ThemeProvider } from "styled-components"
import Router from "./Router"
import useLocalStorage from "../hooks/useLocalStorage"
import { UserContext } from "../context/user"

function App() {
    const [authToken, setAuthToken] = useLocalStorage("token", null)
    const [user, setUser] = useLocalStorage("user", null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AuthContext.Provider value={{ authToken, setAuthToken }}>
                <ThemeProvider theme={theme}>
                    <Router />
                </ThemeProvider>
            </AuthContext.Provider>
        </UserContext.Provider>
    )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
