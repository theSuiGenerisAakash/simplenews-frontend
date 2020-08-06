import React from "react"
import styled from "styled-components"
import PlaceholderNewsImage from "../../assets/img/icons8-news-256.png"
import BookmarkIconFilled from "../../assets/img/icons8-bookmark-golden-filled.svg"
import BookmarkIconUnfilled from "../../assets/img/icons8-bookmark-golden.svg"

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    margin: 1em 1em 0.5em;
    width: 15em;
    height: 18em;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`

const CardImage = styled.img`
    border-radius: 5px 5px 0 0;
    width: inherit;
    height: 73%;
`

const TitleContainer = styled.div`
    padding: 2px 16px;
    height: 20%;
    overflow: hidden;
    width: 90%;
    .source-name {
        padding-top: 0.4rem;
        font-size: 11px;
        font-family: sans-serif;
        width: 70%;
    }
    .title-and-bookmark {
        display: flex;
        .title {
            height: 3.5em;
            overflow: hidden;
            width: 90%;
            font-weight: bold;
            font-size: 12px;
        }
        .bookmark-icon {
            width: 2em;
            height: 2em;
            cursor: pointer;
            fill: #ffdf00;
        }
    }
`

export default function SNCard(props: {
    news: Record<string, any>
    openNews: (arg: any) => void
    isBookmarked: boolean
    bookmarkNews: (arg1: any, arg2: string) => void
}) {
    const { news, isBookmarked } = props
    let newsTitle: string = news.title as string
    const newsSource = news.sourceName || newsTitle.substr(newsTitle.lastIndexOf("-"))
    newsTitle = `${newsTitle.substr(0, newsTitle.lastIndexOf("-") - 1).substr(0, 80)}...`
    return (
        <Card>
            <CardImage
                src={news.urlToImage ? news.urlToImage : PlaceholderNewsImage}
                alt="News card"
                onClick={() => props.openNews(news)}
            />
            <TitleContainer>
                <div className="title-and-bookmark">
                    <div className="title">{newsTitle}</div>
                    <img
                        className="bookmark-icon"
                        src={isBookmarked ? BookmarkIconFilled : BookmarkIconUnfilled}
                        title="Bookmark this news"
                        onClick={() => props.bookmarkNews(news, isBookmarked ? "remove" : "add")}
                    />
                </div>
                <div className="source-name">{newsSource}</div>
            </TitleContainer>
        </Card>
    )
}
