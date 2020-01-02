import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobCardLarge from '../job/JobCardLarge';

const LatestJobList = props => {
    const {jobList} = props;
    
    return (
        <div className="latestJobList">
            {
                !jobList || jobList.length === 0
                ? <p>データがありません</p>
                : jobList.map(job => {
                    return (
                        <Link key={job._id} to={`/jobs/${job._id}`} className="latestJobList__item hover-basic">
                            <JobCardLarge job={job}/>
                        </Link>
                    )
                })
            }
        </div>
    )
}

LatestJobList.propTypes = {
    jobList: PropTypes.array
}

export default LatestJobList
