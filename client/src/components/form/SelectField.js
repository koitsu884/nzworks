import React from 'react'
import { useFormContext } from 'react-hook-form';

import FieldError from './FieldError';

export default function SelectField({
    label,
    info,
    name,
    className,
    dataList,
    disabled,
    customErrorMessage,
    emptyString = "",
    registerOptions = {}
}) {
    const { register, errors } = useFormContext();
    return (
        <div className={className}>
            <label className = {`label ${registerOptions['required'] ? 'required' : ''}`}>{label}</label>
            <div className="select">
                <select name={name} ref={register(registerOptions)} disabled={disabled}>
                    <option value="">{emptyString}</option>
                    {
                        dataList.map(data => {
                            return <option key={data} value={data}>{data}</option>
                        })
                    }
                </select>
            </div>
            {info && <p className="help is-success">{info}</p>}
            <FieldError errors={errors[name]} customErrorMessage={customErrorMessage} />
        </div>
    )
}
