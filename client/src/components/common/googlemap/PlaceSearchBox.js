import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Autocomplete } from '@react-google-maps/api'

var autocomplete;

const PlaceSearchBox = props => {
    useEffect(() => {
        var input = document.getElementById('placesearch');
        input.value = props.value ? props.value : '';
    }, [props.value])

    const onLoad = (instance) => {
        autocomplete = instance
    }

    const onPlaceChanged = () => {
        if (autocomplete) {
            props.onPlaceChanged(autocomplete.getPlace())
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
        >
            <input
                type='text'
                id='placesearch'
                className='input'
                onBlur={props.onBlur}
                onChange={props.onChange}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                placeholder={props.placeholder}
            />
        </Autocomplete>
    )
}

PlaceSearchBox.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onPlaceChanged: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
}

export default PlaceSearchBox
