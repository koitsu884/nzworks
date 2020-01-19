import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getThreadList } from '../../actions/threadActions';
import Spinner from '../common/Spinner';
import ThreadList from './ThreadList';

const ThreadHome = () => {
    const dispatch = useDispatch();
    const [created, setCreated] = useState(false);
    const threadList = useSelector(state => state.thread.threadList);
    const user = useSelector(state => state.user.currentUser);
    const loading = useSelector(state => state.common.loading);

    useEffect(() => {
        dispatch(getThreadList());
    }, [dispatch])

    useEffect(() => {
        if (threadList && user) {
            if( threadList.findIndex(thread => thread.user._id === user._id) >= 0){
                setCreated(true);
            }
            else{
                setCreated(false);
            }
        }
    }, [threadList, user, setCreated])

    return (
        <div className="container">
            <h1 className="u-margin-small heading">期間限定情報</h1>
            <div className="infoBox">
                <p>企業アカウント、求職アカウント共にご利用可能な簡易情報投稿機能です。</p>
                <p>全ての投稿は7日を経過すると自動的に消去されます。</p>
                <br/>
                <p>短期・単発の求人、知人の紹介での求人等『企業プロフィールを作るほどでは無いけど情報を広げたい』ような情報がある場合にはこちらに投稿ください。</p>
                <p>また既に出している求人広告を改めて告知する時や、求職仲間を探す時（例えばシーズナルワークでカーシェアできる人を探す等）等にもお使い頂けます。</p>
                <br/>
                <p className="has-text-success">※この機能は試験段階で、事前告知無く仕様変更する可能性があります</p>
                <p className="has-text-success">※新しい投稿を作成した際、ニュージーワークス専用ツイッターの方にも情報が自動的にツイートされます。</p>
                <p className="has-text-success">※今現在は特に書き込む内容に制限はございませんが、利用規約に反するような書き込みがあった場合には告知なく削除させて頂く事もございます。</p>
            </div>
           {
                !user || created ? null 
                : (
                    <div className="has-text-center">
                        <Link to="/thread/edit" className="button is-medium u-margin-medium is-primary">新しい情報を投稿する</Link>
                    </div>
                )
            }
            {
                loading ? <Spinner cover={true} /> : <ThreadList threads={threadList} />
            }
        </div>
    )
}

export default ThreadHome
