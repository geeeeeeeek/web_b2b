'use client';
import React, {useEffect, useState} from 'react';
import {Tabs} from "antd";
import SiteSettings from "@/components/admin/basicInfo/siteSettings";
import TdkSettings from "@/components/admin/basicInfo/tdkSettings";
import GlobalSettings from "@/components/admin/basicInfo/globalSettings";
import AdditionalSettings from "@/components/admin/basicInfo/additionalSettings";
import BannerSettings from "@/components/admin/basicInfo/bannerSettings";
import CommentSettings from "@/components/admin/basicInfo/commentSettings";
import AdvantageSettings from "@/components/admin/basicInfo/advantageSettings";

export default function Page() {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: '网站信息',
            children: <SiteSettings />,
        },
        {
            key: '2',
            label: 'TDK信息',
            children: <TdkSettings />,
        },
        {
            key: '3',
            label: 'Banner信息',
            children: <BannerSettings />,
        },
        {
            key: '4',
            label: '全局变量',
            children: <GlobalSettings />,
        },
        {
            key: '5',
            label: '附加变量',
            children: <AdditionalSettings />,
        },
        {
            key: '6',
            label: '优势变量',
            children: <AdvantageSettings />,
        },
        {
            key: '7',
            label: '客评变量',
            children: <CommentSettings />,
        },
    ];

    return (
        <>
            <div className="bg-gray-100 px-4 py-4">
                <div>
                    <Tabs
                        indicator={{ size: (origin) => 24, align: 'center' }}
                        tabBarStyle={{paddingLeft: '20px', outline: 'none',fontWeight: '400'}}
                        className="bg-white custom-tab" defaultActiveKey="1" items={items} onChange={onChange}/>
                </div>
            </div>
        </>
    );
};