import React, {useEffect, useState} from 'react';
import {
  AppstoreOutlined, CompassOutlined, DownloadOutlined, FileOutlined, FileWordOutlined, FunnelPlotOutlined,
  HomeOutlined,
  MailOutlined,
  ProductOutlined,
  SettingOutlined, TableOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import {useSelector} from "react-redux";
import Image from "next/image";
import LogoIcon from "/public/admin/logo.png";

const items = [
  {
    key: '/admin/main',
    label: '总览',
    icon: <HomeOutlined />,
  },
  {
    key: '/admin/products',
    label: '产品中心',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/admin/news',
    label: '新闻管理',
    icon: <FileWordOutlined />,
  },
  // {
  //   key: '/admin/about',
  //   label: '关于管理',
  //   icon: <ProductOutlined />,
  // },
  {
    key: '/admin/case',
    label: '案例管理',
    icon: <FunnelPlotOutlined />,
  },
  {
    key: '/admin/download',
    label: '下载管理',
    icon:  <DownloadOutlined />,
  },
  {
    key: '/admin/faq',
    label: 'FAQ管理',
    icon: <CompassOutlined />,
  },
  {
    key: '/admin/inquiry',
    label: '询盘管理',
    icon: <MailOutlined />,
  },
  {
    key: '/admin/basicInfo',
    label: '基本信息',
    icon: <SettingOutlined />,
  },
  {
    key: '/admin/user',
    label: '账号管理',
    icon: <UserOutlined />,
  },
  {
    key: '/admin/log',
    label: '网站日志',
    icon: <TableOutlined />,
  },
];
const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [current, setCurrent] = useState(pathname);

  const adminApp = useSelector((state) => state.adminSetting);

  useEffect(()=>{
    setCurrent(pathname);
  },[pathname])

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  console.log('sidebar path------',current)

  return (
    <>
      <div className={`bg-adminPrimaryColor flex flex-col`}>
        <div className="flex items-center justify-center px-4 py-5 border-b border-white/10">
          <div className="flex items-center">
            <div className="relative flex items-center justify-center h-9 w-9 bg-white/10 shadow-inner">
              <Image
                src={LogoIcon}
                alt="管理系统Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            {
              !adminApp.collapsed && (
                <>
                  <div className="ml-3 flex flex-col">
                    <div className="font-semibold text-white text-base tracking-wide">后台管理</div>
                    <div className="text-white/60 min-w-[90px] text-xs mt-0.5">Enterprise CMS</div>
                  </div>
                </>
              )
            }
          </div>
        </div>
        <Menu
            theme="dark"
            onClick={onClick}
            style={{
              maxWidth: 280,
            }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            inlineCollapsed={adminApp.collapsed}
            items={items}
        />
      </div>

    </>
  );
};
export default SideBar;