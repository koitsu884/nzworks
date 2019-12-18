import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../actions/authActions';

function Oauth(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [])

    return (
        <div>
            <h1>Oauth</h1>
            <p>Successfully logged in</p>
        </div>
    )
}

export default Oauth;