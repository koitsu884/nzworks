import React from 'react'
import PropTypes from 'prop-types';

import JobCardLarge from '../job/JobCardLarge';

const LatestJobList = props => {
    return (
        <div className="latestJobList">
            {
                props.jobList.map(job => {
                    return (
                        <div className="latestJobList__item hover-basic">
                            <JobCardLarge key={job._id} job={job}/>
                        </div>
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
