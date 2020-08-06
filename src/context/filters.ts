import { createContext, useContext } from "react"

export const FiltersContext = createContext({ filters: {}, setFilters: (arg: any) => {} })

export function useFilters() {
    return useContext(FiltersContext)
}
