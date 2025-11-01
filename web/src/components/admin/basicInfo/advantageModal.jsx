'use client';
import React, {useEffect, useState} from "react";
import {Button, Divider, Input, InputNumber, message, Modal, Spin} from "antd";
import FormLabel from "@/components/admin/formLabel";
import axiosInstance from "@/utils/axios";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "@/components/admin/imageUpload";

const AdvantageModal = ({isOpen, onRequestClose, initialItem}) => {
    const [currentItem, setCurrentItem] = useState(initialItem || {});
    const [imageList, setImageList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCurrentItem(initialItem || {});

        // 制造适合Upload的数据格式
        if (initialItem?.advantage_image?.length > 0) {
            setImageList(initialItem?.advantage_image?.split("#").map((item) => ({
                success: true,
                name: item,
                status: 'done',
                url: process.env.NEXT_PUBLIC_BASE_URL + '/upload/img/' + item,
            })));
        } else {
            setImageList([]);
        }

    }, [initialItem]);


    const handleInputChange = (name, value) => {
        setCurrentItem((prev) => ({...prev, [name]: value}));
    };

    const handleImageUploadChange = (imageUrlList) => {
        let cover = (imageUrlList && imageUrlList.length > 0) ? imageUrlList.join("#") : null;
        setCurrentItem((prev) => ({...prev, advantage_image: cover}));
    };

    const handleSave = async () => {
        try {
            const post_url = currentItem.id ? '/myapp/admin/advantage/update' : '/myapp/admin/advantage/create';
            const formData = new FormData();
            if (currentItem.id) {
                formData.append('id', currentItem.id);
            }
            if(!currentItem.advantage_title){
                message.error('不能为空')
                return;
            }
            if(!currentItem.advantage_image){
                message.error('图标不能为空')
                return;
            }
            formData.append('advantage_image', currentItem.advantage_image || '');
            formData.append('advantage_title', currentItem.advantage_title || '');
            formData.append('advantage_description', currentItem.advantage_description || '');
            setLoading(true);
            const {code, msg, data} = await axiosInstance.post(post_url, formData);
            if (code === 0) {
                message.success("操作成功")
                onRequestClose(true);
            } else {
                message.error(msg || '网络异常')
            }
            setLoading(false);
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    };

    console.log('current-----------', currentItem)


    return (
        <Modal
            title={currentItem.id ? '编辑' : '新增'}
            centered
            open={isOpen}
            onCancel={() => onRequestClose(false)}
            footer={null}
            width={900}
        >

            <Spin spinning={loading} tip="">
                <div className="flex flex-col">
                    <div className="">
                        <div className="">
                            <div className="flex flex-col gap-4 pt-4 pb-0">
                                <div className="flex flex-row gap-4">
                                    <FormLabel title="图标" required={true}></FormLabel>
                                    <ImageUpload maxCount={1}
                                                 maxSize={2}
                                                 accept="image/*"
                                                 imageList={imageList}
                                                 onImageUploadChange={handleImageUploadChange}/>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <FormLabel title="标题" required={true}></FormLabel>
                                    <Input placeholder="请输入" value={currentItem.advantage_title}
                                           onChange={(e) => handleInputChange("advantage_title", e.target.value)}
                                           style={{width: 600}}/>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <FormLabel title="描述" required={true}></FormLabel>
                                    <TextArea
                                        placeholder="请输入摘要"
                                        autoSize={{
                                            minRows: 3,
                                            maxRows: 6,
                                        }}
                                        showCount
                                        maxLength={200}
                                        value={currentItem.advantage_description}
                                        onChange={(e) => handleInputChange("advantage_description", e.target.value)}
                                        style={{width: 600}}
                                    />
                                </div>

                            </div>

                            <Divider/>


                            <div className="flex flex-row gap-4 justify-start">
                                <Button type="primary" onClick={handleSave}>提交</Button>
                                <Button onClick={() => onRequestClose(false)}>取消</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </Modal>

    );
};

export default AdvantageModal;