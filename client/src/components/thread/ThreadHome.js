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
            if( threadList.findIndex(thread => thread.user === user._id) >= 0){
                setCreated(true);
            }
        }
    }, [threadList, user, setCreated])

    return (
        <div className="container">
            <h1 className="u-margin-small">期間限定情報</h1>
            <p className="has-text-danger u-margin-medium">※書き込みは7日を経過すると自動的に消去されます</p>
            {
                created ? null 
                : (
                    <div className="has-text-center">
                        <Link to="/thread/edit" className="button is-medium u-margin-medium is-primary">新しいスレッドを作成する</Link>
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
