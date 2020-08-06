import React from "react"
import styled from "styled-components"
import SNSelect from "../../components/Select"
import SNTextbox from "../../components/Textbox"
import theme from "../../assets/styles/globalStyles"
import SNButton from "../../components/Button"
import { networkCall } from "../../utils/networkCall"
import showToast from "../../utils/toast"
const { getName } = require("country-list")
import { useFilters } from "../../context/filters"

type Option = {
    value: string
    label: string
}

const Container = styled.div`
    height: 4em;
    border: 2px solid ${theme.primary};
    padding: 0.5em;
    width: 85%;
    display: flex;
    border-radius: 4px;
`

const ContainerForm = styled.form`
    display: flex;
    position: relative;
    align-items: baseline;
    width: 100%;
    justify-content: space-around;
`

export default function FilterAndSearch(props: {
    passNewsUp: (arg: Record<string, unknown>[]) => void
}) {
    const { filters, setFilters } = useFilters()
    const countryList: Option[] = [
        "ae",
        "ar",
        "at",
        "au",
        "be",
        "bg",
        "br",
        "ca",
        "ch",
        "cn",
        "co",
        "cu",
        "cz",
        "de",
        "eg",
        "fr",
        "gb",
        "gr",
        "hk",
        "hu",
        "id",
        "ie",
        "il",
        "in",
        "it",
        "jp",
        "kr",
        "lt",
        "lv",
        "ma",
        "mx",
        "my",
        "ng",
        "nl",
        "no",
        "nz",
        "ph",
        "pl",
        "pt",
        "ro",
        "rs",
        "ru",
        "sa",
        "se",
        "sg",
        "si",
        "sk",
        "th",
        "tr",
        "tw",
        "ua",
        "us",
        "ve",
        "za"
    ].map((countryCode) => ({ value: countryCode, label: getName(countryCode) }))

    const catgeoryList: Option[] = [
        { value: "business", label: "Business" },
        { value: "entertainment", label: "Entertainment" },
        { value: "general", label: "General" },
        { value: "health", label: "Health" },
        { value: "science", label: "Science" },
        { value: "sports", label: "Sports" },
        { value: "technology", label: "Technology" }
    ]

    const applyFilters = (event) => {
        let payload = { country: "in", page: 1, maxPage: false }
        if (event) {
            event.preventDefault()
            const category = event.target.category.value
            const country = event.target.country.value
            const search = event.target.search.value
            payload = {
                ...(category && { category }),
                ...(country && { country }),
                ...(search && { search })
            }
            setFilters({ ...filters, ...payload })
        } else {
            setFilters(payload)
        }

        delete payload.maxPage
        if (Object.keys(payload).length === 0) {
            showToast(400, "Please fill at least one field")
        } else {
            networkCall("/news", "POST", payload).then((response) => {
                if (response.status === 200) {
                    props.passNewsUp(response.body)
                }
            })
        }
    }

    return (
        <Container>
            <ContainerForm onSubmit={applyFilters}>
                <SNSelect
                    name="category"
                    options={catgeoryList}
                    defaultValue={filters["category"]}
                ></SNSelect>
                <SNSelect
                    name="country"
                    options={countryList}
                    defaultValue={filters["country"]}
                ></SNSelect>
                <SNTextbox
                    name="search"
                    placeholder="Search for..."
                    padding="0.6em"
                    fontSize="15px"
                    width="20rem"
                    initialValue={filters["search"]}
                ></SNTextbox>
                <SNButton type="submit" name="apply" value="Apply" />
                {/* <SNButton name="clear" value="Clear" onClick={() => applyFilters(null)} /> */}
            </ContainerForm>
        </Container>
    )
}
