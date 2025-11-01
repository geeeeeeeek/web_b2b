'use client';
import React, {useEffect, useState} from 'react';
import {Tabs} from "antd";
import DownloadList from "@/components/admin/download/downloadList";

export default function Page() {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: '下载页管理',
            children: <DownloadList/>,
        },
    ];

    return (
        <>
            <div className="bg-gray-100 px-4 py-4">
                <div className="">
                    <Tabs
                        indicator={{ size: (origin) => 24, align: 'center' }}
                        tabBarStyle={{paddingLeft: '20px', outline: 'none',fontWeight: '400'}}
                        className="bg-white custom-tab" defaultActiveKey="1" items={items} onChange={onChange}/>
                </div>
            </div>
        </>
    );
};