import { useState } from "react"
import ls from "../utils/localStorage"

function useLocalStorage(key: string, initialValue: unknown): readonly [any, (arg) => void] {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(ls.getFromLocalStorage(key, initialValue))

    // Return a wrapped version of useState's setter function that persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value
            // Save state
            setStoredValue(valueToStore)
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error)
        }
    }

    return [storedValue, setValue] as const
}

export default useLocalStorage
