import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../../actions/jobActions';
import JobList from '../JobList';
import Pagination from '../../common/Pagination';

function SearchResult(props) {
    const dispatch = useDispatch();
    const searchResult = useSelector(state => state.job.searchResult);
    const savedJobList = useSelector(state => state.user.savedJobList);
    const itemCount = useSelector(state => state.job.itemCount);
    const { pageSize } = props;
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [appliedJobIds, setAppliedJobIds] = useState([]);

    useEffect(() => {   
        let idList = [];
        let appliedIdList = [];
        if(savedJobList){
            savedJobList.forEach(savedJob => {
                idList.push(savedJob.job._id);
                if(savedJob.applied){
                    appliedIdList.push(savedJob.job._id);
                }
            })
        }
        setSavedJobIds(idList);
        setAppliedJobIds(appliedIdList);
    }, [savedJobList])

    const handlePageClick = selectedPage => {
        dispatch(changePage(selectedPage));
    }

    const getSavedJobIds = () => {
        let idList = []
        if(savedJobList){
            savedJobList.forEach(savedJob => idList.push(savedJob.job._id));
        }
        return idList;
    }

    return (
        <div className="searchResult">
            <h3>検索結果</h3>
            <JobList jobList={searchResult} savedJobIds={savedJobIds} appliedJobIds={appliedJobIds} />
            <Pagination
                itemCount={itemCount}
                pageSize={pageSize}
                onPageChange={handlePageClick}
                className='bg-secondary-light'
            />
        </div>
    )
}

SearchResult.propTypes = {
    pageSize: PropTypes.number
}

export default SearchResult;