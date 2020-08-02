import * as React from "react"
import { hot } from "react-hot-loader"
import { AuthContext } from "../context/auth"

// import Header from "./Header"
import Router from "./Router"

function App() {
    return (
        <AuthContext.Provider value={true}>
            <Router />
        </AuthContext.Provider>
    )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
