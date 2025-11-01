
import Carousel from "@/components/index/sections/template10/carousel";
import FtArea from "@/components/index/sections/template10/ftArea";
import OurCategories from "@/components/index/sections/template10/ourCategories";
import FeaturedProducts from "@/components/index/sections/template10/featuredProducts";
import CompanyNews from "@/components/index/sections/template10/companyNews";
import AboutUs from "@/components/index/sections/template10/aboutUs";
import CustomersSay from "@/components/index/sections/template10/customersSay";


export default function HomeTemplate({
                                         bannerData,
                                         featuredData,
                                         categoryData,
                                         aboutData,
                                         companyName,
                                         statsData,
                                         commentData,
                                         newsData,
                                         heroText
                                     }) {
    return (
        <div className="flex flex-col">


            {
                bannerData?.length > 0 && (
                    <div className="w-full h-[200px] md:h-[calc((100vh-80px)_/_2)] lg:h-[500px]">
                        <Carousel bannerData={bannerData} heroText={heroText}/>
                    </div>
                )
            }



            {
                categoryData?.length > 0 && (
                    <OurCategories categoryData={categoryData}/>
                )
            }

            {
                featuredData?.length > 0 && (
                    <FeaturedProducts featuredData={featuredData}/>
                )
            }


            <AboutUs aboutData={aboutData} companyName={companyName} statsData={statsData}/>

            {
                commentData && commentData.length > 0 && (
                     <CustomersSay commentData={commentData}/>
                )
            }


            {
                newsData?.length > 0 && (
                    <CompanyNews newsData={newsData}/>
                )
            }



        </div>
    );
}
