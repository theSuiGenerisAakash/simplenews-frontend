import Header from "../../components/Header"
import styled from "styled-components"
import React = require("react")
import { useUser } from "../../context/user"
import { useAuth } from "../../context/auth"
import { useHistory } from "react-router-dom"
import FilterAndSearch from "../FilterAndSearch"
import NewsSection from "../NewsSection"
import { NewsContext } from "../../context/news"
import { networkCall } from "../../utils/networkCall"
import useNewsBookmarker from "../../hooks/useNewsBookmarker"
import theme from "../../assets/styles/globalStyles"
import goBackIcon from "../../assets/img/left-arrow.svg"
import { FiltersContext } from "../../context/filters"
import useLocalStorage from "../../hooks/useLocalStorage"

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 1em 0;
    min-height: 80vh;
    width: 100vw;
`

const BookmarksHeading = styled.div`
    height: 2em;
    padding: 0.5em;
    width: 85%;
    display: flex;
    border-radius: 4px;
    .go-back {
        width: 10%;
        height: 80%;
        font-weight: bold;
        cursor: pointer;
    }
    .your-bookmarks {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        font-weight: bold;
        color: ${theme.primary};
    }
`

export default function NewsPage() {
    const [bookmarkedNews, setBookmarkedNews] = useNewsBookmarker()
    const { user, setUser } = useUser()
    const [newsList, setNewsList] = React.useState([])
    const [showBookmarked, setShowBookmarked] = React.useState(false)
    const [filters, setFilters] = useLocalStorage("filters", {})
    React.useLayoutEffect(() => {
        let initialFilters = {
            country: "in"
        }
        if (!Object.keys(filters).length) {
            setFilters({})
        } else {
            initialFilters = filters
        }
        networkCall(`/news`, "POST", initialFilters).then((response) => {
            if (!response.body.message) {
                setNewsList(response.body)
            }
        })
        networkCall(`/news/${user.id}`, "GET").then((response) => {
            if (!response.body.message) {
                setBookmarkedNews(response.body, "add")
            }
        })
    }, [])
    const { setAuthToken } = useAuth()
    const history = useHistory()
    const logout = () => {
        setUser(null)
        setAuthToken(null)
        setFilters({})
        history.push("/login")
    }
    const switchToBookmarks = (swch: boolean) => {
        setShowBookmarked(swch)
    }
    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            <NewsContext.Provider value={{ bookmarkedNews, setBookmarkedNews }}>
                <Header name={user.name} logout={logout} switchToBookmarks={switchToBookmarks} />
                <Body>
                    {showBookmarked ? (
                        <>
                            <BookmarksHeading>
                                <img
                                    className="go-back"
                                    src={goBackIcon}
                                    alt="Go Back"
                                    title="Go back"
                                    onClick={() => setShowBookmarked(false)}
                                />
                                <div className="your-bookmarks">Your bookmarks</div>
                            </BookmarksHeading>
                            <NewsSection newsList={bookmarkedNews} />
                        </>
                    ) : (
                            <>
                                <FilterAndSearch passNewsUp={setNewsList} />
                                <NewsSection newsList={newsList} />
                            </>
                        )}
                </Body>
            </NewsContext.Provider>
        </FiltersContext.Provider>
    )
}
