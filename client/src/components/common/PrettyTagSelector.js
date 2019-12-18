import React from 'react';
import PropTypes from 'prop-types';

const PrettyTagSelector = ({dataList, onChange, values = []}) => {

    const handleClick = tagName => {
        let newTagList;
        if(values.includes(tagName)){
            newTagList = values.filter(tag => tag !== tagName);
        } else {
            newTagList = [...values, tagName];
        }
        onChange(newTagList.length > 0  ? newTagList : null);
    }

    return (
        <div className="prettyTags">
            {dataList.map((data, index) => {
                let className = 'prettyTag';
                let iconClassName = 'fas';
                if(values.includes(data)){
                    className += ' active';
                    iconClassName += ' fa-check';
                }
                else{
                    iconClassName += ' fa-plus';
                }

                return( 
                <div className={className} key={index} onClick={() => handleClick(data)}>
                    <span className="icon">
                        <i className={iconClassName}></i>
                    </span>
                    <span>{data}</span>
                </div>)
            })}
        </div>
    )
}

PrettyTagSelector.propTypes = {
    onChange: PropTypes.func,
    dataList: PropTypes.array,
    values: PropTypes.array,
}

export default PrettyTagSelector
