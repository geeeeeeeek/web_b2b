'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {Navigation, Autoplay, Pagination, EffectFade} from "swiper/modules";
import lang from '@/locales';
import { useRouter } from 'next/navigation';

const Carousel = ({bannerData, heroText}) => {
    const coverArr = bannerData ? bannerData.split('#') : [];
    const router = useRouter();

    const colorValue = "bg-mainColorNormalAlpha-50 hover:bg-mainColorNormal text-white hover:text-white backdrop-blur-sm";
    const commonStyle = "z-10 absolute flex items-center justify-center transform -translate-y-1/2 w-[40px] h-[40px] focus:outline-none transition-all duration-300 ease-in-out hidden md:block";

    const handleSlideClick = () => {
        router.push('/product');
    };

    return (
        <div className="relative w-full h-full bg-gray-300">
            <Swiper
                className="w-full h-full"
                modules={[Navigation, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    waitForTransition: false,
                }}
                speed={800}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                loop={true}
                allowTouchMove={true}
                preventInteractionOnTransition={true}
                watchSlidesProgress={true}
                observer={true}
                observeParents={true}
            >
                {coverArr.map((image, index) => (
                    <SwiperSlide key={index} onClick={handleSlideClick} className="cursor-pointer">
                        <div className="block relative w-full h-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${image}`}
                                alt="Hero Section"
                                fill
                                sizes="100vw"
                                className="object-cover"
                                quality={90}
                                priority={index === 0}
                            />
                            {/*蒙层 - 只在有 heroText 时显示 */}
                            {heroText && <div className="absolute inset-0 bg-black/15"></div>}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* 导航按钮 - 提高层级 */}
            {
                coverArr.length > 1 ? (
                    <>
                        <button
                            className={`custom-prev top-1/2 left-0 ${commonStyle} ${colorValue} z-20`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5 mx-auto"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>
                        <button
                            className={`custom-next top-1/2 right-0 ${commonStyle} ${colorValue} z-20`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-5 h-5 mx-auto"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </>
                ) : null
            }
            {/* 文本区域 - 只在有 heroText 时显示 */}
            {heroText && (
                <div className="absolute w-full h-full top-0 left-0 inset-0 flex items-center justify-center z-[5] pointer-events-none">
                    <div className="text-center p-4 sm:p-6 md:p-8 rounded-lg max-w-2xl">
                        <h1 className="text-white text-xl sm:text-2xl md:text-5xl font-bold mt-8 mb-3 md:mb-8 tracking-wide ">
                            <div className="md:leading-[3.5rem]">
                                {heroText}
                            </div>
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;