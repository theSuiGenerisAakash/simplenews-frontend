import React from "react"
import SNButton from "../../components/Button"
import { useFilters } from "../../context/filters"

function Pager() {
    const { filters, setFilters } = useFilters()
    return (
        <div>
            <SNButton
                name="previous"
                value="Previous"
                disabled={filters.page === 1}
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            />
            <SNButton
                name="next"
                value="Next"
                disabled={filters.maxPage}
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            />
        </div>
    )
}

export default React.memo(Pager)
