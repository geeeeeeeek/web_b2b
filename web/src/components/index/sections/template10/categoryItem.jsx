'use client'
import {useState} from "react";
import Link from "next/link";


export default function CategoryItem({ category, currentCategoryId }) {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubCategories = category.children && category.children.length > 0;
    const isActive = currentCategoryId === category.id;

    const mainStyle = "bg-white min-w-[80px] text-center hover:bg-[#ebf2f5] font-normal py-2.5 px-5 text-gray-700 border-[1px] border-[#e3ebee] rounded-full";
    const selectedStyle = "bg-mainColorNormal min-w-[80px] text-center py-2.5 px-5 text-white rounded-full";

    return (
        <div className="">
            <div className="flex justify-between items-center py-2">
                <Link
                    href={`/product/category/${category.id}`}
                    className={isActive? selectedStyle : mainStyle }
                >
                    {category.title}
                </Link>
            </div>
        </div>
    );
}
