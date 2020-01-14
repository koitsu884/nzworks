import React from 'react';

import ResendVerifyEmail from './ResendVerifyEmail';
import AdminUserList from './AdminUserList';

const Dashboard = () => {
  
    return (
        <div className="container">
            <h1>Admin dashboard</h1>
            <div>
                <h2>Resend verify email</h2>
                <ResendVerifyEmail />
            </div>
            <div>
                <h2>User List</h2>
                <AdminUserList />
            </div>
        </div>
    )
}

export default Dashboard
