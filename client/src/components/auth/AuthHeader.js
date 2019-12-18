import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../actions/authActions';
import Image from '../common/Image';

function AuthHeader(props) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);

    const renderLinks = (user) => {
        if (user) {
            return (
                <Fragment>
                    {
                        user.profile.avatar && user.profile.avatar.image_id
                            ? (
                                <figure className="image">
                                    <Image src={user.profile.avatar.image_url} thumb={true} alt={user.name} />
                                </figure>
                            )
                            : null
                    }
                    <span className="authHeader__name">{user.name}</span>
                    <button type="button" className="button is-info is-small" onClick={() => {dispatch(signOut())}}>ログアウト</button>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Link to="/signin">ログイン</Link>/
                    <Link to="/signup">新規登録</Link>
                </Fragment>
            )
        }
    }

    return (
        <div className="authHeader">
            {renderLinks(currentUser)}
        </div>
    )
}

export default AuthHeader;
