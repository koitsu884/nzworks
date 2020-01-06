import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

const ImageSelector = (props) => {
    const handleImageSelect = (image) => {
        props.onSelect(image);
    }

    const handleDeleteImage = image => {
        props.onDelete(image);
    }


    const renderImages = images => {
        if (!images || images.length === 0) return "No Images";
        return images.map((image, index) => {
            return (
                <div key={index} className="imageSelector__item">
                    <div key={index} className={`imageSelector__item__image ${image.image_id === props.selectedImageId ? 'selected' : ''}`} onClick={() => handleImageSelect(image)}>
                        <Image src={image.image_url} thumb={true} alt={`Image ${index + 1}`} />
                    </div>
                    {
                        props.onDelete
                        ? (
                            <span className="icon is-medium" onClick={() => handleDeleteImage(image)}>
                                <i className="fas fa-2x fa-trash-alt"></i>
                            </span>
                        )
                        : null
                    }
                </div>
            )
        })
    }

    return (
        <div className="imageSelector">
            {
                renderImages(props.images)
            }
        </div>
    )
}

ImageSelector.propTypes = {
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
    images: PropTypes.array,
    selectedImageId: PropTypes.string
}

export default ImageSelector
