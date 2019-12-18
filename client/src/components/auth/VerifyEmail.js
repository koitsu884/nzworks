import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../actions/authActions';
import history from '../../history';
import client from '../../utils/client';
import Alert from '../../utils/alert';

function VerifyEmail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        let token = props.match.params.token;
        if(!token)
        {
            console.log('No token');
            history.push('/')
        }
        else{
            console.log('sending token to server...');
            client.get('auth/verify', {params:{token: token}})
            .then(res => {
                console.log('getting current user');
                dispatch(getCurrentUser());
                history.push('/');
            })
            .catch(error => {
                console.log(error);
                Alert.error("アカウント認証に失敗しました");
            })
        }
    }, [props, dispatch])


    return (
        <div>
         <p>アカウントを認証しています</p>
        </div>
    )
}

export default VerifyEmail;