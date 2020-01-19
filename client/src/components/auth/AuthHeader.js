import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../actions/authActions';
import Image from '../common/Image';
import Icon from '../common/Icon';
import history from '../../history';
import Alert from '../../utils/alert';
import MenuIcon from '../common/Icons/MenuIcon';

function AuthHeader(props) {
    const ref = useRef();
    const dispatch = useDispatch();
    const [menuActive, setMenuActive] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);

    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)){
            setMenuActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    })

    const handleLogout = () => {
        dispatch(signOut());
        setMenuActive(false);
        history.push('/');
        Alert.success("ログアウトしました");
    }

    const renderMenu = user => {
        return (
            <ul>
                {
                    user.is_admin
                        ? <Link to='/admin' ><li>Admin</li></Link>
                        : null
                }

                <Link to="/mypage"><li>マイページ</li></Link>
                <li onClick={handleLogout}>ログアウト</li>
            </ul>
        )
    }

    // const renderBusinessMenu = user => {
    //     return renderMenu(user);
    // }

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
                    <div className="u-margin-medium has-text-centered">
                        <MenuIcon className="is-medium fa-2x" onClick={() => setMenuActive(true)} />
                        <p className="has-text-info" style={{ fontSize: '1rem' }}><b>メニュー</b></p>
                    </div>
                    <div className={`authHeader__menu ${menuActive ? 'active' : ''}`}>
                        <div className="authHeader__menu__header"><div>メニュー</div><Icon iconClassName="fa-times icon--selectable" className="is-medium fa-lg" onClick={() => setMenuActive(false)} /></div>
                        {renderMenu(currentUser)}
                    </div>
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
        <div className="authHeader" ref={ref}>
            {renderLinks(currentUser)}
        </div>
    )
}

export default AuthHeader;
