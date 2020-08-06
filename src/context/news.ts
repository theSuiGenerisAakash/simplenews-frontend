import { createContext, useContext } from "react"

export const NewsContext = createContext({
    bookmarkedNews: [],
    setBookmarkedNews: (arg1: any, arg2: any) => {}
})

export function useNews() {
    return useContext(NewsContext)
}
