import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import JobCardMini from '../../../job/JobCardMini';

const SavedJobList = props => {
    const { jobList } = props;
    const onClickDelete = id => {
        props.onClickDelete(id);
    }

    if (!jobList || jobList.length === 0) {
        return <p>データがありません</p>
    }

    return (
        <div className="jobList">
            {
                jobList.map(job => {
                    return (
                        <div className="u-flex" key={job._id}>
                            <Link to={`/jobs/${job._id}`}>
                                <JobCardMini job={job} />
                            </Link>
                            <button type="button" onClick={() => onClickDelete(job._id)} className="button is-danger is-small u-margin-auto">削除</button>
                        </div>
                    )
                })
            }

        </div>
    )
}

SavedJobList.propTypes = {
    jobList: PropTypes.array,
    applied: PropTypes.bool,
    onClickDelete: PropTypes.func
}

export default SavedJobList
