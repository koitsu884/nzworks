import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { updateProfile } from '../../../actions/userActions';
import Alert from '../../../utils/alert';
import errorToStr from '../../../utils/errorToStr';
import client from '../../../utils/client';
import Spinner from '../../common/Spinner';
import SavedJobList from './SavedJob/SavedJobList';

const SavedJob = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    const [appliedJobList, setAppliedJobList] = useState([]);
    const [savedJobList, setSavedJobList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        window.scrollTo(0, 0);
        setLoading(true);

        client.get('user/jobs', { params: {type: 'saved'} }).then(response => {
            const appliedJobIdList = [...user.profile.appliedJobs];
            const savedJobListFromResponse = response.data;
            let savedJobArray = [];
            let appliedJobArray = [];
            savedJobListFromResponse.forEach(savedJob => {
                appliedJobIdList.includes(savedJob._id) 
                ? appliedJobArray.push(savedJob)
                : savedJobArray.push(savedJob);
            });
            setAppliedJobList(appliedJobArray);
            setSavedJobList(savedJobArray);
        }).catch(error => {
            Alert.error(errorToStr(error));
        })
        .finally(() => {
            setLoading(false);
        })
    }, [user])

    const handleRemoveItem = id => {
        Alert.confirm('この求人を保存リストから削除しますか？')
            .then((result) => {
                if (result.value) {
                    const { profile } = user;

                    let fd = {
                        user_type: 'Personal',
                        savedJobs: profile.savedJobs.filter(savedJobId => savedJobId !== id),
                        appliedJobs: profile.appliedJobs.filter(appliedJobId => appliedJobId !== id)
                    };
                    dispatch(updateProfile(fd));
                }
            })
    }

    return (
        <div className="container">
            <h1>保存済み求人広告リスト</h1>
            <Tabs>
                <div className="tabs is-boxed control">
                    <TabList >
                        <Tab selectedClassName="is-active"><a href="# ">保存リスト</a></Tab>
                        <Tab selectedClassName="is-active"><a href="# ">応募済み</a></Tab>
                    </TabList>
                </div>
                <TabPanel>
                    {
                        loading
                            ? <Spinner />
                            : <SavedJobList onClickDelete={(id) => handleRemoveItem(id)} jobList={savedJobList} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        loading
                            ? <Spinner />
                            : <SavedJobList onClickDelete={(id) => handleRemoveItem(id)} jobList={appliedJobList} applied={true} />
                    }
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default SavedJob;
