import React from 'react';
import { Link } from 'react-router-dom';
import JobCardLarge from './JobCardLarge';

export default function JobListGrid({ jobList }) {
    return (
        <div className="jobListGrid">
            {
                jobList.map(job => {
                    return (
                        <Link key={job.id} to={`/jobs/${job.id}`}>
                            <JobCardLarge  job={job} />
                        </Link>
                    )
                })
            }
        </div>
    )
}
