import {GoogleAnalytics} from "@next/third-parties/google";

import ScrollBar from "@/components/index/sections/scrollBar";
import SendMessage from "@/components/index/sections/sendMessage";
import NavBar from "@/components/index/sections/template10/navBar";
import Footer from "@/components/index/sections/template10/footer";
import TipBar from "@/components/index/sections/tipbar";
import SwitchLangB from "@/components/index/sections/switchLangB";

export default function IndexLayoutTemplate({navSectionData, footerSectionData, children}) {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <NavBar sectionData={navSectionData}/>
                <main className="flex-grow">
                    {children}
                </main>
                <Footer sectionData={footerSectionData}/>
                <ScrollBar/>
                <SendMessage />
                <TipBar sectionData={navSectionData}/>
            </div>

            {/* 语言切换器  */}
            {/*<SwitchLangB/>*/}

            {/*谷歌分析*/}
            <GoogleAnalytics gaId={navSectionData.basicSite.site_gaid} />
        </>
    );
}
