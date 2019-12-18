import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import BusinessProfile from '../account/BusinessProfile';
import Profile from '../account/Profile';

import history from '../../history';
import Spinner from '../common/Spinner';

function MyPage(props) {
    const user = useSelector(state => state.user.currentUser);
    const loading = useSelector(state => state.common.loading);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if(!user){
        history.push('/signup');
        return null;
    }

    return (
        <div className="container mypage">
            <h1 className="u-margin-bottom-medium">マイページ</h1>
            {
                user.profile.user_type === "Business" ? <BusinessProfile user={user} /> : <Profile user={user} />
            }
            {
                loading? <Spinner cover={true} /> : null
            }
        </div>
    )
}


export default MyPage;