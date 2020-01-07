import React from 'react';
import TagCloud from '../common/TagCloud';
import Image from '../common/Image';
import formatDate from '../../utils/formatDate';

import noImageUrl from '../../img/no_image.png';
import Icon from '../common/Icon';

export default function JobCardLarge({ job }) {
    let imageUrl = job.mainImage 
                ? job.mainImage.image_url 
                : (
                    job.user.profile.avatar 
                    ? job.user.profile.avatar.image_url
                    : null 
                );

    return (
        <div className="jobCardLarge card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <Image src={imageUrl ? imageUrl : noImageUrl} alt='Company image'/>
                </figure>
            </div>
            <div className="card-content">
                <h3 className="has-text-primary-dark">{job.title}</h3>
                <h5 className="content">{job.user.name}</h5>
                <div className="content">
                    <span className="tag is-primary">{job.area ? job.area.name : 'エリア指定無し'}</span>  <span className="tag is-warning">{job.jobCategory}</span>
                </div>
                <div className="content u-margin-top-small">
                    <TagCloud tags={job.tags} className="are-small" />
                </div>
            </div>
            <div className="card-footer u-flex u-flex-align">
                <Icon iconClassName="fa-calendar-alt" />
                <time className="u-margin-left-small" dateTime={job.updated_at}>{formatDate(job.updated_at)}</time>
            </div>
        </div>
    )
}
