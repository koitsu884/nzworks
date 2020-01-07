import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { unsaveJob } from '../../../actions/userActions';
import Alert from '../../../utils/alert';
import Spinner from '../../common/Spinner';
import SavedJobList from './SavedJob/SavedJobList';

const SavedJob = (props) => {
    const dispatch = useDispatch();
    const savedJobList = useSelector(state => state.user.savedJobList);

    useEffect(() => {
        if (!savedJobList) return;
        window.scrollTo(0, 0);
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
            <h1 className="heading">保存済み求人広告リスト</h1>
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
