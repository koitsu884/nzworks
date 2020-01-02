import React from 'react'
import Image from '../../../common/Image';
import CoverMessage from '../../../common/CoverMessage';

export default function SavedJobItem({savedJob}) {
    const renderJobImage = avatar => {
        if (!avatar) return null;
        return (
            <div className="media-left">
                <figure className="image is-48x48">
                    <Image src={avatar.image_url} thumb={true} alt='Job image'/>
                </figure>
            </div>
        )
    }

    const renderCoverMessage = status => {
        let message = null;
        switch(status){
            case 'inactive':
                message = '募集一時停止中'
                break;
            case 'removed':
                message = '広告削除済'
                break;
            default:
                break;
        }
        if(message){
            return <CoverMessage message={message} />
        }
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    {
                        renderJobImage(savedJob.employerImage)
                    }
                    <div className="media-content">
                        <h3>{savedJob.jobTitle}</h3>
                        <p>{savedJob.employerName}</p>
                    </div>
                </div>
                <div className="content"> <span className="tag is-primary">{savedJob.areaName ? savedJob.areaName : 'エリア未設定'}</span>  <span className="tag is-warning">{savedJob.jobCategory}</span></div>
            </div>
            {
                renderCoverMessage(savedJob.jobStatus)
            }
        </div>
    )
}
