'use client';
import HeadLabel from "@/components/admin/headLabel";
import FormLabel from "@/components/admin/formLabel";
import React, {useEffect, useState} from "react";
import {Button, Input, message, Radio, Spin} from 'antd';
import ImageUpload from "@/components/admin/imageUpload";
import TextArea from "antd/es/input/TextArea";
import {Divider} from "antd/lib";
import axiosInstance from "@/utils/axios";

const AdditionalSettings = () => {

    const [currentItem, setCurrentItem] = useState({});
    const [loading, setLoading] = useState(false);

    // 为了制造Upload而用(关于配图)
    const [aboutImageList, setAboutImageList] = useState([]);

    // 为了制造Upload而用(使命配图)
    const [missionImageList, setMissionImageList] = useState([]);

    // 为了制造Upload而用(Contact底图)
    const [contactImageList, setContactImageList] = useState([]);

    // 为了制造Upload而用(工厂配图)
    const [companyImageList, setCompanyImageList] = useState([]);

    // 为了制造Upload而用(资质图片)
    const [certificationImageList, setCertificationImageList] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true)
            const {code, msg, data} = await axiosInstance.get('/myapp/admin/basicAdditional/list');
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
        // 制造适合Upload的数据格式(关于配图)
        setAboutImageList(createImageList(initialData?.global_addition_about_image));

        // 制造适合Upload的数据格式(使命配图)
        setMissionImageList(createImageList(initialData?.global_addition_mission_image));

        // 制造适合Upload的数据格式(Contact底图)
        setContactImageList(createImageList(initialData?.global_addition_contact_image));

        // 制造适合Upload的数据格式(工厂配图)
        setCompanyImageList(createImageList(initialData?.global_addition_company_image));

        // 制造适合Upload的数据格式(资质图片)
        setCertificationImageList(createImageList(initialData?.ext02));
    }

    useEffect(() => {
        fetchData();
    }, []);


    const createImageList = (imageString) => {
        return imageString?.length > 0
            ? imageString.split("#").map((item) => ({
                success: true,
                name: item,
                status: 'done',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${item}`,
            }))
            : [];
    };

    const handleInputChange = (name, value) => {
        setCurrentItem((prev) => ({...prev, [name]: value}));
    }

    const handleSave = async () => {
        console.log(currentItem);
        try {
            const post_url = '/myapp/admin/basicAdditional/update';
            const formData = new FormData();
            formData.append('additional_mission', currentItem.additional_mission || '');
            formData.append('additional_about', currentItem.additional_about || '');
            formData.append('global_addition_about_image', currentItem.global_addition_about_image || '');
            formData.append('global_addition_mission_image', currentItem.global_addition_mission_image || '');
            formData.append('global_addition_contact_image', currentItem.global_addition_contact_image || '');
            formData.append('global_addition_company_image', currentItem.global_addition_company_image || '');
            formData.append('param_one_name', currentItem.param_one_name || '');
            formData.append('param_one_value', currentItem.param_one_value || '');
            formData.append('param_two_name', currentItem.param_two_name || '');
            formData.append('param_two_value', currentItem.param_two_value || '');
            formData.append('param_three_name', currentItem.param_three_name || '');
            formData.append('param_three_value', currentItem.param_three_value || '');
            formData.append('param_four_name', currentItem.param_four_name || '');
            formData.append('param_four_value', currentItem.param_four_value || '');
            formData.append('ext01', currentItem.ext01 || '');
            formData.append('ext02', currentItem.ext02 || '');

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
            <Spin spinning={loading}>
                <div className="px-6 py-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row gap-4">
                            <FormLabel title="关于企业"></FormLabel>
                            <TextArea
                                placeholder="请输入"
                                autoSize={{
                                    minRows: 6,
                                    maxRows: 10,
                                }}
                                showCount
                                maxLength={1000}
                                value={currentItem.additional_about}
                                onChange={(e) => handleInputChange("additional_about", e.target.value)}
                                style={{width: 800}}
                            />
                        </div>


                        <div className="flex flex-row gap-4">
                            <FormLabel title="关于配图"></FormLabel>
                            <ImageUpload maxCount={1}
                                         maxSize={2}
                                         accept="image/*"
                                         imageList={aboutImageList}
                                         onImageUploadChange={(imageUrlList)=>handleImageUploadChange(imageUrlList, 'global_addition_about_image')}/>
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormLabel title="企业使命"></FormLabel>
                            <TextArea
                                placeholder="请输入"
                                autoSize={{
                                    minRows: 6,
                                    maxRows: 10,
                                }}
                                showCount
                                maxLength={1000}
                                value={currentItem.additional_mission}
                                onChange={(e) => handleInputChange("additional_mission", e.target.value)}
                                style={{width: 800}}
                            />
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormLabel title="使命配图"></FormLabel>
                            <ImageUpload maxCount={1}
                                         maxSize={2}
                                         accept="image/*"
                                         imageList={missionImageList}
                                         onImageUploadChange={(imageUrlList)=>handleImageUploadChange(imageUrlList, 'global_addition_mission_image')}/>
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormLabel title="联系底图"></FormLabel>
                            <ImageUpload maxCount={1}
                                         maxSize={2}
                                         accept="image/*"
                                         imageList={contactImageList}
                                         onImageUploadChange={(imageUrlList)=>handleImageUploadChange(imageUrlList, 'global_addition_contact_image')}/>
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormLabel title="工厂图片"></FormLabel>
                            <ImageUpload maxCount={8}
                                         maxSize={2}
                                         accept="image/*"
                                         imageList={companyImageList}
                                         onImageUploadChange={(imageUrlList)=>handleImageUploadChange(imageUrlList, 'global_addition_company_image')}/>
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormLabel title="资质图片"></FormLabel>
                            <ImageUpload maxCount={8}
                                         maxSize={2}
                                         accept="image/*"
                                         imageList={certificationImageList}
                                         onImageUploadChange={(imageUrlList)=>handleImageUploadChange(imageUrlList, 'ext02')}/>
                        </div>

                        <div className="flex flex-row gap-4">
                            <FormLabel title="Hero文案"></FormLabel>
                            <Input placeholder="文案内容" value={currentItem.ext01}
                                   maxLength={100}
                                   onChange={(e) => handleInputChange("ext01", e.target.value)}
                                   style={{width: 400}}/>
                        </div>
                    </div>

                    <HeadLabel title="统计指标" />

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row gap-4">
                            <FormLabel title="指标1"></FormLabel>
                            <Input placeholder="指标名称" value={currentItem.param_one_name}
                                   onChange={(e) => handleInputChange("param_one_name", e.target.value)}
                                   style={{width: 150}}/>
                            <Input placeholder="指标值" value={currentItem.param_one_value}
                                   onChange={(e) => handleInputChange("param_one_value", e.target.value)}
                                   style={{width: 150}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="指标2"></FormLabel>
                            <Input placeholder="指标名称" value={currentItem.param_two_name}
                                   onChange={(e) => handleInputChange("param_two_name", e.target.value)}
                                   style={{width: 150}}/>
                            <Input placeholder="指标值" value={currentItem.param_two_value}
                                   onChange={(e) => handleInputChange("param_two_value", e.target.value)}
                                   style={{width: 150}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="指标3"></FormLabel>
                            <Input placeholder="指标名称" value={currentItem.param_three_name}
                                   onChange={(e) => handleInputChange("param_three_name", e.target.value)}
                                   style={{width: 150}}/>
                            <Input placeholder="指标值" value={currentItem.param_three_value}
                                   onChange={(e) => handleInputChange("param_three_value", e.target.value)}
                                   style={{width: 150}}/>
                        </div>
                        <div className="flex flex-row gap-4">
                            <FormLabel title="指标4"></FormLabel>
                            <Input placeholder="指标名称" value={currentItem.param_four_name}
                                   onChange={(e) => handleInputChange("param_four_name", e.target.value)}
                                   style={{width: 150}}/>
                            <Input placeholder="指标值" value={currentItem.param_four_value}
                                   onChange={(e) => handleInputChange("param_four_value", e.target.value)}
                                   style={{width: 150}}/>
                        </div>
                    </div>

                    <Divider />

                    <div className="pb-6 flex flex-row gap-4 justify-start">
                        <Button type="primary" onClick={handleSave}>提交</Button>
                    </div>
                </div>
            </Spin>

        </>
    );
}

export default AdditionalSettings;