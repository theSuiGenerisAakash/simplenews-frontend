import React from "react"
import Select from "react-select"
import theme from "../../assets/styles/globalStyles"

type Option = {
    value: string
    label: string
}

const colourStyles = {
    control: (styles, { isSelected }) => ({
        ...styles,
        border: isSelected ? `2px solid ${theme.primary}` : `1px solid ${theme.primary}`,
        backgroundColor: "white",
        width: 200,
        cursor: "pointer"
    }),
    option: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? theme.primary : "#FFF",
        color: isFocused ? "#FFF" : theme.primary,
        cursor: "pointer",
        width: 200
    }),
    menu: (styles) => ({ ...styles, width: 200 })
}

const SNSelect = (props: { options: Option[]; name: string; defaultValue: string }) => (
    <Select
        options={props.options}
        styles={colourStyles}
        name={props.name}
        defaultValue={props.options.filter((option) => option.value === props.defaultValue)[0]}
    />
)

export default SNSelect
