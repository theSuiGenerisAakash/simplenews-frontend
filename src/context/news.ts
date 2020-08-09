import { createContext, useContext } from "react"

export const NewsContext = createContext({
    bookmarkedNews: [],
    setBookmarkedNews: (_arg1: any, _arg2: any) => undefined
})

export function useNews() {
    return useContext(NewsContext)
}
