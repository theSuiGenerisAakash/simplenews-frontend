import LoaderPage from "../SuspensePage"
import { usePromiseTracker } from "react-promise-tracker"
import React from "react"

export default function AsyncLoaderPage() {
    const { promiseInProgress } = usePromiseTracker()
    return promiseInProgress ? <LoaderPage /> : null
}
