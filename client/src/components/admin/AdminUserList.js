import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../common/Spinner';
import Pagination from '../common/Pagination';
import { getUserList } from '../../actions/adminActions';
import AdminUserCard from './AdminUserCard';

const DEFAULT_PAGE_SIZE = 12;

const AdminUserList = (props) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setPage] = useState(1);
    const [filter, setFilter] = useState({ unverified: false });

    const dispatch = useDispatch();
    const userList = useSelector(state => state.admin.userList);
    const itemCount = useSelector(state => state.admin.userCount);

    useEffect(() => {
        setLoading(true);
        dispatch(getUserList(currentPage, DEFAULT_PAGE_SIZE, filter))
    }, [currentPage, filter, setLoading, dispatch])

    useEffect(() => {
        setLoading(false);
    }, [userList, setLoading])

    const handlePageClick = selectedPage => {
        setPage(selectedPage);
    }

    const handleVerifiedCheckChange = () => {
        let newFilter = { ...filter };
        newFilter.unverified = !filter.unverified;
        setFilter(newFilter);
        setPage(1);
    }

    const renderUserList = () => {
        if (userList.length === 0) return <div>No data</div>

        return userList.map(user => {
            return (
                <div key={user._id} className="adminUserList__item">
                    <AdminUserCard user={user} />
                </div>
            )
        })
    }

    return (
        <div className={props.className}>
            <label className="checkbox">
                <input type="checkbox" checked={filter.unverified} onChange={handleVerifiedCheckChange} />
                Unverified user only
            </label>
            <div className="adminUserList">
                {
                    loading ? <Spinner /> : renderUserList()
                }
            </div>
            <Pagination
                itemCount={itemCount}
                pageSize={DEFAULT_PAGE_SIZE}
                onPageChange={handlePageClick}
                className='bg-secondary-light'
            />
        </div>
    )
}

export default AdminUserList
