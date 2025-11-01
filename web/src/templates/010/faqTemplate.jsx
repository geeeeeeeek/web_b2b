import FaqList from "@/components/index/sections/faqList";
import BannerB from "@/components/index/sections/bannerB";

export default function FaqTemplate({bannerData, faqData}){
    return (
        <div className="bg-white">
            <div className="w-full h-[200px]">
                <BannerB title="Faq" titleLink="/faq" bannerData={bannerData}/>
            </div>

            <FaqList faqData={faqData} />

        </div>
    );
}
