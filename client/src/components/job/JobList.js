import React from 'react';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';

export default function JobList({jobList, savedJobIds, appliedJobIds}) {
    return (
        <div className="jobList">
            {
                !jobList || jobList.length === 0
                ? <p>データがありません</p>
                : jobList.map(job => {
                    let saved = savedJobIds.includes(job._id);
                    let applied = appliedJobIds.includes(job._id);

                    return (
                        <Link key={job._id} to={`/jobs/${job._id}`}>
                            <JobCard job={job} saved={saved} applied={applied} />
                        </Link>
                    )
                })
            }
        </div>
    )
}
