import NewsDetail from "@/components/index/sections/newsDetail";

export default function NewsDetailTemplate({detailData, categoryData, recommendData, shareLinks}) {
    return (
        <NewsDetail
            detailData={detailData}
            categoryData={categoryData}
            recommendData={recommendData}
            shareLinks={shareLinks}
        />
    );
}
