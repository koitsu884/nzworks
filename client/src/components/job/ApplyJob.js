import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import history from '../../history';
import { applyJob, saveJob } from '../../actions/userActions';
import client from '../../utils/client';
import useModal from '../hooks/useModal';
import ApplyForm from './ApplyForm';
import ApplyPreview from './ApplyJob/ApplyPreview';
import Alert from '../../utils/alert';
import Spinner from '../common/Spinner';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        maxHeight: '90vh',
        width: '90%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex: 100
    }
};

const ApplyJob = props => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(null);
    const [sending, setSending] = useState(false);

    const [openModal, closeModal, modalIsOpen] = useModal();

    let jobId = props.match.params.id;
    const jobDetails = useSelector(state => state.job.jobDetails);
    const user = useSelector(state => state.user.currentUser);
    const savedJobList = useSelector(state => state.user.savedJobList);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleSubmit = fd => {
        setFormData(fd);
        openModal();
    }

    const sendEmail = () => {
        let fd = new FormData();
        for (var key in formData) {
            if (key === 'attachments') {
                for (const file of formData[key]) {
                    fd.append('attachment', file, file.name);
                }
            } else {
                fd.append(key, formData[key])
            }
        }

        setSending(true);

        client.post(
            `job/${jobDetails._id}/mail`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then(res => {
                Alert.success("メールを送信しました");
                if(savedJobList.findIndex(savedJob => savedJob.job === jobId) >= 0){
                    dispatch(applyJob(user._id, jobId));
                }
                else {
                    dispatch(saveJob(user._id, jobId, true));
                }
                history.push('/jobs/' + jobId);
            })
            .catch(error => {
                console.log(error);
                setSending(false);
            })
    }

    if (!jobDetails || jobDetails._id !== jobId) {
        console.log("Invalid params");
        history.push('/');
        return '';
    }

    return (
        <div className="container">
            <h1 className="u-margin-bottom-medium">求人に応募する</h1>
            <h2>求人詳細</h2>
            <div className="has-background-light u-margin-bottom-medium">
                <h3>{jobDetails.title}</h3>
                <div>
                    {jobDetails.details}
                </div>
            </div>
            <h2>メールフォーム</h2>
            <ApplyForm job={jobDetails} onSubmit={handleSubmit} email={user.email} title={`RE:${jobDetails.title}`} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <div>以下の内容でメールを送信します。よろしいですか？</div>
                <hr />
                <ApplyPreview formData={formData} />
                <hr />
                {
                    sending ? <Spinner /> : (
                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" onClick={sendEmail} className="button is-link">送信</button>
                            </div>
                            <div className="control">
                                <button type="button" className="button is-link is-light" onClick={closeModal}>キャンセル</button>
                            </div>
                        </div>
                    )
                }
            </Modal>
        </div>
    )
}

export default ApplyJob
