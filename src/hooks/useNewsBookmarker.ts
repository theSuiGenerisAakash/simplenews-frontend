import { useState } from "react"
import { networkCall } from "../utils/networkCall"
import ls from "../utils/localStorage"

function useNewsBookmarker(): readonly [any, (arg1, arg2) => void] {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [bookmarkedNews, bookmarkNews] = useState([])

    // Return a wrapped version of useState's setter function that persists the new value to localStorage.
    const setBookmarkedNews = (
        news: Record<string, unknown> | Record<string, unknown>[],
        addOrRemove: "add" | "remove"
    ) => {
        const user = ls.getFromLocalStorage("user", null)
        try {
            if (addOrRemove == "add") {
                if (Array.isArray(news)) {
                    bookmarkNews([...bookmarkedNews, ...news])
                } else {
                    // bookmarkNews(bookmarkedNews.filter((newsEntry) => newsEntry.url !== news.url))
                    networkCall(`/news/${user.id}`, "POST", { news: news }).then((response) => {
                        if (response.status == 201) {
                            bookmarkNews([...bookmarkedNews, response.body])
                        }
                    })
                }
            } else {
                if (bookmarkedNews.some((newsEntry) => newsEntry.url === news.url)) {
                    const newsId = bookmarkedNews.filter(
                        (bookmark) => bookmark.url === news.url
                    )[0]["id"]
                    networkCall(`/news/${user.id}`, "DELETE", { newsId: newsId }).then(
                        (response) => {
                            if (response.status == 200) {
                                bookmarkNews(
                                    bookmarkedNews.filter((newsEntry) => newsEntry.url !== news.url)
                                )
                            }
                        }
                    )
                }
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error)
        }
    }

    return [bookmarkedNews, setBookmarkedNews] as const
}

export default useNewsBookmarker
