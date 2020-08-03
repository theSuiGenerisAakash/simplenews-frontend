import LoaderPage from "../../pages/LoaderPage"
import { usePromiseTracker } from "react-promise-tracker"
import React from "react"

export default function AsyncLoader() {
    const { promiseInProgress } = usePromiseTracker()
    console.log(promiseInProgress)
    return promiseInProgress ? <LoaderPage /> : null
}
