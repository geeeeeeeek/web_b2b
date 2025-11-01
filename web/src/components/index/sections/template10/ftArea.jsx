import {TruckIcon, HeadphonesIcon, ShieldCheckIcon, RefreshCwIcon} from 'lucide-react';
import lang from "@/locales";

export default function FtArea() {
    // 数据变量
    const facilityItems = [
        {
            icon: <ShieldCheckIcon className="w-8 h-8 text-gray-900"/>,
            title: lang.FtOneTitle,
            description: lang.FtOneTip
        },
        {
            icon: <TruckIcon className="w-8 h-8 text-gray-900"/>,
            title: lang.FtTwoTitle,
            description: lang.FtTwoTip
        },
        {
            icon: <RefreshCwIcon className="w-8 h-8 text-gray-900"/>,
            title: lang.FtThreeTitle,
            description: lang.FtThreeTip
        },
        {
            icon: <HeadphonesIcon className="w-8 h-8 text-gray-900"/>,
            title: lang.FtFourTitle,
            description: lang.FtFourTip
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 grid-cols-2 lg:grid-cols-4">
                    {facilityItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="bg-mainColorLight rounded-full p-6 mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}