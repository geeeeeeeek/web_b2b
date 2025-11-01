import Link from 'next/link';
import Image from 'next/image';
import lang from "@/locales";
import React from "react";

// 产品卡片组件
function ProductCard({ product }) {
    // 提取第一张图片
    const cover = product.cover ? product.cover.split('#')[0] : '';
    return (
        <div className="group">
            <div className="relative mb-4 overflow-hidden bg-gray-100" style={{ paddingBottom: '100%' }}>
                <Link href={`/product/${product.id}`}>
                    <div className="absolute w-full h-full top-0 left-0 transition-transform duration-700 group-hover:scale-110">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${cover}`}
                            alt={product.title}
                            fill
                            quality={90}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    </div>
                </Link>
            </div>

            <h3 className="text-base md:text-lg font-medium text-center">
                <Link href={`/product/${product.id}`} className="hover:text-mainColorNormal transition-colors">
                    {product.title}
                </Link>
            </h3>
        </div>
    );
}

export default function FeaturedProducts({featuredData}) {
    return (
        <div className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 uppercase">{lang.PopularProducts}</h2>
                    <div className="w-[60px] h-[2px] bg-mainColorNormal mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-5 lg:gap-y-10">
                    {featuredData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/product"
                        className="inline-flex items-center rounded-full px-6 py-3 bg-mainColorNormal text-white font-medium hover:bg-mainColorDeep transition-colors duration-300"
                    >
                        {lang.AllProducts}
                        <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}