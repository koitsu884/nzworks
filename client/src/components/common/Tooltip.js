import React, { useState, useRef, useEffect } from 'react'
import Icon from './Icon';
import PropTypes from 'prop-types'

const Tooltip = props => {
    const [state, setFlag] = useState(false);
    const [style, setStyle] = useState({});
    const contentRef = useRef();
    const initialLeft = -30; //px
    const initialBottom = 30; //px

    useEffect(() => {
        let clientWidth = window.innerWidth;
        let contentClientRect = contentRef.current.getBoundingClientRect();

        let style = {
            bottom: initialBottom + 'px',
            left: initialLeft + 'px',
            width: contentClientRect.width,
            height: contentClientRect.height,
        }
        if( clientWidth < contentClientRect.right){
            let moveX = contentClientRect.right - clientWidth;
            style.left = (initialLeft - moveX) + 'px';
            // let temp = clientWidth - contentClientRect.x;
            // let temp2 = contentClientRect.width - temp;

            // style.left = -(temp2 + 10) + 'px';
        }
 
        setStyle(style);
    }, [initialBottom, initialLeft])

    const handleIconClick = () => {
        setFlag(!state);
    }

    return (
        <div className={`tooltip ${props.className}`}>
            <Icon className={props.iconModifierClass} iconClassName={props.iconClass} onClick={handleIconClick} />
            <div ref={contentRef} style={style} className={`tooltip__content ${state ? 'active' : ''}`}>
                {props.children}
            </div>
        </div>
    )
}

Tooltip.propTypes = {
    className: PropTypes.string,
    iconClass: PropTypes.string,
    iconModifierClass: PropTypes.string,
}

export default Tooltip
