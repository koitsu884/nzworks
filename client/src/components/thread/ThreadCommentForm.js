import React,{ useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm, { FormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, editComment } from '../../actions/threadActions';
import TextField from '../form/TextField';

const formStyle = {
    padding: '2rem' 
}

const ThreadCommentForm = ({ editMode, onCancel, onUpdate, threadId}) => {
    const dispatch = useDispatch();
    const selectedComment = useSelector(state => state.thread.selectedComment);
    const methods = useForm(); // initialise the hook
    const { setValue,  handleSubmit } = methods;

    useEffect(() => {
        if(editMode && selectedComment){
            setValue('comment', selectedComment.comment);
        }
        else {
            setValue('comment', '');
        }
    }, [selectedComment, editMode, setValue])

    const onSubmit = data => {
        if(editMode){
            dispatch(editComment(threadId, selectedComment._id, data.comment))
        }
        else {
            dispatch(addComment(threadId, data.comment));
        }
        onUpdate();
    }

    return (
        <FormContext {...methods} >
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="コメント（1000字以内）"
                    type="textarea"
                    rows={12}
                    name="comment"
                    registerOptions={{ required: true, maxLength: 1000 }}
                />
                <div className="field is-grouped u-margin-small">
                    <div className="control">
                    <button className="button is-inline is-link">{ editMode ? '更新' : '投稿する'}</button>
                    </div>
                    <div className="control">
                        <button type="button" className="button is-danger" onClick={onCancel}>キャンセル</button>
                    </div>
                </div>
            </form>
        </FormContext>
    )
}

ThreadCommentForm.propTypes = {
    threadId: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    comment: PropTypes.object,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func
}

export default ThreadCommentForm
