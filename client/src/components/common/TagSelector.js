import React from 'react';
import PropTypes from 'prop-types';

const TagSelector = ({dataList, onChange, values = []}) => {

    const handleClick = tagName => {
        let newTagList;
        if(values.includes(tagName)){
            newTagList = values.filter(tag => tag !== tagName);
        } else {
            newTagList = [...values, tagName];
        }
        onChange(newTagList);
    }

    return (
        <div className="tags">
            {dataList.map((data, index) => {
                let className = 'tag is-large';
                if(values.includes(data)){
                    className += ' active';
                }
                return <span className={className} key={index} onClick={() => handleClick(data)}>{data}</span>
            })}
        </div>
    )
}

TagSelector.propTypes = {
    onChange: PropTypes.func,
    dataList: PropTypes.array,
    values: PropTypes.array,
}

export default TagSelector
