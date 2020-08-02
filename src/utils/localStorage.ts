const getFromLocalStorage = (key: string, initialValue: unknown): any => {
    try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key)
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue
    } catch (error) {
        // If error also return initialValue
        console.log(error)
        return initialValue
    }
}

const saveToLocalStorage = (key: string, valueToStore: unknown): void => {
    try {
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error)
    }
}

export default { getFromLocalStorage, saveToLocalStorage }
