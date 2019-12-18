import React from 'react'
import { useFormContext } from 'react-hook-form';
import FieldError from './FieldError';

export default function TextField({
    name,
    className,
    placeholder,
    label,
    info,
    type,
    onChange,
    disabled,
    customErrorMessage,
    cols,
    rows,
    registerOptions={}
}) {
    const{ register, errors } = useFormContext();
    return (
        <div className={className}>
            <label className={`label ${registerOptions['required'] ? 'required' : ''}`}>{label}</label>
            <div className="control">
                {
                    type==='textarea' 
                    ? (
                        <textarea
                            className="textarea"
                            name={name}
                            onChange={onChange}
                            disabled={disabled}
                            ref={register(registerOptions)}
                            cols={cols}
                            rows={rows}
                        />
                    )
                    : (
                        <input className="input" 
                            type={type} 
                            placeholder={placeholder}
                            name={name}
                            onChange={onChange}
                            disabled={disabled}
                            ref={register(registerOptions)}
                        />
                    )
                }
            </div>
            {info &&  <p className="help is-success">{info}</p>}
            <FieldError errors={errors[name]} customErrorMessage={customErrorMessage} />
        </div>
    )
}
