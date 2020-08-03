import theme from "../../assets/styles/globalStyles"
import Loader from "react-loader-spinner"
import React from "react"
import styled from "styled-components"

const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(131, 128, 128, 0.35);
    position: absolute;
    top: 0;
`

export default function LoaderPage() {
    return (
        <Background>
            <Loader type="TailSpin" color={theme.primary} height={100} width={100} />
        </Background>
    )
}
