import React from 'react';
import Image from '../common/Image';
import formatDate from '../../utils/formatDate';
import Icon from '../common/Icon';

export default function JobCard({ job, saved, applied }) {
    let jobDescription = job.details.length > 200 ? job.details.substr(0, 200) + '...' : job.details;
    let imageUrl = job.mainImage 
                ? job.mainImage.image_url 
                : (
                    job.user.profile.avatar 
                    ? job.user.profile.avatar.image_url
                    : null 
                );

    const renderJobImage = () => {
        if (!imageUrl) return null;
        return (
            <div className="media-left">
                <figure className="image is-96x96">
                    <Image src={imageUrl} thumb={true} alt='Job image' />
                </figure>
            </div>
        )
    }

    const renderTags = tags => {
        if (!tags || tags.length === 0) return null;

        let tagContents = tags.map(tag => {
            return <span key={tag} className="tag is-primary is-light">{tag}</span>
        });

        return (
            <div className="tags u-margin-top-small">{tagContents}</div>
        )
    }

    const renderEnglishLevel = englishLevel => {
        let content = englishLevel ? englishLevel : '不問';
        return (
            <span className="tag is-warning is-light">
                英語力：{content}
            </span>
        )
    }

    const renderAddress = address => {
        if (!address) return null;

        return (
            <div className="content u-margin-bottom-small">
                <Icon iconNameClass='fa-map-marker-alt' modifierClasses='has-text-danger' />
                <span>{address}</span>
            </div>
        )
    }

    return (
        <div className="card hover-basic jobCard">
            <div className="card-content">
                {
                    applied || saved
                        ? (
                            <div className="content jobCard__status tags">
                                {
                                    saved ? <span className="tag is-warning is-light">保存済</span> : null
                                }
                                {
                                    applied ? <span className="tag is-warning is-danger">応募済</span> : null
                                }
                            </div>
                        )
                        : null
                }
                <div className="u-flex u-margin-bottom-small">
                    {
                        renderJobImage()
                    }
                    <div>
                        <h3 className="is-primary">{job.title}</h3>
                        <h5 className="content has-text-primary">{job.area ? job.area.name : 'エリア指定無し'}</h5>
                        <p>投稿者:{job.user.name}<span className="icon u-margin-left-small"><i className="fas fa-calendar-alt"></i></span>{formatDate(job.updated_at)}</p>
                    </div>
                </div>
                {renderAddress(job.address)}
                <p className="tags">
                    <span className="tag is-warning">{job.jobCategory}</span>
                    {renderEnglishLevel(job.englishLevel)}
                    {
                        job.workType
                            ? <span className="tag is-success is-light">{job.workType}</span>
                            : null
                    }
                </p>
                {renderTags(job.tags)}
                <div className="content">
                    <p className="card-text">{jobDescription}</p>
                </div>
            </div>
        </div>
    )
}
