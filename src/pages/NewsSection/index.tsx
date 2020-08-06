import React from "react"
import styled from "styled-components"
import SNCard from "../../components/NewsCard"
import { useNews } from "../../context/news"
import NoContent from "../../components/NoContent"
import SNModal from "../../components/Modal"

const Section = styled.div`
    width: 80%;
    padding: 1em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`
const newsStub = {
    sourceId: null,
    sourceName: "source",
    title: "Title",
    description: "Description",
    url: "http://google.com",
    content:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book",
    author: "Aakash Verma",
    urlToImage: null,
    publishedAt: "23rd January, 2020"
}

function NewsSection(props: { newsList: Record<string, unknown>[] }) {
    const { bookmarkedNews, setBookmarkedNews } = useNews()
    const [modalIsOpen, setIsOpen] = React.useState(false)
    const [newsToOpen, setNewsToOpen] = React.useState(newsStub)
    function openModal(news) {
        setIsOpen(true)
        setNewsToOpen(news)
    }
    const bookmarkNews = (news, addOrRemove) => {
        setBookmarkedNews(news, addOrRemove)
    }
    function closeModal() {
        setIsOpen(false)
    }
    return (
        <>
            <Section>
                {props.newsList.length ? (
                    props.newsList.map((news) => (
                        <SNCard
                            key={news.url}
                            news={news}
                            isBookmarked={bookmarkedNews.some(
                                (bookmark) => news.url == bookmark.url
                            )}
                            bookmarkNews={bookmarkNews}
                            openNews={(news) => openModal(news)}
                        />
                    ))
                ) : (
                        <NoContent />
                    )}
            </Section>
            <SNModal isOpen={modalIsOpen} closeModal={closeModal} news={newsToOpen} />
        </>
    )
}

NewsSection.defaultProps = {
    newsList: []
}

export default NewsSection
