import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../../actions/jobActions';
import JobList from '../JobList';
import Pagination from '../../common/Pagination';

function SearchResult(props) {
    const dispatch = useDispatch();
    const searchResult = useSelector(state => state.job.searchResult);
    const itemCount = useSelector(state => state.job.itemCount);
    const { pageSize } = props;

    const handlePageClick = selectedPage => {
        dispatch(changePage(selectedPage));
    }

    return (
        <div className="searchResult">
            <h3>検索結果</h3>
            <JobList jobList={searchResult} />
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