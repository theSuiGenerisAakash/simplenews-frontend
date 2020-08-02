// import useLocalStorage from "../utils/localStorage"
// import { useState, useEffect } from "react"

// const useAuth = () => {
//     const [isAuth, handleAuthorized] = useState(() => {
//         const value = JSON.parse(localStorage.getItem("user") || "{}")
//     })

//     useEffect(() => {
//         if (checkLocalStorageUser()) {
//             handleAuthorized(true)
//         } else {
//             handleAuthorized(false)
//         }
//     }, [checkLocalStorageUser()])
//     return isAuth
// }

// export default useAuth
