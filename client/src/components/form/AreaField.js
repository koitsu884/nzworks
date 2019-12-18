import React, {useEffect} from 'react';
import { useFormContext } from 'react-hook-form';
import AreaSelect from '../common/AreaSelect';
import FieldError from './FieldError';

const AreaField = ({
    name,
    className,
    label,
    info,
}) => {
    const { register, errors, setValue, watch } = useFormContext();

    const selectedAreaId = watch(name);

    useEffect(() => {
        register({ 'name': `${name}`,  type: 'custom' });
    }, [register, name])

    const handleAreaChange = areaId => {
        setValue(name, areaId);
    }

    return (
        <div className={`areaSelectField ${className}`}>
            <label className="label">{label}</label>
            <AreaSelect onChange={handleAreaChange} value={selectedAreaId} emptyValue='未設定' />
            {info && <p className="help is-success">{info}</p>}
            <FieldError errors={errors[name]} />
        </div>
    )
}

export default AreaField
