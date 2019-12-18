import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostedJobList = (props) => {
    const {jobList} = props;

    const handleDeleteJob = id => {
        props.onDelete(id);
    }

    const handleActivateJob = id => {
        props.onActivate(id);
    }

    const handleDeactivateJob = id => {
        props.onDeactivate(id);
    }

    const renderTags = tags => {
        if (tags && tags.length > 0) {
            return tags.map(tag => {
                return (
                    <span key={tag} className="tag is-primary is-light">
                        {tag}
                    </span>
                )
            })
        }
        return '未設定';
    }

    const renderJobTable = job => {
        return (
            <dl>
                <dt>エリア</dt><dd>{job.area ? (<span className="tag is-primary">{job.area.name}</span> )  : '未設定'}</dd>
                <dt>職種</dt><dd><span className="tag is-success">{job.jobCategory}</span></dd>
                <dt>詳細</dt><dd>{job.details}</dd>
                <dt>勤務タイプ</dt><dd>{job.workType ? job.workType : '不問'}</dd>
                <dt>必要英語レベル</dt><dd>{job.englishLevel ? job.englishLevel : '不問'}</dd>
                <dt>タグ</dt><dd>{renderTags(job.tags)}</dd>
            </dl>
        )
    }

    return (
        <div className="postedJobList">
            {
                !jobList || jobList.length === 0
                    ? <p>データがありません</p>
                    : jobList.map(job => {
                        return (
                            <div className={`postedJobList__item ${job.is_active ? '' : 'inactive'}`} key={job._id}>
                                <div className="card">
                                    <header className="card-header">
                                    <h3 className="card-header-title">{job.title}</h3>
                                    </header>
                                    <div className="card-content">
                                    {renderJobTable(job)}
                                    </div>    
                                </div>
                                <div className="buttons">
                                    <Link to={`/jobs/edit/${job._id}`} type="button" className="button is-primary">編集</Link>
                                    {
                                        job.is_active
                                        ? <button type="button" onClick={() => handleDeactivateJob(job._id)} className="button is-warning">募集停止</button>
                                        : <button type="button" onClick={() => handleActivateJob(job._id)} className="button is-success">募集再開</button>
                                    }
                                    <button type="button" onClick={()=>handleDeleteJob(job._id)} className="button is-danger">削除</button>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

PostedJobList.propTypes = {
    onActivate : PropTypes.func,
    onDeactivate : PropTypes.func,
    onDelete : PropTypes.func,
}

export default PostedJobList;
