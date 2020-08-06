import * as React from "react"
import { render } from "react-dom"
import App from "./components/App"
import AsyncLoader from "./pages/AsyncLoader"
const rootEl = document.getElementById("root")

render(
    <>
        <App />
        <AsyncLoader />
    </>,
    rootEl
)
