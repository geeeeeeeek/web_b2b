'use client';

import FormLabel from "@/components/admin/formLabel";
import React, {useEffect, useState} from "react";
import {Button, Input, message, Radio, Spin} from 'antd';
import ImageUpload from "@/components/admin/imageUpload";
import {Divider} from "antd/lib";
import axiosInstance from "@/utils/axios";

const GlobalSettings = () => {

    const [currentItem, setCurrentItem] = useState({});
    const [loading, setLoading] = useState(false);

    // 为了制造Upload而用
    const [imageList, setImageList] = useState([]);


    const fetchData = async () => {
        try {
            setLoading(true)
            const {code, msg, data} = await axiosInstance.get('/myapp/admin/basicGlobal/list');
            if (code === 0) {
                setCurrentItem(data);
                fixToImageData(data);
            } else {
                message.error(msg || '网络异常')
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            message.error('网络异常')
            setLoading(false)
        }
    };

    const fixToImageData = (initialData) => {
        // 制造适合Upload的数据格式
        if (initialData?.global_wechat_qrcode?.length > 0) {
            setImageList(initialData?.global_wechat_qrcode?.split("#").map((item) => ({
                success: true,
                name: item,
                status: 'done',
                url: process.env.NEXT_PUBLIC_BASE_URL + '/upload/img/' + item,
            })));
        } else {
            setImageList([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleInputChange = (name, value) => {
        setCurrentItem((prev) => ({...prev, [name]: value}));
    }

    const handleSave = async () => {
        console.log(currentItem);
        try {
            const post_url = '/myapp/admin/basicGlobal/update';
            const formData = new FormData();
            formData.append('global_phone', currentItem.global_phone || '');
            formData.append('global_email', currentItem.global_email || '');
            formData.append('global_company_name', currentItem.global_company_name || '');
            formData.append('global_address', currentItem.global_address || '');
            formData.append('global_wechat', currentItem.global_wechat || '');
            formData.append('global_wechat_qrcode', currentItem.global_wechat_qrcode || '');
            formData.append('global_facebook', currentItem.global_facebook || '');
            formData.append('global_twitter', currentItem.global_twitter || '');
            formData.append('global_linkedin', currentItem.global_linkedin || '');
            formData.append('global_whatsapp', currentItem.global_whatsapp || '');
            formData.append('global_youtube', currentItem.global_youtube || '');
            formData.append('global_instagram', currentItem.global_instagram || '');
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

    const handleImageUploadChange = (imageUrlList, name) => {
        let value = (imageUrlList && imageUrlList.length > 0) ? imageUrlList.join("#") : null;
        setCurrentItem((prev) => ({...prev, [name]: value}));
    };

    return (
        <>
            <div className="px-6 py-6">
                <Spin spinning={loading}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row gap-4">
                            <FormLabel title="客服电话"></FormLabel>
                            <Input placeholder="请输入客服电话" value={currentItem.global_phone}
                                   onChange={(e) => handleInputChange("global_phone", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="邮箱地址"></FormLabel>
                            <Input placeholder="请输入邮箱地址" value={currentItem.global_email}
                                   onChange={(e) => handleInputChange("global_email", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="公司名称"></FormLabel>
                            <Input placeholder="请输入公司名称" value={currentItem.global_company_name}
                                   onChange={(e) => handleInputChange("global_company_name", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="公司地址"></FormLabel>
                            <Input placeholder="请输入公司地址" value={currentItem.global_address}
                                   onChange={(e) => handleInputChange("global_address", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="微信二维码"></FormLabel>
                            <ImageUpload maxCount={1}
                                         maxSize={2}
                                         accept="image/*"
                                         imageList={imageList}
                                         onImageUploadChange={(imageUrlList)=>handleImageUploadChange(imageUrlList, "global_wechat_qrcode")}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="微信号"></FormLabel>
                            <Input placeholder="请输入微信号" value={currentItem.global_wechat}
                                   onChange={(e) => handleInputChange("global_wechat", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="Facebook"></FormLabel>
                            <Input placeholder="请输入Facebook" value={currentItem.global_facebook}
                                   onChange={(e) => handleInputChange("global_facebook", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="Twitter"></FormLabel>
                            <Input placeholder="请输入Twitter" value={currentItem.global_twitter}
                                   onChange={(e) => handleInputChange("global_twitter", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="Linkedin"></FormLabel>
                            <Input placeholder="请输入Twitter" value={currentItem.global_linkedin}
                                   onChange={(e) => handleInputChange("global_linkedin", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="Whatsapp"></FormLabel>
                            <Input placeholder="请输入Twitter" value={currentItem.global_whatsapp}
                                   onChange={(e) => handleInputChange("global_whatsapp", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="Youtube"></FormLabel>
                            <Input placeholder="请输入Youtube" value={currentItem.global_youtube}
                                   onChange={(e) => handleInputChange("global_youtube", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="Instagram"></FormLabel>
                            <Input placeholder="请输入Instagram" value={currentItem.global_instagram}
                                   onChange={(e) => handleInputChange("global_instagram", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                    </div>
                </Spin>

                <Divider />

                <div className="pb-6 flex flex-row gap-4 justify-start">
                    <Button type="primary" onClick={handleSave}>提交</Button>
                </div>
            </div>
        </>
    );
}

export default GlobalSettings;