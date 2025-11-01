'use client'
import Link from 'next/link';
import Image from 'next/image';
import lang from "@/locales";
import React from "react";



// 分类卡片组件
function CategoryCard({category}) {
    return (
        <Link href={`/product/category/${category.id}`} className="block group">
            <div className="relative overflow-hidden mb-3" style={{ paddingBottom: '100%' }}>
                <div className="absolute w-full h-full top-0 left-0 inset-0 rounded-3xl overflow-hidden">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${category.cover}`}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-125"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {/* 蒙层 */}
                    <div className="absolute inset-0 ">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-black/30 group-hover:w-[200%] group-hover:h-[200%] transition-all duration-1000"></div>
                    </div>
                    <div
                        className="bg-gradient-to-b from-black/0 to-black/30 text-white w-full text-[16px] text-center flex justify-center items-center font-semibold min-h-[60px] absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
                        {category.title}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function OurCategories({categoryData}) {
    return (
        <div className="py-12 bg-mainColorLight">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 标题区域 */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 uppercase">{lang.OurCategories}</h2>
                    <div className="w-[60px] h-[2px] bg-mainColorNormal mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categoryData?.slice(0, 4).map((category) => (
                        <CategoryCard key={category.id} category={category}/>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/product"
                        className="inline-flex items-center rounded-full px-6 py-3 bg-mainColorNormal text-white font-medium hover:bg-mainColorDeep transition-colors duration-300"
                    >
                        {lang.AllCategories || 'View More'}
                        <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}