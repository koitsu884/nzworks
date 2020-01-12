import React from 'react';
import PropTypes from 'prop-types';
import ReactImageGallery from 'react-image-gallery';
import { getResizedImageUrl } from '../../utils/imageManager';

const ImageGallery = ({images}) => {
    if (!images || images.length === 0) return null;

    let items = [];

    images.forEach(image => {
        items.push({
            original: image.image_url,
            // thumbnail: getResizedImageUrl(image.image_url, 'c_thumb,w_200')
        })
    })

    return (
        <ReactImageGallery
            items={items}
            autoPlay={true}
            slideInterval={6000}
            showThumbnails={false}
        />
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageGallery
