import CaseList from "@/components/index/sections/caseList";
import BannerB from "@/components/index/sections/bannerB";

export default function CaseTemplate({bannerData, pageNumber, total, caseData}) {
    return (
        <div className="bg-mainColorLight">
            <div className="w-full h-[200px]">
                <BannerB title="Case" titleLink="/case" bannerData={bannerData}/>
            </div>

            <CaseList pageNumber={pageNumber} total={total} caseData={caseData}/>
        </div>
    )
}
