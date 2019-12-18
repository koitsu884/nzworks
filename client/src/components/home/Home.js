import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLatestJobList } from '../../actions/homeActions';

import JobList from '../job/JobList';
import Spinner from '../common/Spinner';
import LatestJobList from './LatestJobList';

function Home(props) {
    const dispatch = useDispatch();
    const latestJobList = useSelector(state => state.home.latestJobList);

    useEffect(() => {
        dispatch(getLatestJobList());
    }, [dispatch]);

    return (
        <div className="home">
            <header className="home__header">
                <div className="home__header__container">
                    <h1><span>ニュージーランドの</span><span>求人情報ウェブサイト</span></h1>
                    <p>ニュージーワークスはニュージーランド在住日本人の為の求人情報サイトです。</p>
                    <p>※現在求人情報を募集しております。</p>
                    <br />
                    <div><Link to="/signup" className="button is-primary is-large">アカウント登録（無料）</Link></div>
                </div>
            </header>
            <section>
                <h2 className="heading">最近の投稿</h2>
                <div className="container">
                    <LatestJobList jobList={latestJobList} />
                </div>
            </section>
            {/* <section>
                <h2 className="heading">エリアから探す</h2>
            </section>
            <section>
                <h2 className="heading">職種から探す</h2>
            </section>
            <section>
                <h2 className="heading">様々な条件から探す</h2>
                <button type="button is-large is-primary">検索ページへ</button>
            </section> */}
        </div>
    )
}

export default Home;