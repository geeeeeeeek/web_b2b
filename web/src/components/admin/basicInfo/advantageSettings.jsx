'use client';
import FormLabel from "@/components/admin/formLabel";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Input, message, Pagination, Popconfirm, Radio, Space, Spin, Table} from 'antd';
import axiosInstance from "@/utils/axios";
import {useDispatch, useSelector} from "react-redux";
import AdvantageModal from "@/components/admin/basicInfo/advantageModal";

const AdvantageSettings = () => {

    const adminApp = useSelector((state) => state.adminSetting);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    // 分页变量
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const columns = [
        {
            title: '图标',
            dataIndex: 'advantage_image',
            key: 'advantage_image',
            width: '100px',
            render: (text) => (
                <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${text}`} alt="advantage_image" style={{width: '60px', height: '60px'}}/>
            ),
        },
        {
            title: '标题',
            dataIndex: 'advantage_title',
            key: 'advantage_title',
            width: '120px',
            textWrap: 'word-break',
        },
        {
            title: '描述',
            dataIndex: 'advantage_description',
            key: 'advantage_description',
            width: '300px',
            textWrap: 'word-break',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            width: '180px',
            render: (_, item) => (
                <Space size="middle">
                    <a className="text-adminPrimaryColor" onClick={() => openModal(item)}>编辑</a>
                    <Popconfirm
                        title="确定删除？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => deleteRecord([item.id])}
                    >
                        <a className="text-adminPrimaryColor" >删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchData = async (page, pageSize) => {
        try {
            setLoading(true);
            const params = {
                page: page,
                pageSize: pageSize,
            };
            const {code,total, data} = await axiosInstance.get('/myapp/admin/advantage/list',{params});
            if (code === 0) {
                setDataList(data)
                setTotal(total)
                setPage(page);
                setPageSize(pageSize);
            } else {
                message.error("数据获取失败")
            }
            setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData(page, pageSize);
    }, [])


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const openModal = (item) => {
        setModalIsOpen(true);
        setCurrentItem(item)
    };

    const closeModal = (shouldRefresh) => {
        setModalIsOpen(false);
        setCurrentItem(null);
        if (shouldRefresh) {
            fetchData(page, pageSize);
        }
    };

    const deleteRecord = async (selected_ids) => {
        try {
            const {code, data} = await axiosInstance.post('/myapp/admin/advantage/delete', {ids: selected_ids.join(',')});
            if (code === 0) {
                message.success("删除成功")
                if (dataList.length === 1 && page > 1) {
                    fetchData(page - 1, pageSize);
                } else {
                    fetchData(page, pageSize);
                }
            } else {
                message.error("删除失败")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const handleChangePage = (page, pageSize) => {
        fetchData(page, pageSize);
    }

    return (
        <>

            <div className="bg-white">
                <div>
                    <Spin spinning={loading} tip="">
                        <div className=" px-4 py-4 flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <Button type="primary" onClick={() => openModal({sort: 0})}>新增</Button>
                                <Popconfirm
                                    title="确定删除？"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={() => deleteRecord(selectedRowKeys)}
                                >
                                    <Button disabled={!selectedRowKeys.length > 0 }>删除</Button>
                                </Popconfirm>
                            </div>
                            <Table columns={columns}
                                   dataSource={dataList}
                                   size="middle"
                                   rowSelection={rowSelection}
                                   rowKey={(record) => record.id}
                                   pagination={false}
                                   scroll={{ x: 'max-content' }}
                                   showSizeChanger={false}
                            />

                            <div className="p-4">
                                <Pagination align='end'
                                            current={page}
                                            pageSize={pageSize}
                                            total={total}
                                            showTotal={(total) => `共 ${total} 条`}
                                            onChange={handleChangePage}
                                />
                            </div>
                        </div>
                    </Spin>
                </div>
            </div>


            <AdvantageModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                initialItem={currentItem}
            />

        </>
    );
}

export default AdvantageSettings;