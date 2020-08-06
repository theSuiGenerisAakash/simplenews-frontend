import styled from "styled-components"
import React from "react"

const Button = styled.button`
    font-size: medium;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
    color: ${(props) => props.theme[props.color]};
    background-color: white;
    border: 2px solid ${(props) => props.theme[props.color]};
    transition: 0.1s all ease-out;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme[props.color]};
        color: white;
    }
`
function SNButton(props: {
    colorTheme: "primary" | "secondary" | "warning"
    type: "button" | "submit"
    name: string
    value: string
    disabled: boolean
    onClick: (event) => any
}) {
    return (
        <Button
            color={props.colorTheme}
            type={props.type}
            name={props.name}
            disabled={props.disabled}
            onClick={(e) => props.onClick(e.target.value)}
        >
            {props.value || "Button"}
        </Button>
    )
}

SNButton.defaultProps = {
    disabled: false,
    type: "button",
    onClick: (args) => null
}

export default SNButton
