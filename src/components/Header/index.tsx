import React from "react"
import "./index.scss"
import BookmarksImage from "../../assets/img/icons8-bookmark.svg"
import LogoutImage from "../../assets/img/logout.svg"

const Header = (props: { name: string; logout: () => void; switchToBookmarks: (arg) => void }) => (
    <header>
        <div className="brand">SimpleNews</div>
        <div className="user-details">
            <div className="name">Hi, {props.name}!</div>
            <img
                className="bookmarks-image"
                src={BookmarksImage}
                alt="Bookmark icon"
                title="Bookmarked News"
                onClick={() => props.switchToBookmarks(true)}
            />
            <img
                className="logout-image"
                src={LogoutImage}
                alt="Logout icon"
                title="Logout"
                onClick={props.logout}
            />
        </div>
    </header>
)

export default React.memo(Header)
