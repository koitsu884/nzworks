import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { getUserList, getLatestUserList } from '../../actions/profileActions';

import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import Icon from '../common/Icon';
import BusinessProfileCard from './BusinessProfileCard';
import BusinessProfileDetail from './BusinessProfileDetail';
import BusinessProfileCardMin from './BusinessProfileCardMin';

Modal.setAppElement("#root")

const DEFAULT_PAGE_SIZE = 12;

const BusinessProfileList = () => {
    const profileList = useSelector(state => state.profile.profileList);
    const latestProfileList = useSelector(state => state.profile.latestProfileList);
    const itemCount = useSelector(state => state.profile.itemCount);
    const loading = useSelector(state => state.common.loading);

    // const [result, setResult] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [selectedUser, setUser] = useState(null);
    const [modalIsOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    // const closeModal = () => {
    //     setModalOpen(false);
    // }

    useEffect(() => {
        dispatch(getUserList(1, DEFAULT_PAGE_SIZE));
        dispatch(getLatestUserList());
    }, [dispatch])

    useEffect(() => {
        if (selectedUser) {
            setModalOpen(true);
        }
        else{
            setModalOpen(false);
        }
    }, [selectedUser, setModalOpen])

    const handlePageClick = selectedPage => {
        // dispatch(changePage(selectedPage));
        dispatch(getUserList(selectedPage, DEFAULT_PAGE_SIZE));
    }

    const handleCardClick = user => {
        setUser(user);
    }

    const renderProfileList = () => {
        if (!profileList) return null;
        // let dummyCount = 3 - (profileList.length % 3);


        return profileList.map(user => {
            return (
                <div key={user._id} className="u-margin-small" onClick={() => handleCardClick(user)}>
                    <BusinessProfileCard user={user} />
                </div>
            )
        })
    }

    const renderLatestProfileList = () => {
        if (!latestProfileList) return null;

        return latestProfileList.map(user => {
            return (
                <div key={user._id} className="u-margin-small" onClick={() => handleCardClick(user)}>
                    <BusinessProfileCardMin user={user} />
                </div>
            )
        })
    }

    return (
        <div className="businessProfileList container">
            <h1 className="heading">登録企業・雇用者リスト</h1>
            <div className="u-flex-responsive">
                <div>
                    <div className="u-flex u-flex-wrap u-flex-justify" style={{ minHeight: '80vh' }}>
                        {
                            loading
                                ? <Spinner cover={true} />
                                : renderProfileList(profileList)
                        }
                    </div>
                    <Pagination
                        itemCount={itemCount}
                        pageSize={DEFAULT_PAGE_SIZE}
                        onPageChange={handlePageClick}
                        className='bg-secondary-light'
                    />
                </div>
                <div className="businessProfileList__side">
                    <h3>最近登録されたアカウント</h3>
                    <div>
                        {renderLatestProfileList()}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setUser(null)}
                style={{ overlay: { zIndex: 1000}, content: { padding: 0 } }}
            >
                {
                    selectedUser ? (
                        <div>
                            <BusinessProfileDetail user={selectedUser} />
                            <div style={{ position: 'fixed', top: '3rem', right: '3rem', zIndex: '2000' }}>
                                <Icon className="fas fa-3x" iconClassName="fa-times-circle"  onClick={()=>setUser(null)}  />
                            </div>
                         </div>
                    )
                        : <p>Loading...</p>
                }

            </Modal>
        </div>
    )
}

export default BusinessProfileList
