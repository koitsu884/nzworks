import React, {Fragment} from 'react';
import { getResizedImageUrl } from '../../utils/imageManager';

const Image = ({ className, src, alt, thumb }) => {
    return (
        <Fragment >
            {
                thumb ? <img className={className} src={getResizedImageUrl(src, 'c_thumb,w_200')} alt={alt} />
                : (
                    <img
                        className={className}
                        srcSet={`
                        ${getResizedImageUrl(src, 'w_256')} 256w, 
                        ${getResizedImageUrl(src, 'w_512')} 512w, 
                        ${getResizedImageUrl(src, 'w_768')} 768w, 
                        ${src} 1024w
                        `}
                        sizes="(max-width: 256px) 216px,
                            (max-width: 512px) 472px,
                            (max-width: 768px) 728px,
                            1024px"
                        src={src}
                        alt={alt}
                    />
                )
            }
        </Fragment>
    )

}

export default Image; 
