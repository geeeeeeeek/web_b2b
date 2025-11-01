'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import lang from "@/locales";

export default function Certification({ certificationImageData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    // 处理图片数据
    let dataList = certificationImageData?.split("#").filter(item => item.trim()) || [];
    
    // 打开图片模态框
    const openModal = (image, index) => {
        setCurrentImage(image);
        setCurrentIndex(index);
        setModalOpen(true);
        // 使用 requestAnimationFrame 确保状态更新和动画同步
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
        document.body.style.overflow = "hidden";
    };
    
    // 关闭图片模态框
    const closeModal = () => {
        setIsVisible(false);
        // 等待动画完成后再关闭模态框
        setTimeout(() => {
            setModalOpen(false);
            document.body.style.overflow = "auto";
        }, 300);
    };
    
    // 处理ESC键关闭模态框
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    // 添加键盘事件监听
    useEffect(() => {
        if (modalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalOpen]);
    
    // 切换到下一张图片
    const nextImage = (e) => {
        if (e) e.stopPropagation();
        const newIndex = (currentIndex + 1) % dataList.length;
        setCurrentIndex(newIndex);
        setCurrentImage(`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${dataList[newIndex]}`);
    };
    
    // 切换到上一张图片
    const prevImage = (e) => {
        if (e) e.stopPropagation();
        const newIndex = (currentIndex - 1 + dataList.length) % dataList.length;
        setCurrentIndex(newIndex);
        setCurrentImage(`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${dataList[newIndex]}`);
    };

    return (
        <section className="pt-10 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="h-1 w-20 bg-gradient-to-r from-mainColorNormal to-mainColorNormalAlpha-50 mx-auto mb-6"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{lang.Certification}</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-4 px-4">
                        {lang.CertificationTip}
                    </p>
                </div>

                {/* 图片网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {dataList.map((item, index) => (
                        <div 
                            key={index} 
                            className="group bg-white cursor-pointer relative rounded-md"
                            onClick={() => openModal(`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${item}`, index)}
                            style={{
                                opacity: 0,
                                transform: 'translateY(20px)',
                                animation: `fadeInUp 0.3s ease forwards ${index * 0.1}s`
                            }}
                        >
                            {/* 外层灰色边框 */}
                            <div className="absolute w-full h-full top-0 left-0 inset-0 rounded-md border-4 border-gray-200 shadow-sm pointer-events-none z-20"></div>
                            <div className="relative w-full box-content" style={{ paddingBottom: '100%' }}>
                                <div className="absolute w-full h-full top-0 left-0 bg-gray-200 overflow-hidden ">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${item}`}
                                        alt={`Certification Image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                                        priority={index === 0}
                                        className="object-contain overflow-hidden p-4"
                                        style={{
                                            position: 'absolute',
                                            height: '100%',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 图片查看模态框 */}
            {modalOpen && (
                <div 
                    className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[66] flex items-center justify-center p-4 transition-opacity duration-300 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={closeModal}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                >
                    {/* 关闭按钮 */}
                    <button 
                        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 z-50 transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                        }}
                        aria-label="Close preview"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {/* 上一张按钮 */}
                    <button 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 text-white z-50 transition-all"
                        onClick={prevImage}
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    {/* 下一张按钮 */}
                    <button 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 text-white z-50 transition-all"
                        onClick={nextImage}
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    
                    {/* 图片容器 */}
                    <div 
                        className={`relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center transition-all duration-300 ${
                            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={currentImage} 
                            alt="Enlarged factory image" 
                            className="max-h-[90vh] max-w-full object-contain"
                        />
                    </div>
                </div>
            )}

            {/* 添加自定义动画样式 */}
            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}