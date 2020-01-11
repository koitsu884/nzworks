import React from 'react'

export const LatestFeedCard = ({ feed }) => {
    return (
        <a className="feedCard" href={feed.url}>
            <div>
                <h5>{feed.title}</h5>
                <div>{feed.city}</div>
                <div>{feed.salary}</div>
                <div>{feed.category}</div>
            </div>
        </a>
    )
}
