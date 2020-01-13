import React from 'react';
import nzcafemapad_url from '../../../img/nzcafemap_ad.jpg';

const AdNZCafemap = () => {
    return (
        <div className="adLarge">
            <a href="https://www.nzcafemap.com/" className="adLarge__fullImage">
                <img src={nzcafemapad_url} alt="ad" />
            </a>
        </div>
    )
}

export default AdNZCafemap
