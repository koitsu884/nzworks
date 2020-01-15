import React from 'react'
import PropTypes from 'prop-types'

import Image from '../../common/Image';
import formatDate from '../../../utils/formatDate';

const JobCard = ({job}) => {
    let imageUrl = job.mainImage 
                ? job.mainImage.image_url 
                : null;

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

    return (
        <div className="hover-basic businessProfileDetail__jobCard">
            <div>
                <div className="u-flex u-margin-bottom-small">
                    {
                        renderJobImage()
                    }
                    <div>
                        <h3 className="is-primary">{job.title}</h3>
                        <h5 className="content has-text-primary">{job.area ? job.area.name : 'エリア指定無し'}</h5>
                        <p><span className="icon u-margin-left-small"><i className="fas fa-calendar-alt"></i></span>{formatDate(job.updated_at)}</p>
                    </div>
                </div>
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
            </div>
        </div>
    )
}

JobCard.propTypes = {
    job: PropTypes.object.isRequired
}

export default JobCard
