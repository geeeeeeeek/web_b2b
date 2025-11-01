
import RecommendedForYou from "@/components/index/sections/recommendedForYou";
import Banner from "@/components/index/sections/banner";
import GetInTouch from "@/components/index/sections/template10/getInTouch";
import BannerB from "@/components/index/sections/bannerB";

export default function ContactTemplate({bannerData, contactData, recommendData}){
    return (
        <div className="flex flex-col">
            <div className="w-full h-[200px]">
                <BannerB title="Contact Us" titleLink="/contact" bannerData={bannerData}/>
            </div>

            <GetInTouch contactData={contactData}/>

            {
                recommendData?.length > 0 && (
                    <RecommendedForYou recommendData={recommendData}/>
                )
            }

        </div>
    );
}