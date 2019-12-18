import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AreaSelect = (props) => {
    const areaList = useSelector( state => state.common.areaList);

    const handleChange = event => {
        props.onChange(event.target.value);
    }

    return (
        <div className="select">
            <select value={props.value} onChange={handleChange}>
                <option value=''>{props.emptyString ? props.emptyString : ''}</option>
                {areaList ? areaList.map(area => {
                    return <option key={area._id} value={area._id}>{area.name}</option>
                }) : null}
            </select>
        </div>
    )

}

AreaSelect.propTypes = {
    onChange: PropTypes.func,
    emptyString: PropTypes.string,
    value: PropTypes.string,
}

export default AreaSelect;
