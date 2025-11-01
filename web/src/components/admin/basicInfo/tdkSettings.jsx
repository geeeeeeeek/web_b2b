'use client';

import HeadLabel from "@/components/admin/headLabel";
import FormLabel from "@/components/admin/formLabel";
import React, {useEffect, useState} from "react";
import {Button, Input, message, Radio} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {Divider} from "antd/lib";
import axiosInstance from "@/utils/axios";

const TdkSettings = () => {

    const [currentItem, setCurrentItem] = useState({});

    const fetchData = async () => {
        try {
            const {code, msg, data} = await axiosInstance.get('/myapp/admin/basicTdk/list');
            if (code === 0) {
                setCurrentItem(data);
            } else {
                message.error(msg || '网络异常')
            }
        } catch (err) {
            console.log(err)
            message.error('网络异常')
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (name, value) => {
        setCurrentItem((prev) => ({...prev, [name]: value}));
    };

    const handleSave = async () => {
        try {
            const post_url = '/myapp/admin/basicTdk/update';
            const formData = new FormData();
            formData.append('tdk_home_title', currentItem.tdk_home_title || '');
            formData.append('tdk_home_keywords', currentItem.tdk_home_keywords || '');
            formData.append('tdk_home_description', currentItem.tdk_home_description || '');
            formData.append('tdk_product_title', currentItem.tdk_product_title || '');
            formData.append('tdk_product_keywords', currentItem.tdk_product_keywords || '');
            formData.append('tdk_product_description', currentItem.tdk_product_description || '');
            formData.append('tdk_about_title', currentItem.tdk_about_title || '');
            formData.append('tdk_about_keywords', currentItem.tdk_about_keywords || '');
            formData.append('tdk_about_description', currentItem.tdk_about_description || '');
            formData.append('tdk_contact_title', currentItem.tdk_contact_title || '');
            formData.append('tdk_contact_keywords', currentItem.tdk_contact_keywords || '');
            formData.append('tdk_contact_description', currentItem.tdk_contact_description || '');
            formData.append('tdk_news_title', currentItem.tdk_news_title || '');
            formData.append('tdk_news_keywords', currentItem.tdk_news_keywords || '');
            formData.append('tdk_news_description', currentItem.tdk_news_description || '');
            formData.append('tdk_case_title', currentItem.tdk_case_title || '');
            formData.append('tdk_case_keywords', currentItem.tdk_case_keywords || '');
            formData.append('tdk_case_description', currentItem.tdk_case_description || '');
            formData.append('tdk_download_title', currentItem.tdk_download_title || '');
            formData.append('tdk_download_keywords', currentItem.tdk_download_keywords || '');
            formData.append('tdk_download_description', currentItem.tdk_download_description || '');
            formData.append('tdk_faq_title', currentItem.tdk_faq_title || '');
            formData.append('tdk_faq_keywords', currentItem.tdk_faq_keywords || '');
            formData.append('tdk_faq_description', currentItem.tdk_faq_description || '');
            const {code, msg, data} = await axiosInstance.post(post_url, formData);
            if (code === 0) {
                message.success("操作成功");
                fetchData()
            } else {
                message.error(msg || '网络异常')
            }
        } catch (err) {
            console.log(err)
        }
    };


    console.log(currentItem);

    return (
        <>
            <div className="px-6 py-6">
                <HeadLabel title="首页TDK信息" />
                <div className="flex flex-col gap-4 px-2 py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_home_title}
                               onChange={(e) => handleInputChange("tdk_home_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_home_keywords}
                               onChange={(e) => handleInputChange("tdk_home_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_home_description}
                            onChange={(e) => handleInputChange("tdk_home_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="产品页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_product_title}
                               onChange={(e) => handleInputChange("tdk_product_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_product_keywords}
                               onChange={(e) => handleInputChange("tdk_product_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_product_description}
                            onChange={(e) => handleInputChange("tdk_product_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="关于页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_about_title}
                               onChange={(e) => handleInputChange("tdk_about_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_about_keywords}
                               onChange={(e) => handleInputChange("tdk_about_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_about_description}
                            onChange={(e) => handleInputChange("tdk_about_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="联系页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_contact_title}
                               onChange={(e) => handleInputChange("tdk_contact_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_contact_keywords}
                               onChange={(e) => handleInputChange("tdk_contact_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_contact_description}
                            onChange={(e) => handleInputChange("tdk_contact_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="新闻页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_news_title}
                               onChange={(e) => handleInputChange("tdk_news_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_news_keywords}
                               onChange={(e) => handleInputChange("tdk_news_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_news_description}
                            onChange={(e) => handleInputChange("tdk_news_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="案例页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_case_title}
                               onChange={(e) => handleInputChange("tdk_case_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_case_keywords}
                               onChange={(e) => handleInputChange("tdk_case_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_case_description}
                            onChange={(e) => handleInputChange("tdk_case_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="下载页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_download_title}
                               onChange={(e) => handleInputChange("tdk_download_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_download_keywords}
                               onChange={(e) => handleInputChange("tdk_download_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_download_description}
                            onChange={(e) => handleInputChange("tdk_download_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>
                <HeadLabel title="Faq页TDK信息" />
                <div className="flex flex-col gap-4 px-2  py-6">
                    <div className="flex flex-row gap-4">
                        <FormLabel title="标题"></FormLabel>
                        <Input placeholder="请输入标题" value={currentItem.tdk_faq_title}
                               onChange={(e) => handleInputChange("tdk_faq_title", e.target.value)}
                               style={{width: 300}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="关键词"></FormLabel>
                        <Input placeholder="请输入关键词" value={currentItem.tdk_faq_keywords}
                               onChange={(e) => handleInputChange("tdk_faq_keywords", e.target.value)}
                               style={{width: 600}}/>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FormLabel title="描述"></FormLabel>
                        <TextArea
                            placeholder="请输入描述"
                            autoSize={{
                                minRows: 3,
                                maxRows: 6,
                            }}
                            showCount
                            maxLength={250}
                            value={currentItem.tdk_faq_description}
                            onChange={(e) => handleInputChange("tdk_faq_description", e.target.value)}
                            style={{width: 600}}
                        />
                    </div>
                </div>


                <Divider />

                <div className="pb-6 flex flex-row gap-4 justify-start">
                    <Button type="primary" onClick={handleSave}>提交</Button>
                </div>
            </div>
        </>
    );
}

export default TdkSettings;