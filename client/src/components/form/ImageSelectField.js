import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ImageSelector from '../common/ImageSelector';

const ImageSelectField = ({
    name,
    images,
    className,
    label,
}) => {
    const { register, setValue, watch } = useFormContext();
    let selectedImage = watch(name);

    useEffect(() => {
        register({ 'name': `${name}`, type: 'custom' });
    }, [register, name])

    const handleMainImageSelect = image => {
        setValue(name, image);
    }

    return (
        <div className={`imageSelectField ${className}`}>
            <label className="label">{label}</label>
            <ImageSelector
                images={images}
                onSelect={handleMainImageSelect}
                selectedImageId={selectedImage ? selectedImage.image_id : ''}
            />
        </div>
    )
}

export default ImageSelectField
