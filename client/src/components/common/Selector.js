import React from 'react';
import PropTypes from 'prop-types';

const Selector = ({dataList, emptyString="", name, value, onChange }) => {
    return (
        <div className="select">
            <select name={name} value={value} onChange={onChange}>
                <option value="">{emptyString}</option>
                {
                    dataList.map(data => {
                        return <option key={data} value={data}>{data}</option>
                    })
                }
            </select>
        </div>
    )
}

Selector.propTypes = {
    dataList: PropTypes.array,
    emptyString: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default Selector
