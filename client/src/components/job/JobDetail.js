import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getJobDetails } from '../../actions/jobActions';
import { saveJob, saveAppliedJob } from '../../actions/userActions';
import Modal from 'react-modal';
import ContactForm from './ContactForm';
import TagCloud from '../common/TagCloud';
import JobDetailCompanyInfo from './JobDetail/JobDetailCompanyInfo';
import JobDetailLocation from './JobDetail/JobDetailLocation';

Modal.setAppElement('#root')

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex: 100
    }
};

function JobDetail(props) {
    const dispatch = useDispatch();
    const jobDetails = useSelector(state => state.job.jobDetails);
    const user = useSelector(state => state.user.currentUser);
    const jobId = props.match.params.id;

    useEffect(() => {
        dispatch(getJobDetails(jobId));
    }, [dispatch, jobId])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleSaveJob = jobId => {
        dispatch(saveJob(jobId));
    }

    //!!!!! For Test !!!!!!
    const handleApplyJob = jobId => {
        dispatch(saveAppliedJob(jobId));
    }

    const renderTools = (job) => {
        // const { user } = props;

        if (!user) {
            return null;
        }

        if (user.profile.user_type === 'Business') {
            if (user._id === job.user._id) {
                return (
                    <Link to={`/jobs/edit/${job._id}`} className="button is-primary is-large">編集する</Link>
                )
            }
        }
        else {
            return (
                <Fragment>
                    {
                        user.profile.savedJobs.length > 0 && user.profile.savedJobs.includes(job._id)
                        ? <button type="button" className="button is-warning is-large u-margin-small" disabled>保存済み</button> 
                        : <button type="button" className="button is-warning is-large u-margin-small" onClick={() => handleSaveJob(job._id)}>保存リストに追加</button>
                    }
                    {
                        user.profile.appliedJobs.length > 0 && user.profile.appliedJobs.includes(job._id)
                        ? <button type="button" className="button is-success is-large u-margin-small" disabled>応募済み</button>
                        : <button type="button" className="button is-success is-large u-margin-small" onClick={() => handleApplyJob(job._id)}>応募する</button>
                    }
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={modalStyles}
                    >
                        <ContactForm job={job} onCancelClick={closeModal} />
                    </Modal>
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
                                <div className="jobDetail__info__item">
                                    <h5>雇用タイプ:</h5>
                                    <span className="tag is-success  is-medium">{job.workType}</span>
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
        <section className="jobDetail mainSection">
            {renderJobDetail(jobDetails)}
        </section>
    )
}

export default JobDetail;
