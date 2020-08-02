import { createContext, useContext } from "react"

export const AuthContext = createContext(false)

export function useAuth(): any {
    return useContext(AuthContext)
}
