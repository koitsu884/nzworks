import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import SavedJobItem from './SavedJobItem';

const SavedJobList = props => {
    const { savedJobList } = props;
    const onClickDelete = id => {
        props.onClickDelete(id);
    }

    if (!savedJobList || savedJobList.length === 0) {
        return <p>データがありません</p>
    }

    return (
        <div className="savedJobList">
            {
                savedJobList.map(savedJob => {
                    return (
                        <div className="u-flex" key={savedJob.job}>
                            {
                                savedJob.jobStatus === 'removed'
                                ? (
                                    <div className='u-flex-grow'>
                                        <SavedJobItem savedJob={savedJob} />
                                    </div>
                                )
                                : (
                                    <Link to={`/jobs/${savedJob.job}`} className='u-flex-grow'>
                                        <SavedJobItem savedJob={savedJob} />
                                    </Link>
                                )
                            }
   
                            <button type="button" onClick={() => onClickDelete(savedJob._id)} className="button is-danger is-small u-margin-auto">削除</button>
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
