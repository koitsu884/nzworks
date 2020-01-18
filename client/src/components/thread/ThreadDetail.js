import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getThread, getThreadComment } from '../../actions/threadActions';

import Image from '../common/Image';
import Spinner from '../common/Spinner';
import JobDetailCompanyInfo from '../job/JobDetail/JobDetailCompanyInfo';
import ThreadCommentArea from './ThreadCommentArea';

const ThreadDetail = (props) => {
    const dispatch = useDispatch();
    const threadId = props.match.params.id;
    const currentUser = useSelector(state => state.user.currentUser);
    const threadDetail = useSelector(state => state.thread.selectedThread);
    const loading = useSelector(state => state.common.loading);

    useEffect(() => {
        if (threadId) {
            dispatch(getThread(threadId));
        }
        const interval = setInterval(() => {
            if (threadId) {
                dispatch(getThreadComment(threadId));
            }
        }, 60000);
        return () => clearInterval(interval);
      }, [threadId, dispatch]);

    const renderContent = () => {
        if (loading) return <div className="threadDetail"><Spinner cover={true} /></div>
        if (!threadDetail) return <div>No data</div>;

        return (
            <div className="threadDetail">
                <h1 className="heading margin-bottom-medium">{threadDetail.title}</h1>
                <div className="u-flex-responsive u-space-around u-margin-bottom-medium">
                    {
                        threadDetail.mainImage ? (
                            <div className="threadDetail__image u-margin-small">
                                <Image src={threadDetail.mainImage.image_url} />
                            </div>
                        ) : null
                    }
                    <div className="threadDetail__userInfo">
                        <JobDetailCompanyInfo user={threadDetail.user} />
                    </div>

                </div>
                <section>
                    <h2 className="heading--label-primary">詳細</h2>
                    <div className="u-text-wrap">
                        {threadDetail.details}
                    </div>
                    {/* <button className="button is-success u-margin-medium">
                        投稿者にメールを送る
                    </button> */}
                </section>
                <section>
                    <ThreadCommentArea 
                        threadId={threadDetail._id} 
                        commentList={threadDetail.comments} 
                        threadOwnerId={threadDetail.user._id}
                        currentUserId={currentUser ? currentUser._id : null}
                    />
                </section>
            </div>
        )
    }

    return (
        <div className="container">
            {renderContent()}
        </div>
    )
}

export default ThreadDetail
