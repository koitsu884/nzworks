import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Alert from '../../utils/alert';
import { getJobDetails } from '../../actions/jobActions';
import { saveJob, refleshSavedJob } from '../../actions/userActions';
import TagCloud from '../common/TagCloud';
import JobDetailCompanyInfo from './JobDetail/JobDetailCompanyInfo';
import JobDetailLocation from './JobDetail/JobDetailLocation';
import CoverMessage from '../common/CoverMessage';
import PageLoading from '../common/PageLoading';

function JobDetail(props) {
    const dispatch = useDispatch();
    const jobDetails = useSelector(state => state.job.jobDetails);
    const user = useSelector(state => state.user.currentUser);
    const savedJobList = useSelector(state => state.user.savedJobList);
    const jobId = props.match.params.id;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        dispatch(getJobDetails(jobId));
    }, [dispatch, jobId])

    useEffect(() => {
        if (savedJobList && savedJobList.findIndex(savedJob => savedJob.job === jobId) >= 0) {
            dispatch(refleshSavedJob(jobId))
        }
    }, [dispatch, savedJobList, jobId])

    const handleSaveJob = jobId => {
        dispatch(saveJob(user._id, jobId));
        Alert.success('保存リストに追加しました');
    }

    const renderApplyButton = (jobId, savedJob) => {
        if (savedJob && savedJob.applied) {
            return <button type="button" className="button is-success is-large u-margin-small" disabled>応募済み</button>
        }
        else {
            return <Link to={`/jobs/${jobId}/apply`} className="button is-success is-large u-margin-small">応募する</Link>
        }
    }

    const renderTools = (job) => {
        // const { user } = props;

        if (!user) {
            return <div><strong>求人応募フォームを利用するにはログインが必要です</strong></div>
        }

        if (user.profile.user_type === 'Business') {
            if (user._id === job.user._id) {
                return (
                    <Link to={`/jobs/edit/${job._id}`} className="button is-primary is-large">編集する</Link>
                )
            }
        }
        else {
            let savedJob = savedJobList ? savedJobList.find(savedJob => savedJob.job === job._id) : [];
            return (
                <Fragment>
                    {
                        savedJob
                            ? <button type="button" className="button is-warning is-large u-margin-small" disabled>保存済み</button>
                            : <button type="button" className="button is-warning is-large u-margin-small" onClick={() => handleSaveJob(job._id)}>保存リストに追加</button>
                    }
                    {
                        job.email
                            ? renderApplyButton(job._id, savedJob)
                            : null
                    }
                    {
                        job.phone
                            ? <a className="button is-info is-large u-margin-small" href={`tel:${job.phone}`} alt="phone">電話する</a>
                            : null
                    }
                </Fragment>
            );
        }
        return null;
    }

    const renderJobDetail = job => {
        if (!job) return <p>No data</p>;

        return (
            <Fragment>
                <h1>{job.title}</h1>
                <div className="container jobDetail__description">
                    <h2>詳細</h2>
                    <div className="u-flex-responsive">
                        <div className="u-flex-grow u-margin-small">
                            <div className="u-text-wrap u-margin-top-medium u-margin-bottom-medium">
                                {job.details}
                            </div>
                            {
                                job.address ?
                                    (
                                        <div className="jobDetail__address">
                                            <h3>住所</h3>
                                            <JobDetailLocation address={job.address} jobLocation={job.location} />
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                        <div className="u-margin-small">
                            <div className="jobDetail__info u-margin-bottom-medium">
                                <div className="jobDetail__info__item">
                                    <h5>エリア:</h5>
                                    <span className="tag is-primary is-medium">{job.area ? job.area.name : 'エリア未設定'}</span>
                                </div>
                                <div className="jobDetail__info__item">
                                    <h5>職種:</h5>
                                    <span className="tag is-warning  is-medium">{job.jobCategory}</span>
                                </div>
                                {
                                    job.workType
                                        ? (
                                            <div className="jobDetail__info__item">
                                                <h5>雇用タイプ:</h5>
                                                <span className="tag is-success is-light is-medium">{job.workType}</span>
                                            </div>
                                        )
                                        : null
                                }
                                <div className="jobDetail__info__item">
                                    <h5>必要英語力:</h5>
                                    <span className="tag is-warning is-light is-medium">{job.englishLevel ? job.englishLevel : '不問'}</span>
                                </div>
                            </div>
                            <h4>タグ</h4>
                            <TagCloud tags={job.tags} className="are-medium u-margin-bottom-medium" />
                            <JobDetailCompanyInfo user={job.user} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <hr />
                    {
                        renderTools(job)
                    }
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <PageLoading animationClass="fade" />


            <section className='jobDetail mainSection'>
                {renderJobDetail(jobDetails)}
                {jobDetails && !jobDetails.is_active ? <CoverMessage message="この求人は現在募集していません" /> : null}
            </section>
        </Fragment>
    )
}

export default JobDetail;
