import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Help = () => {
    return (
        <div className="content">
            <Tabs>
                <div className="tabs is-boxed control">
                    <TabList >
                        <Tab selectedClassName="is-active"><a href="# ">アカウント</a></Tab>
                        <Tab selectedClassName="is-active"><a href="# ">求人検索</a></Tab>
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

export default Help
