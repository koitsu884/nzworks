import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';

import TagSelector from '../common/TagSelector';
import FieldError from './FieldError';

export default function TagField({
    label,
    info,
    name,
    className,
    dataList,
}) {
    const { register, errors, setValue, watch } = useFormContext();
    const tagNameList = watch(name);

    useEffect(() => {
        register({ 'name': `${name}`,  type: 'custom' });
    }, [register, name])

    const handleTagChange = tags => {
        setValue(name, tags);
    }

    return (
        <div className={`tagSelectField ${className}`}>
            <label className="label">{label}</label>
            <TagSelector dataList={dataList} onChange={handleTagChange} values={tagNameList} />
            {info && <p className="help is-success">{info}</p>}
            <FieldError errors={errors[name]} />
        </div>
    )
}
