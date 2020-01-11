import React from 'react';
import { useSelector } from 'react-redux';
import { LatestFeedCard } from './LatestFeedCard';

const SeasonalWorkInfo = () => {
    const latestFeedList = useSelector(state => state.home.latestFeedList)

    const renderFeedList = () => {
        if (latestFeedList.length === 0) {
            return <div>No data</div>
        }

        return latestFeedList.map(feed => {
            return <div className="latestFeedList__item hover-basic">
                <LatestFeedCard feed={feed} />
            </div>
        })
    }

    return (
        <div className="seasonalWorkInfo">
            <h3 className="has-text-info u-margin-bottom-small">シーズナルワーク情報</h3>
            <p>情報元: <a className="has-text-link" href="https://www.backpackerboard.co.nz/"><b>backpackerboard</b></a></p>
            <div className="latestFeedList">
                {renderFeedList()}
            </div>
        </div>
    )
}

export default SeasonalWorkInfo
