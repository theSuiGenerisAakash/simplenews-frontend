import React from "react"
import styled from "styled-components"
import theme from "../../assets/styles/globalStyles"

const NoContentView = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    color: ${theme.secondary};
    align-items: center;
    font-size: 2em;
`

function NoContent(props: { message: string }) {
    return <NoContentView>{props.message}</NoContentView>
}

NoContent.defaultProps = {
    message: "No content found"
}
export default NoContent
