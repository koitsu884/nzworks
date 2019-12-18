import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';
import FieldError from './FieldError';
import PlaceSearchBox from '../common/googlemap/PlaceSearchBox';
import DisplayLocation from '../common/googlemap/DisplayLocation';

export default function AddressField({
    name,
    className,
    placeholder,
    label,
    info,
    customErrorMessage,
    registerOptions={}
}) {
    const{ register, errors, setValue, watch } = useFormContext();
    const location = watch("location");
    const address = watch("address");

    useEffect(() => {
        register({ 'name': 'address',  type: 'custom' });
        register({ 'name': 'location',  type: 'custom' });
    }, [register])

    const handlePlaceChanged = places => {
      if(places.geometry.location)
      {
          setValue('location', {lat: places.geometry.location.lat(), lng:places.geometry.location.lng()});
          setValue('address', places.formatted_address);
      }
    };

    const handleBlur = e => {
        setValue('address', e.target.value);
    }

    const handleChange = e => {
        setValue('location', null);
    }

    return (
        <div className={className}>
            <label className={`label ${registerOptions['required'] ? 'required' : ''}`}>{label}</label>
            <div className="control u-margin-bottom-small">
                <PlaceSearchBox 
                    onPlaceChanged={handlePlaceChanged} 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={address}
                    placeholder={placeholder} />
            </div>
            {info &&  <p className="help is-success">{info}</p>}
            <FieldError errors={errors[name]} customErrorMessage={customErrorMessage} />
            <DisplayLocation location={location} style={{height: '32rem'}}/>
        </div>
    )
}
