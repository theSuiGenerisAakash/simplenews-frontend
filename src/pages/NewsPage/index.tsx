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
import Pager from "../../components/Pager"
import useLocalStorage from "../../hooks/useLocalStorage"
import { isEqual } from "lodash"

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
    const { setAuthToken } = useAuth()
    const [newsList, setNewsList] = React.useState([])
    const [showBookmarked, setShowBookmarked] = React.useState(false)
    const defaultFilters = { country: "in" }
    const defaultPageInfo = { page: 1, lastPage: true }
    const [filters, setFilters] = useLocalStorage("filters", defaultFilters)
    const [pageInfo, setPageInfo] = useLocalStorage("pageInfo", defaultPageInfo)
    const history = useHistory()

    React.useEffect(() => {
        networkCall(`/news/${user.id}`, "GET").then((response) => {
            if (!response.body.message) {
                setBookmarkedNews(response.body, "add")
            }
        })
    }, [])

    React.useEffect(() => {
        const payload = { ...filters, page: pageInfo.page }
        populateNews(payload)
    }, [])

    const logout = () => {
        setUser(null)
        setAuthToken(null)
        setPageInfo(defaultPageInfo)
        setFilters(defaultFilters)
        history.push("/login")
    }

    const populateNews = async (payload: Record<string, unknown>) => {
        delete payload.lastPage
        const response = await networkCall(`/news`, "POST", payload)
        if (!response.body.message) {
            setNewsList(response.body)
            if (response.body.length < 20) {
                setPageInfo({ page: payload.page, lastPage: true })
            } else {
                setPageInfo({ page: payload.page, lastPage: false })
            }
        }
    }

    const applyFilters = (filtersToSet, isPageReloaded = true, pageChange = 0) => {
        let newPage
        if (!isPageReloaded) {
            if (!isEqual(filtersToSet, filters)) {
                setFilters(filtersToSet)
            }
            newPage = pageChange ? pageChange : 1
            populateNews({
                ...filtersToSet,
                page: newPage
            })
        } else {
            newPage = pageChange ? pageChange : pageInfo.page
            populateNews({
                ...filtersToSet,
                page: newPage
            })
        }
    }

    const pageUp = () => applyFilters(filters, false, pageInfo.page + 1)

    const pageDown = () => applyFilters(filters, false, pageInfo.page - 1)

    return (
        <NewsContext.Provider value={{ bookmarkedNews, setBookmarkedNews }}>
            <Header name={user.name} logout={logout} switchToBookmarks={setShowBookmarked} />
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
                            <FilterAndSearch filters={filters} applyFilters={applyFilters} />
                            <NewsSection newsList={newsList} />
                            <Pager pageInfo={pageInfo} pageUp={pageUp} pageDown={pageDown} />
                        </>
                    )}
            </Body>
        </NewsContext.Provider>
    )
}
