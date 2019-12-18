export const formErrorMessage = (error, customErrorMessage) => {
    let message;
    if (error.type === 'required')
        message = "必須フィールドです"
    else if (error.type === 'maxLength')
        message = "入力値が長すぎます"
    else if (error.type === 'minLength')
        message = "入力値が短すぎます"
    else
        message = customErrorMessage ? customErrorMessage : "入力値が不正です";

    return message;
};