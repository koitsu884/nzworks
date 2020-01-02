import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { saveJob, unsaveJob } from '../../../actions/userActions';
import Alert from '../../../utils/alert';
import errorToStr from '../../../utils/errorToStr';
import client from '../../../utils/client';
import Spinner from '../../common/Spinner';
import SavedJobList from './SavedJob/SavedJobList';

const SavedJob = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const savedJobList = useSelector(state => state.user.savedJobList);

    // const [appliedJobList, setAppliedJobList] = useState([]);
    // const [savedJobList, setSavedJobList] = useState([]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!savedJobList) return;
        window.scrollTo(0, 0);
        // setLoading(true);

        // client.get('savedJobList/jobs', { params: {type: 'saved'} }).then(response => {
        //     const appliedJobIdList = [...user.profile.appliedJobs];
        //     const savedJobListFromResponse = response.data;
        //     let savedJobArray = [];
        //     let appliedJobArray = [];
        //     savedJobListFromResponse.forEach(savedJob => {
        //         appliedJobIdList.includes(savedJob._id) 
        //         ? appliedJobArray.push(savedJob)
        //         : savedJobArray.push(savedJob);
        //     });
        //     setAppliedJobList(appliedJobArray);
        //     setSavedJobList(savedJobArray);
        // }).catch(error => {
        //     Alert.error(errorToStr(error));
        // })
        // .finally(() => {
        //     setLoading(false);
        // })
    }, [savedJobList])

    const handleRemoveItem = id => {
        Alert.confirm('この求人を保存リストから削除しますか？')
            .then((result) => {
                if (result.value) {
                    dispatch(unsaveJob(id));
                }
            })
    }

    let savedJobsNotApplied = savedJobList ? savedJobList.filter(savedJob => !savedJob.applied) : [];
    let appliedJobs = savedJobList ? savedJobList.filter(savedJob => savedJob.applied) : [];

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
                        false
                            ? <Spinner />
                            : <SavedJobList onClickDelete={(id) => handleRemoveItem(id)} savedJobList={savedJobsNotApplied} />
                    }
                </TabPanel>
                <TabPanel>
                    {
                        false
                            ? <Spinner />
                            : <SavedJobList onClickDelete={(id) => handleRemoveItem(id)} savedJobList={appliedJobs} applied={true} />
                    }
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default SavedJob;
