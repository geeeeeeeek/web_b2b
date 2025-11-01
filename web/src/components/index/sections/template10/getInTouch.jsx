'use client'
import React, {useState, useEffect, useRef} from 'react';
import api from "@/utils/axios";
import lang from '@/locales';
import Wechat from "@/components/index/sections/wechat";

export default function GetInTouch({contactData}) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [alertState, setAlertState] = useState({
        open: false,
        title: '',
        description: '',
        variant: 'default' // 'default' or 'destructive'
    });

    const alertRef = useRef(null);

    // 处理点击外部关闭对话框
    useEffect(() => {
        function handleClickOutside(event) {
            if (alertRef.current && !alertRef.current.contains(event.target)) {
                closeAlert();
            }
        }

        // 处理 ESC 键关闭对话框
        function handleEscKey(event) {
            if (event.key === 'Escape') {
                closeAlert();
            }
        }

        if (alertState.open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [alertState.open]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const showAlert = (title, description, variant = 'default') => {
        setAlertState({
            open: true,
            title,
            description,
            variant
        });
    };

    const closeAlert = () => {
        setAlertState(prev => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 基本验证
        if (!formData.name || !formData.email || !formData.message) {
            showAlert('Validation Failed', 'Please fill in all required fields (Name, Email, and Message)', 'destructive');
            return;
        }

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Validation Failed', 'Please enter a valid email address', 'destructive');
            return;
        }

        try {
            setLoading(true);
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('tel', formData.phone);
            submitData.append('message', formData.message);

            const { code, msg } = await api.post('/myapp/index/inquiry/create', submitData);

            if (code === 0) {
                showAlert('Success', 'We will contact you as soon as possible', 'default');
                // 重置表单
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                });
            } else {
                showAlert('Failed', msg || 'Please try again later', 'destructive');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showAlert('Submission Failed', 'Please check your network connection', 'destructive');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-mainColorLight py-16 lg:py-24">
            {/* 自定义 Alert Dialog */}
            {alertState.open && (
                <div className="fixed w-full h-full top-0 left-0 inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div 
                        ref={alertRef}
                        className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-100"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="alert-title"
                    >
                        <div className="p-6">
                            <h3 
                                id="alert-title"
                                className={`text-lg font-semibold mb-2 ${
                                    alertState.variant === 'destructive' ? 'text-red-600' : 'text-gray-900'
                                }`}
                            >
                                {alertState.title}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {alertState.description}
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={closeAlert}
                                    className={`px-4 py-2 rounded-sm text-white transition-colors ${
                                        alertState.variant === 'destructive' 
                                            ? 'bg-red-600 hover:bg-red-700' 
                                            : 'bg-mainColorNormal hover:bg-mainColorDeep'
                                    }`}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div
                        className="h-1 w-20 bg-gradient-to-r from-mainColorNormal to-mainColorNormalAlpha-50 mx-auto mb-6"></div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">{lang.GetInTouch}</h2>
                    <p className="text-gray-700 max-w-3xl mx-auto mb-4 px-4">
                        {lang.GetInTouchTip}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white overflow-hidden shadow-xl rounded-sm">
                        
                        {/* 左侧联系信息 */}
                        <div className="bg-gray-50 p-8 lg:p-12 relative">

                            <div className="h-full flex flex-col relative z-10">
                                <h3 className="text-xl font-semibold text-gray-900 mb-8 flex items-center">
                                    <svg className="w-5 h-5 text-mainColorNormal mr-2" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {lang.ContactInformation}
                                </h3>

                                <div className="space-y-8 mb-auto relative z-10">
                                    {/* 邮箱 */}
                                    <div className="flex">
                                        <div
                                            className="w-12 h-12 rounded-full bg-mainColorLight flex items-center justify-center mr-4 shrink-0">
                                            <svg className="w-6 h-6 text-mainColorNormal" fill="none"
                                                 stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium uppercase mb-1">{lang.Email}</p>
                                            <a href={'mailto:' + contactData.global_email}
                                               className="text-gray-900 hover:text-mainColorNormal font-medium text-base transition-colors">{contactData.global_email}</a>
                                        </div>
                                    </div>

                                    {/* 电话 */}
                                    <div className="flex">
                                        <div
                                            className="w-12 h-12 rounded-full bg-mainColorLight flex items-center justify-center mr-4 shrink-0">
                                            <svg className="w-6 h-6 text-mainColorNormal" fill="none"
                                                 stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium uppercase mb-1">
                                                {lang.PhoneNumber}
                                            </p>
                                            <a href={`tel:${contactData.global_phone}`}
                                               className="text-gray-900 hover:text-mainColorNormal font-medium text-base transition-colors">{contactData.global_phone}</a>
                                        </div>
                                    </div>

                                    {/* 地址 */}
                                    <div className="flex">
                                        <div
                                            className="w-12 h-12 rounded-full bg-mainColorLight flex items-center justify-center mr-4 shrink-0">
                                            <svg className="w-6 h-6 text-mainColorNormal" fill="none"
                                                 stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium uppercase mb-1">
                                                {lang.Address}
                                            </p>
                                            <p className="text-gray-900 font-medium">{contactData.global_address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 社交媒体 - 确保最高的z-index */}
                                <div className="mt-10 pt-8 border-t border-gray-200 relative z-20">
                                    <p className="text-gray-700 font-semibold mb-4">{lang.FollowUs}:</p>
                                    <div className="flex space-x-5">
                                        {/* Facebook */}
                                        {contactData.global_facebook?.length > 0 && (
                                            <a href={contactData.global_facebook}
                                               target="_blank"
                                               className="text-gray-700 hover:text-mainColorNormal transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd"
                                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        )}

                                        {/* Twitter */}
                                        {contactData.global_twitter?.length > 0 && (
                                            <a href={contactData.global_twitter}
                                               target="_blank"
                                               className="text-gray-700 hover:text-mainColorNormal transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                                    />
                                                </svg>
                                            </a>
                                        )}

                                        {/* Instagram */}
                                        {contactData.global_instagram?.length > 0 && (
                                            <a href={contactData.global_instagram}
                                               target="_blank"
                                               className="text-gray-700 hover:text-mainColorNormal transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd"
                                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        )}

                                        {/* LinkedIn */}
                                        {contactData.global_linkedin?.length > 0 && (
                                            <a href={contactData.global_linkedin}
                                               target="_blank"
                                               className="text-gray-700 hover:text-mainColorNormal transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                                    />
                                                </svg>
                                            </a>
                                        )}

                                        {/* YouTube */}
                                        {contactData.global_youtube?.length > 0 && (
                                            <a href={contactData.global_youtube}
                                               target="_blank"
                                               className="text-gray-700 hover:text-mainColorNormal transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                                                    />
                                                </svg>
                                            </a>
                                        )}

                                        {/* WhatsApp */}
                                        {contactData.global_whatsapp?.length > 0 && (
                                            <a href={contactData.global_whatsapp}
                                               target="_blank"
                                               className="text-gray-700 hover:text-mainColorNormal transition-colors">
                                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                        
                                        {/* WeChat */}
                                        {contactData.global_wechat?.length > 0 && (
                                            <Wechat
                                                wechatId={contactData.global_wechat}
                                                qrCodeImage={contactData.global_wechat_qrcode}
                                                iconSize="h-6 w-6"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        {/* 右侧联系表单 */}
                        <div className="p-8 lg:p-12">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <svg className="w-5 h-5 text-mainColorNormal mr-2" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                                {lang.SendUsAMessage}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={lang.YourName}
                                        className="w-full px-4 py-3 border border-gray-200 focus:outline-none transition-colors duration-200 rounded-sm"

                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={lang.YourEmail}
                                            className="w-full px-4 py-3 border border-gray-200 focus:outline-none transition-colors duration-200 rounded-sm"

                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={lang.PhoneNumber}
                                            className="w-full px-4 py-3 border border-gray-200 focus:outline-none transition-colors duration-200 rounded-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={lang.YourMessage}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-200 focus:outline-none transition-colors duration-200 rounded-sm"

                                    ></textarea>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-mainColorNormal hover:bg-mainColorDeep text-white font-medium py-3 px-10 uppercase tracking-wide transition-colors duration-200 text-sm inline-flex items-center rounded-sm"
                                    >
                                        {loading ? 'Sending...' : lang.SendMessage}
                                        <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}