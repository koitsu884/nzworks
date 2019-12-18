import React from 'react';
import Image from '../common/Image';
import formatDate from '../../utils/formatDate';
import Icon from '../common/Icon';

export default function JobCard({ job }) {
    let jobDescription = job.details.length > 200 ? job.details.substr(0, 200) + '...' : job.details;

    const renderJobImage = avatar => {
        if (!avatar) return null;
        return (
            <div className="media-left">
                <figure className="image is-96x96">
                    <Image src={avatar.image_url} thumb={true} alt='Job image'/>
                </figure>
            </div>
        )
    }

    const renderTags = tags => {
        if(!tags || tags.length === 0) return null;

        let tagContents = tags.map(tag => {
            return <span key={tag} className="tag is-primary is-light">{tag}</span>
        });

        return (
            <div className="tags">{tagContents}</div>
        )
    }

    const renderAddress = address => {
        if(!address) return null;

        return (
            <div className="content u-margin-bottom-small">
                <Icon iconNameClass='fa-map-marker-alt' modifierClasses='has-text-danger' />
                <span>{address}</span>
            </div>
        )
    }

    return (
        <div className="card hover-basic">
            <div className="card-content">
                <div className="media">
                    {
                        renderJobImage(job.user.profile.avatar)
                    }
                    <div className="media-content">
                        <h3>{job.title}</h3>
                        <p>投稿者:{job.user.name}<span className="icon u-margin-left-small"><i className="fas fa-calendar-alt"></i></span>{formatDate(job.created_at)}</p>
                        <p> <span className="tag is-primary">{job.area ? job.area.name : 'エリア指定無し'}</span>  <span className="tag is-warning">{job.jobCategory}</span></p>
                    </div>
                </div>
                {renderAddress(job.address)}
                {renderTags(job.tags)}
                <div className="content">
                    <p className="card-text">{jobDescription}</p>
                </div>
            </div>
        </div>
    )
}
