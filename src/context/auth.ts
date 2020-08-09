import { createContext, useContext } from "react"

export const AuthContext = createContext({ authToken: "", setAuthToken: (_arg: any) => undefined })

export function useAuth() {
    return useContext(AuthContext)
}
