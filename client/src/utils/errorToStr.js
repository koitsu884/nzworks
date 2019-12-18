const errorToStr = errors => {
    return errors.response ? errors.response.data : errors;
}

export default errorToStr;