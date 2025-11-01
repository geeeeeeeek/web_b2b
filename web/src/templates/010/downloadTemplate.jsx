import DownloadList from "@/components/index/sections/downloadList";
import BannerB from "@/components/index/sections/bannerB";

export default function DownloadTemplate({bannerData, downloadData}){
    return (
        <div>
            <div className="w-full h-[200px]">
                <BannerB title="Download" titleLink="/download" bannerData={bannerData}/>
            </div>

            <DownloadList downloadData={downloadData} />
        </div>
    );
}