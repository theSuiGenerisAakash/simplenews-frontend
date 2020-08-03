import * as React from "react"
import { hot } from "react-hot-loader"
import { AuthContext } from "../context/auth"
import theme from "../assets/styles/globalStyles"
import { ThemeProvider } from "styled-components"

import Router from "./Router"

function App() {
    return (
        <AuthContext.Provider value={true}>
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        </AuthContext.Provider>
    )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
