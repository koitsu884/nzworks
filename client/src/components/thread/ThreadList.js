import React from 'react'
import PropTypes from 'prop-types';
import ThreadListItem from './ThreadListItem';

const ThreadList = ({ threads }) => {
    return (
        <div className="threadList">
            {
                threads.length === 0
                    ? 'データがありません'
                    : threads.map(thread => {
                        return <ThreadListItem key={thread._id} thread={thread} />
                    })
            }
        </div>
    )
}

ThreadList.propTypes = {
    threads: PropTypes.array.isRequired
}

export default ThreadList
