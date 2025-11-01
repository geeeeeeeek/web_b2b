import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/index/sections/pagination';
import lang from "@/locales";
import CategoryItem from "@/components/index/sections/template10/categoryItem";

// 判断是否属于一级分类
function isFirstCategory(categoryData, targetId) {
    return categoryData.some(item => item.id === targetId && item.pid === -1);
}

// 判断是否有下级
function hasChildren(categoryData, id) {
    const item = categoryData.find(item => item.id === id);
    return Array.isArray(item && item.children) && item.children.length > 0;
}

// 查账父元素
function findParent(categoryData, id) {
    // 遍历顶层，查找子节点
    for (const item of categoryData) {
        if (Array.isArray(item.children)) {
            // 看children数组中有没有id匹配
            if (item.children.some(child => child.id === id)) {
                return item; // 找到父级
            }
        }
    }
    // 如果没找到父级（说明该id要么是顶层，要么不存在）
    return null;
}

// 分类组件
export default function ProductList({ categoryId, pageNumber, total, pageSize, categoryData, productData, featuredData, searchQuery }) {

    let currentCategory = '-1';
    if(categoryId){
        currentCategory = categoryId;
    }

    // 构建基础链接前缀，不包含页码部分
    let linkPrefix = '/product';

    // 添加分类部分，如果存在
    if (currentCategory) {
        linkPrefix += `/category/${currentCategory}`;
    }

    // 添加页码路径前缀
    linkPrefix += '/page';

    // 如果有搜索查询，我们需要在每个分页链接中保持它
    const searchSuffix = searchQuery ? `?s=${encodeURIComponent(searchQuery)}` : '';

    let mCategoryData = null;

    // 是一级分类并且含有子分类的情况
    if(currentCategory && currentCategory !== '-1' && hasChildren(categoryData, Number(currentCategory))) {
        let data = categoryData.find(item => item.id === Number(currentCategory))
        mCategoryData = data.children;
        mCategoryData.unshift({
            id: data.id,
            title: lang.All
        })
    }
    // 不是一级分类的情况
    else if(currentCategory && currentCategory !== '-1' && !isFirstCategory(categoryData, Number(currentCategory))){
        let data = findParent(categoryData, Number(currentCategory))
        mCategoryData = data.children
        mCategoryData.unshift({
            id: data.id,
            title: lang.All
        })
    }else{
        // 是一级分类并且不含有子分类的情况
        mCategoryData = categoryData;
        mCategoryData.unshift({
            id: -1,
            title: lang.All
        })
    }




    return (
        <div className="bg-white pb-12">
            <div className="max-w-7xl mx-auto px-4">

                <div className="w-full bg-white p-0">

                    {/*分类标签*/}

                    <div className="flex flex-row flex-wrap justify-center items-center my-12 md:my-16">
                        {
                            mCategoryData.map((category, index) => (
                                // mr-6 是兼容旧浏览器写法
                                <div key={category.id} className={index !== mCategoryData.length - 1 ? "mr-6" : ""}>
                                    <CategoryItem
                                        category={category}
                                        currentCategoryId={Number(currentCategory)}
                                    />
                                </div>
                            ))}
                    </div>

                    {/* 产品网格 */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                        {productData.map((product) => {

                            // 提取第一张图片
                            const cover = product.cover ? product.cover.split('#')[0] : '';
                            return (
                                <div key={product.id} className="group bg-white">
                                    <Link href={`/product/${product.id}`}>
                                        <div className="relative mb-6 overflow-hidden">
                                            <div className="relative w-full pt-[100%]">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${cover}`}
                                                    alt={product.title}
                                                    fill
                                                    quality={90}
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-gray-800 font-medium text-base md:text-lg mb-2 group-hover:text-mainColorNormal transition-colors duration-300">{product.title}</h3>
                                        </div>
                                    </Link>
                                </div>
                            )})}
                    </div>

                    {/* 分页 */}
                    <div className="mt-10 flex justify-center">
                        <Pagination
                            currentPage={pageNumber}
                            linkPrefix={linkPrefix}
                            total={total}
                            pageSize={pageSize}
                            searchSuffix={searchSuffix} />
                    </div>
                </div>
            </div>
        </div>
    );
}