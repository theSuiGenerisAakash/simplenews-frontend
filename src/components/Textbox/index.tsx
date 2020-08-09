import styled from "styled-components"
import React, { useState } from "react"

const Textbox = styled.input`
    border-radius: 3px;
    border: 1px solid ${(props) => props.theme.primary};
    display: block;
    margin: 0 0 1em;
    background: #fff;
    color: #444;
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontSize};
    width: ${(props) => props.width};
    ::placeholder {
        color: ${(props) => props.theme.primary};
    }
`
function SNTexbox(props: {
    type: "text" | "password"
    name: string
    initialValue: string
    disabled: boolean
    placeholder: string
    required: boolean
    autocomplete: string
    padding: string
    fontSize: string
    width: string
}) {
    const { initialValue } = props
    const [value, setValue] = useState(initialValue)
    React.useEffect(() => setValue(initialValue), [initialValue])
    return (
        <Textbox
            type={props.type}
            name={props.name}
            disabled={props.disabled}
            value={value}
            placeholder={props.placeholder}
            required={props.required}
            onChange={(e) => setValue(e.target.value)}
            autocomplete={props.autocomplete || props.name}
            padding={props.padding}
            fontSize={props.fontSize}
            width={props.width}
        />
    )
}

SNTexbox.defaultProps = {
    type: "text",
    initialValue: "",
    disabled: false,
    placeholder: "",
    required: false,
    autocomplete: "",
    padding: "0.5em",
    fontSize: "14px",
    width: "10em"
}

export default SNTexbox
