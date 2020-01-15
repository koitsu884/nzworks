import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../common/Image';
import JobDetailLocation from '../job/JobDetail/JobDetailLocation';
import client from '../../utils/client';
import JobCard from './BusinessProfileDetail/JobCard';
import noImageUrl from '../../img/no_image.png';


const BusinessProfileDetail = (props) => {
    const { name, profile } = props.user;
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        if (props.user._id) {
            client.get('job/user/' + props.user._id)
                .then(result => {
                    setJobList(result.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [props.user])

    const renderJobList = () => {
        return jobList.map(job => {
            return (
                <Link to={`/jobs/${job._id}`} className="businessProfileDetail__jobList__item" key={job._id}>
                    <JobCard job={job} />
                </Link>
            )
        })
    }

    return (
        <div className="businessProfileDetail">
            <div>
                {
                    profile.avatar
                        ? <div className="businessProfileDetail__avatar u-margin-bottom-medium">
                            <Image className="u-margin-auto" src={profile.avatar ? profile.avatar.image_url : noImageUrl} alt='avatar' />
                        </div>

                        : null
                }
                <h2 className="heading u-margin-bottom-medium">{name}</h2>
                <div className="u-margin-medium">
                    <div className="u-text-wrap u-margin-small">
                        {profile.introduction}
                    </div>
                    {
                        profile.companyWebsite
                            ? (
                                <div className="u-margin-small">
                                    <h4>ウェブサイト</h4>
                                    <a href={profile.companyWebsite} className="has-text-link"><u>{profile.companyWebsite}</u></a>
                                </div>
                            )
                            : null
                    }
                    {
                        profile.address
                            ? (
                                <div className="u-margin-small">
                                    <h4>住所</h4>
                                    <JobDetailLocation address={profile.address} />
                                </div>
                            )
                            : null
                    }
                </div>
                <section className="u-margin-small">
                    <h3 className="heading--label-primary">現在応募中の求人</h3>
                    <div className="businessProfileDetail__jobList">
                        {renderJobList()}
                    </div>
                </section>
            </div>

        </div>
    )
}

BusinessProfileDetail.propTypes = {
    user: PropTypes.object
}

export default BusinessProfileDetail
