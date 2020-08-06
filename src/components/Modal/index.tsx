import React from "react"
import Modal from "react-modal"
import styled from "styled-components"
import theme from "../../assets/styles/globalStyles"
const moment = require("moment")
import PlaceholderNewsImage from "../../assets/img/icons8-news-256.png"

const NewsImage = styled.img`
    width: 100%;
    height: 75%;
`

const NewsTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding: 0.5em 0;
`

const NewsSource = styled.div`
    font-size: 14px;
    padding: 0.2em 0;
    display: flex;
    justify-content: space-between;
`
const NewsDescription = styled.div`
    font-size: 14px;
    padding: 0.5em 0;
    color: ${theme.secondary};
`

const NewsContent = styled.div`
    font-size: 12px;
    padding: 0.5em 0;
`
const NewsLink = styled.a`
    font-size: 12px;
`

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: "40%",
        height: "70%",
        transform: "translate(-50%, -50%)"
    }
}

function ReadMore(props: { url: string }) {
    return (
        <NewsLink href={props.url} rel="noreferrer" target="_blank">
            read more
        </NewsLink>
    )
}

const MemoizedReadMore = React.memo(ReadMore)

Modal.setAppElement("#root")

function SNModal(props: {
    news: Record<string, unknown>
    isOpen: boolean
    closeModal: () => void
}) {
    const { news } = props
    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.closeModal} style={customStyles}>
            <NewsImage src={news.urlToImage || PlaceholderNewsImage} />
            <NewsTitle>{news.title.substr(0, news.title.lastIndexOf("-"))}</NewsTitle>
            <NewsSource>
                <div>{news.soureName || news.title.substr(news.title.lastIndexOf("-") + 1)}</div>
                <div>{moment(news.publishedAt).format("Do MMMM YYYY, h:mm a")}</div>
            </NewsSource>
            {news.description && <NewsDescription>{news.description}</NewsDescription>}
            {news.content && (
                <NewsContent>
                    {news.content.substr(0, news.content.lastIndexOf("[+"))}
                    {news.url && <MemoizedReadMore url={news.url} />}
                </NewsContent>
            )}
            {!news.content && <MemoizedReadMore url={news.url} />}
            <div className="sharethis-inline-share-buttons"></div>
        </Modal>
    )
}

SNModal.defaultProps = {
    isOpen: false
}

export default SNModal
