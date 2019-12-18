import React from 'react'
import Image from '../common/Image';

export default function JobCardMini({job}) {
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

    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    {
                        renderJobImage(job.user.profile.avatar)
                    }
                    <div className="media-content">
                        <h3>{job.title}</h3>
                        <p>{job.user.name}</p>
                    </div>
                </div>
                <div className="content"> <span className="tag is-primary">{job.area ? job.area.name : 'エリア未設定'}</span>  <span className="tag is-warning">{job.jobCategory}</span></div>
            </div>
        </div>
    )
}
