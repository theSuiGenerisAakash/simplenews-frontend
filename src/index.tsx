import * as React from "react"
import { render } from "react-dom"
import App from "./components/App"
import AsyncLoaderPage from "./pages/AsyncLoaderPage"
import { ToastContainer } from "react-toastify"
const rootEl = document.getElementById("root")

render(
    <>
        <App />
        <ToastContainer />
        <AsyncLoaderPage />
    </>,
    rootEl
)
