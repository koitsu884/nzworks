import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Current page should be set to global state
function GlobalNav(props) {
    const currentUser = useSelector(state => state.user.currentUser);
    const userType = currentUser ? currentUser.profile.user_type : null;
    const renderLinks = () => {
        let linkContents = null;
        if (userType === 'Business') {
            linkContents = (
                <Fragment>
                    <Link to="/mypage/postedjoblist" className="globalNav__item">求人投稿・編集</Link>
                    {/* <Link to="/mypage" className="globalNav__item">マイページ</Link> */}
                </Fragment>
            )
        } else if (userType === 'Personal') {
            linkContents = (
                <Fragment>
                    <Link to="/mypage/savedjoblist" className="globalNav__item">保存リスト</Link>
                    {/* <Link to="/mypage" className="globalNav__item">マイページ</Link> */}
                </Fragment>
            )
        }


        return (
            <Fragment>
                <Link to="/jobs" className="globalNav__item">仕事検索</Link>
                <Link to="/profiles" className="globalNav__item">企業一覧</Link>
                <Link to="/thread" className="globalNav__item">短期情報板</Link>
                {linkContents}
            </Fragment>
        )
    }

    return (
        <nav className="globalNav">
            {renderLinks()}
        </nav>
    )
}

export default GlobalNav;