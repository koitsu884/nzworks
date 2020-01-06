import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AccountEdit from './MyPage/AccountEdit';
import ProfileEdit from './MyPage/ProfileEdit';

export default function Profile({ user }) {
    return (
        <div className="profile">
            <Tabs>
                <div className="tabs is-boxed control">
                    <TabList >
                        <Tab selectedClassName="is-active"><a href="# ">プロフィール</a></Tab>
                        <Tab selectedClassName="is-active"><a href="# ">アカウント</a></Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <h2>プロフィール</h2>
                    <ProfileEdit />
                </TabPanel>
                <TabPanel>
                    <h2>アカウント情報</h2>
                    <AccountEdit />
                </TabPanel>
            </Tabs>
        </div>
    )
}
