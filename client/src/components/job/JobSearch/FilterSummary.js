import React from 'react'

const FilterSummary = ({ filter }) => {
    const renderArrayFillterInfo = (name, arrayFilter) => {
        if (!arrayFilter || arrayFilter.length === 0)
            return null;

        return (
            <span className="tags has-addons">
                <span className="tag is-info">
                    {name}
                </span>
                <span className="tag is-light">
                    {arrayFilter.join(', ')}
                </span>
            </span>
        )
    }

    const renderFilterInfo = (name, filter) => {
        if (!filter)
            return null;
        return (
            <span className="tags has-addons">
                <span className="tag is-info">
                    {name}
                </span>
                <span className="tag is-light">
                    {filter}
                </span>
            </span>
        )
    }

    return (
        <div className="filterSummary">
            {renderArrayFillterInfo('職種', filter.jobCategory)}
            {renderFilterInfo('雇用形態', filter.workType)}
            {renderFilterInfo('必要英語力', filter.englishLevel)}
            {renderArrayFillterInfo('タグ', filter.tags)}
        </div>
    )
}

export default FilterSummary
