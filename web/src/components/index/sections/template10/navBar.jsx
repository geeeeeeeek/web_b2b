import Link from "next/link";
import NavBarClient from "@/components/index/sections/template10/navBarClient";


export default function NavBar({sectionData}) {
    return (
        <div className="sticky top-0 z-50">

            {/* 主导航栏 */}
            <header className="bg-white shadow-sm px-4 lg:px-4 md:px-4" style={{ position: 'relative', zIndex: 55 }}>
                <nav
                    aria-label="Global"
                    className="h-20 mx-auto max-w-7xl lg:px-8 flex items-stretch "
                >
                    <div className="flex items-center ">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Logo</span>
                            <img
                                alt="logo"
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${sectionData.basicSite.site_logo}`}
                                className="h-12 w-auto"
                            />
                        </Link>
                    </div>

                    {/* 客户端导航组件 */}
                    <NavBarClient sectionData={sectionData}/>
                </nav>
            </header>
        </div>
    )
}