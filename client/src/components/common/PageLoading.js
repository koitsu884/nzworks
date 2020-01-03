import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from './Spinner';


const PageLoading = ({animationClass}) => {
    const loading = useSelector(state => state.common.loading);

    return (
        <TransitionGroup component={null}>
            {
                loading ? (
                    <CSSTransition
                        in
                        timeout={300}
                        classNames={animationClass}
                        unmountOnExit
                    // onEnter={() => this.setState({in: true})}
                    // onExited={() => this.setState({in: false})}
                    >
                        <Spinner cover={true} />
                    </CSSTransition>
                ) : null
            }
        </TransitionGroup>
    )
}

export default PageLoading
