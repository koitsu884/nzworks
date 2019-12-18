import React from 'react'
import { formErrorMessage } from '../../utils/formErrorMessage';

const FieldError = ({errors, customErrorMessage = null}) => {
    if(!errors) return null;

    return (
        <p className="help is-danger">{formErrorMessage(errors, customErrorMessage)}</p>
    )
}

export default FieldError;
