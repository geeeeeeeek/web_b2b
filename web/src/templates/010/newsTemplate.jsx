import NewsList from "@/components/index/sections/newsList";
import BannerB from "@/components/index/sections/bannerB";

export default function NewsTemplate({bannerData, pageNumber, total, newsData}){
    return (
        <div className="bg-mainColorLight">
            <div className="w-full h-[200px]">
                <BannerB title="News" titleLink="/news" bannerData={bannerData}/>
            </div>

            <NewsList
                pageNumber={pageNumber}
                total={total}
                newsData={newsData}
            />
        </div>
    );
}
