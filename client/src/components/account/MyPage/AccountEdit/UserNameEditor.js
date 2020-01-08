import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from '../../../../actions/userActions';
import client from '../../../../utils/client';

const UserNameEditor = () => {
    const userName = useSelector(state => state.user.currentUser.name);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setName(userName);
    }, [userName, setName])

    const onChange = e => {
        setName( e.target.value );
    }

    const onEdit = () => {
        setEditing(true);
    }

    const onCancel = () => {
        setName(userName);
        setError(null);
        setEditing(false);
    }

    const onUpdate = () => {
        if(!name || name.length < 3){
            setError("３文字以上入力してください");
            return;
        }
        if(name.length >= 50 ){
            setError("50文字以下で入力してください");
            return;
        }

        setEditing(false);
        
        client.patch('user', {name: name})
            .then(res => {
                setError(null);
                dispatch(setUserName(name));
            })
            .catch(error => {
               console.log(error);
               setError("Something went wrong");
            })
    }

    return (
        <div className="editSection">
            <label className='label'>ユーザー名</label>
            <div className="field">
                <div>
                    <input className="input u-margin-bottom-small" type="text" value={name} onChange={onChange} disabled={editing ? '' : 'disabled'} />
                    {
                        editing 
                        ? (
                            <div className="buttons">
                                <button className="button is-warning" onClick={onUpdate} type="button">更新</button> 
                                <button className="button is-danger" onClick={onCancel} type="button">キャンセル</button> 
                            </div>
                        )
                        : <button className="button is-primary" onClick={onEdit} type="button">編集</button>
                    }
                </div>
                {
                    error ? <p className="has-text-danger">{error}</p> : null
                }
            </div>
        </div>
    )
}

export default UserNameEditor
