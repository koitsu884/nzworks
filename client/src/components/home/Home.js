import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLatestJobList, getLatestFeedList } from '../../actions/homeActions';

import LatestJobList from './LatestJobList';
import SeasonalWorkInfo from './SeasonalWorkInfo';

function Home(props) {
    const dispatch = useDispatch();
    const latestJobList = useSelector(state => state.home.latestJobList);

    useEffect(() => {
        dispatch(getLatestJobList());
        dispatch(getLatestFeedList());
    }, [dispatch]);

    return (
        <div className="home">
            <Helmet>
                <title>ニュージーワークス</title>
                <meta name="description" content="ニュージーランドの日本人向け求人情報を投稿・検索できます。経営者の方、永住者、ワーキングホリデーメーカーいずれの方も是非ご利用ください！" />
            </Helmet>
            <header className="home__header">
                <div className="home__header__container">
                    <h1><span>ニュージーランドの</span><span>求人情報ウェブサイト</span></h1>
                    <p>ニュージーワークスはニュージーランド在住日本人の為の求人情報サイトです。</p>
                    <p>※現在求人情報を募集しております。</p>
                    <br />
                    <div><Link to="/signup" className="button is-primary is-large">アカウント登録（無料）</Link></div>
                </div>
            </header>
            <div className="home__content">
                <div className="home__content__main">
                    <section>
                        <div className="infoBox u-margin-small">
                            <h4>更新情報 (19/1/2020)</h4>
                            <p>短期情報を投稿できる機能を試験的に実装しました！</p>
                            <p>ナビメニューの『短期情報板』から投稿・編集ページへ移動できます。</p>
                            <br />
                            <p className="has-text-danger">※投稿するにはログインが必要です</p>
                        </div>
                    </section>
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
                <div className="home__content__side">
                    <SeasonalWorkInfo />
                </div>
            </div>
        </div>
    )
}

export default Home;