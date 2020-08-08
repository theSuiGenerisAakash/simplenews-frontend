import React from "react"
import SNButton from "../../components/Button"
import { isEqual } from "lodash"

function Pager(props: {
    pageInfo: Record<string, unknown>
    pageUp: () => void
    pageDown: () => void
}) {
    const { pageInfo, pageUp, pageDown } = props
    return (
        <div>
            <SNButton
                name="previous"
                value="Previous"
                disabled={pageInfo.page === 1}
                onClick={pageDown}
            />
            <SNButton name="next" value="Next" disabled={pageInfo.lastPage} onClick={pageUp} />
        </div>
    )
}

export default React.memo(Pager, (prevProps, nextProps) =>
    isEqual(prevProps.pageInfo, nextProps.pageInfo)
)
