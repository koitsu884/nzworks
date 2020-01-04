import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../actions/authActions';
import history from '../../history';
import client from '../../utils/client';
import Alert from '../../utils/alert';
import errorToStr from '../../utils/errorToStr';

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
            client.get('auth/verify', {params:{token: token}})
            .then(res => {
                Alert.success("アカウントを認証しました")
                dispatch(getCurrentUser());
                history.push('/');
            })
            .catch(error => {
                Alert.error(errorToStr(error));
                history.push('/');
            })
        }
    }, [props, dispatch])


    return (
        <div className="container">
         <p>アカウントを認証しています</p>
        </div>
    )
}

export default VerifyEmail;