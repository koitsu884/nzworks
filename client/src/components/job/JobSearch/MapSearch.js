import React from 'react';
import { useSelector } from 'react-redux';
import JobCardMini from '../JobCardMini';

function MapSearch(props) {
    const searchResult = useSelector(state => state.job.searchResult);

    const renderSearchResult = (jobList)=>{
        return jobList.map(job => {
            return <JobCardMini key={job.id} job={job} />
        })
    }

    return (
        <div className="mapSearch">
            <div className="mapSearch__map">この辺マップ</div>
            <div className="mapSearch__result">
                {renderSearchResult(searchResult)}
            </div>
        </div>
    )
}

export default MapSearch;
