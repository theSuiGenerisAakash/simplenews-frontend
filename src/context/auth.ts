import { createContext, useContext } from "react"

export const AuthContext = createContext({ authToken: "", setAuthToken: (arg: any) => {} })

export function useAuth() {
    return useContext(AuthContext)
}
