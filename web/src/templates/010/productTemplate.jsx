import ProductList from "@/components/index/sections/template10/productList";
import BannerB from "@/components/index/sections/bannerB";

export default function ProductTemplate({
                                            bannerData,
                                            categoryId,
                                            pageNumber,
                                            total,
                                            categoryData,
                                            productData,
                                            featuredData,
                                            searchQuery
                                        }) {
    return (
        <div className="">
            <div className="w-full h-[200px]">
                <BannerB title="Products" titleLink="/product" bannerData={bannerData}/>
            </div>

            <ProductList
                categoryId={categoryId}
                pageNumber={pageNumber}
                total={total}
                categoryData={categoryData}
                productData={productData}
                featuredData={featuredData}
                searchQuery={searchQuery}
            />

        </div>
    );
}
