import { createContext, useContext } from "react"

export const UserContext = createContext({ user: {}, setUser: (_arg: any) => undefined })

export function useUser() {
    return useContext(UserContext)
}
