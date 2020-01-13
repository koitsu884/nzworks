import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import JobCardLarge from '../job/JobCardLarge';
import AdNZWorksLarge from '../common/ads/AdNZWorksLarge';
import AdNZCafemap from '../common/ads/AdNZCafemap';

const LatestJobList = props => {
    const { jobList } = props;
    const adCount = 3 - (jobList.length % 3);

    const renderAds = () => {
        switch (adCount) {
            case 2:
                return (
                    <Fragment>
                        <div className="latestJobList__item">
                            <AdNZWorksLarge />
                        </div>
                        <div className="latestJobList__item">
                            <AdNZCafemap />
                        </div>
                    </Fragment>
                )
            case 1:
                return (
                    <AdNZWorksLarge />
                )
            default:
                return null;
        }
    }

    return (
        <div className="latestJobList">
            {
                !jobList || jobList.length === 0
                    ? <p>データがありません</p>
                    : jobList.map(job => {
                        return (
                            <Link key={job._id} to={`/jobs/${job._id}`} className="latestJobList__item hover-basic">
                                <JobCardLarge job={job} />
                            </Link>
                        )
                    })
            }
            {
                renderAds()
            }
        </div>
    )
}

LatestJobList.propTypes = {
    jobList: PropTypes.array
}

export default LatestJobList
