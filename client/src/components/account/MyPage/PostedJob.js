import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../../utils/alert';
import errorToStr from '../../../utils/errorToStr';
import client from '../../../utils/client';
import Spinner from '../../common/Spinner';
import PostedJobList from './PostedJob/PostedJobList';

const PostedJob = (props) => {
    const user = useSelector(state => state.user.currentUser);

    const [postedJobList, setPostedJobList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        window.scrollTo(0, 0);

        setLoading(true);

        client.get('user/jobs').then(response => {
            setPostedJobList(response.data);
        }).catch(error => {
            Alert.error(errorToStr(error));
        })
            .finally(() => {
                setLoading(false);
            })
    }, [user])

    const handleDeleteJob = id => {
        Alert.confirm('この広告を削除しますか？')
            .then((result) => {
                if (result.value) {
                    // dispatch(deleteJob(id));
                    setLoading(true);
                    client.delete('job/' + id).then(response => {
                        Alert.success("求人広告を削除しました");
                        setPostedJobList(postedJobList.filter(postedJob => postedJob._id !== id));
                    }).catch(error => {
                        Alert.error(errorToStr(error));
                    })
                        .finally(() => {
                            setLoading(false);
                        })
                }
            })
    }

    const handleActivateJob = id => {
        Alert.confirm('募集を再開しますか？')
            .then((result) => {
                if (result.value) {
                    // dispatch(activateJob(id));
                    setLoading(true);
                    client.put('job/' + id, { is_active: true }).then(response => {
                        Alert.success("募集を再開しました");
                        _changeJobStatus(id, true);
                        // history.push('/mypage/postedjoblist');
                    }).catch(error => {
                        Alert.error(errorToStr(error));
                    })
                        .finally(() => {
                            setLoading(false);
                        })
                }
            })
    }

    const handleDeactivateJob = id => {
        Alert.confirm('募集を停止しますか？')
            .then((result) => {
                if (result.value) {
                    // dispatch(deactivateJob(id));
                    setLoading(true);
                    client.put('job/' + id, { is_active: false }).then(response => {
                        Alert.success("募集を停止しました");
                        _changeJobStatus(id, false);
                        // history.push('/mypage/postedjoblist');
                    }).catch(error => {
                        Alert.error(errorToStr(error));
                    })
                        .finally(() => {
                            setLoading(false);
                        })
                }
            })
    }

    const _changeJobStatus = (id, status) => {
        let temp = [...postedJobList];
        let index = temp.findIndex(job => job._id === id);
        temp[index].is_active = status;
        setPostedJobList(temp);
    }

    const JOB_CREATION_LIMIT = 3;

    return (
        <div className="container">
            <h1 className="heading">求人広告リスト</h1>
            {
                postedJobList.length >= JOB_CREATION_LIMIT
                    ? (
                        <div className="control has-text-centered">
                            <button to="/jobs/edit" className="button is-primary is-medium" disabled>
                                <span className="icon"><i className="fas fa-plus"></i></span>
                                <span>求人広告を作成する</span>
                            </button>
                            <p className="has-text-danger">※1つのアカウントで作成できる広告は{JOB_CREATION_LIMIT}つまでです</p>
                        </div>
                    )
                    : (
                        <div className="control has-text-centered">
                            <Link to="/jobs/edit" className="button is-primary is-medium" >
                                <span className="icon"><i className="fas fa-plus"></i></span>
                                <span>求人広告を作成する</span>
                            </Link>
                        </div>
                    )
            }
            {
                loading
                    ? <Spinner />
                    : <PostedJobList
                        onActivate={handleActivateJob}
                        onDeactivate={handleDeactivateJob}
                        onDelete={handleDeleteJob}
                        jobList={postedJobList}
                    />
            }
        </div>
    )
}

export default PostedJob;
