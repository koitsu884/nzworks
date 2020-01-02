import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({ component: Component, userType: userType, currentUser, ...rest }) => {
    let result = false;

    if (currentUser) {
        if (!userType || currentUser.profile.user_type === userType) {
            result = true;
        }
    }

    return (
        <Route
            {...rest}
            render={props => result
                ? (
                    <Component {...props} />
                )
                : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(PrivateRoute);
