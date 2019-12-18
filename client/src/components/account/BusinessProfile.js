import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AccountEdit from './MyPage/AccountEdit';
import BusinessProfileEdit from './MyPage/BusinessProfileEdit';

export default function BusinessProfile({ user }) {

    return (
        <div className="profile">
            <Tabs>
                <div className="tabs is-boxed control">
                    <TabList >
                        <Tab selectedClassName="is-active"><a href="# ">アカウント</a></Tab>
                        <Tab selectedClassName="is-active"><a href="# ">プロフィール</a></Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <h2>アカウント設定</h2>
                    <AccountEdit />
                </TabPanel>
                <TabPanel>
                    <h2>プロフィール</h2>
                    <BusinessProfileEdit />
                </TabPanel>
            </Tabs>
        </div>
    )
}
