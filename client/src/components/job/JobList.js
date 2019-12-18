import React from 'react';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';

export default function JobList({jobList}) {
    return (
        <div className="jobList">
            {
                !jobList || jobList.length === 0
                ? <p>データがありません</p>
                : jobList.map(job => {
                    return (
                        <Link key={job._id} to={`/jobs/${job._id}`}>
                            <JobCard job={job} />
                        </Link>
                    )
                })
            }
        </div>
    )
}
