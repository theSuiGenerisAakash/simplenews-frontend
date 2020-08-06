import { createContext, useContext } from "react"

export const UserContext = createContext({ user: {}, setUser: (arg: any) => {} })

export function useUser() {
    return useContext(UserContext)
}
