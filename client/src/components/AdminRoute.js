import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const AdminRoute = ({ component: Component, userType, currentUser, ...rest }) => {
    let result = false;

    if (currentUser) {
        if (currentUser.is_admin) {
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

export default connect(mapStateToProps)(AdminRoute);
