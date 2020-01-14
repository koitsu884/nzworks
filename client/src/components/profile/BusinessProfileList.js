import React, { useState, useEffect, Fragment } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { getUserList, getLatestUserList } from '../../actions/profileActions';

import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import Icon from '../common/Icon';
import BusinessProfileCard from './BusinessProfileCard';
import BusinessProfileDetail from './BusinessProfileDetail';
import BusinessProfileCardMin from './BusinessProfileCardMin';

import AdNZWorksLarge from '../common/ads/AdNZWorksLarge';
import AdNZCafemap from '../common/ads/AdNZCafemap';

Modal.setAppElement("#root")

const DEFAULT_PAGE_SIZE = 12;

const BusinessProfileList = () => {
    const profileList = useSelector(state => state.profile.profileList);
    const latestProfileList = useSelector(state => state.profile.latestProfileList);
    const itemCount = useSelector(state => state.profile.itemCount);
    const loading = useSelector(state => state.common.loading);

    const adCount = 3 - (profileList.length % 3);

    const renderAds = () => {
        switch (adCount) {
            case 2:
                return (
                    <Fragment>
                        <div className="u-margin-small businessProfileCard">
                            <AdNZWorksLarge />
                        </div>
                        <div className="u-margin-small businessProfileCard">
                            <AdNZCafemap />
                        </div>
                    </Fragment>
                )
            case 1:
                return (
                    <div className="u-margin-small businessProfileCard">
                        <AdNZWorksLarge />
                    </div>
                )
            default:
                return null;
        }
    }

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
        else {
            setModalOpen(false);
        }
    }, [selectedUser, setModalOpen])

    const handlePageClick = selectedPage => {
        // dispatch(changePage(selectedPage));
        dispatch(getUserList(selectedPage, DEFAULT_PAGE_SIZE));
    }

    const handleCardClick = user => {
        if (user.profile.introduction) {
            setUser(user);
        }
    }

    const renderProfileList = () => {
        if (!profileList) return null;
        // let dummyCount = 3 - (profileList.length % 3);


        return profileList.map(user => {
            return (
                <div key={user._id} className={`u-margin-small ${user.profile.introduction ? 'hover-basic' : ''}`} onClick={() => handleCardClick(user)}>
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
                        {
                            renderAds()
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
                className='modalContent'
                style={{ overlay: { zIndex: 1000 } }}
            >
                {
                    selectedUser ? (
                        <div>
                            <BusinessProfileDetail user={selectedUser} />
                            <div className="modalCloseButton">
                                <Icon className="fas fa-3x" iconClassName="fa-times-circle" onClick={() => setUser(null)} />
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
