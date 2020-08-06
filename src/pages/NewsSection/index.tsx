import React from "react"
import styled from "styled-components"
import SNCard from "../../components/NewsCard"
import { networkCall } from "../../utils/networkCall"
import { useNews } from "../../context/news"
import NoContent from "../../components/NoContent"

const Section = styled.div`
    width: 80%;
    padding: 1em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

function NewsSection(props: { newsList: Record<string, unknown>[] }) {
    const { bookmarkedNews, setBookmarkedNews } = useNews()
    const bookmarkNews = (news, addOrRemove) => {
        setBookmarkedNews(news, addOrRemove)
    }
    return (
        <Section>
            {props.newsList.length ? (
                props.newsList.map((news) => (
                    <SNCard
                        key={news.url}
                        news={news}
                        isBookmarked={bookmarkedNews.some((bookmark) => news.url == bookmark.url)}
                        bookmarkNews={bookmarkNews}
                    />
                ))
            ) : (
                    <NoContent />
                )}
        </Section>
    )
}

NewsSection.defaultProps = {
    newsList: []
}

export default NewsSection
