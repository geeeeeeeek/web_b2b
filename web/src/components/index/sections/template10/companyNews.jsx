import Link from 'next/link';
import Image from 'next/image';
import {formatDate} from "@/utils/tools";
import lang from "@/locales";


export default function CompanyNews({newsData}) {
  return (
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
                  {lang.NewsAndEvents}
              </h2>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                  {lang.CompanyNewsTip}
              </p>
          </div>
          <div className="w-full mx-auto mt-12 grid grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
              {newsData.map((post) => (
                  <div
                      key={post.id}
                      className="relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 transform transition-transform duration-300"
                      style={{ paddingBottom: '100%' }}
                  >
                      <div className="absolute w-full h-full top-0 left-0 inset-0 -z-10 overflow-hidden">
                          <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${post.cover}`}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                              className="object-cover transition-transform duration-500 hover:scale-105" 
                              priority={newsData.indexOf(post) < 3}
                          />
                      </div>

                      {/* 标题区域 */}
                      <Link href={'/news/'+post.id} className="block absolute w-full bottom-0 left-0">
                          <h3 className="bg-mainColorNormalAlpha-80 text-lg leading-6 font-semibold text-white px-6 py-6 group">
                              <span className="block truncate group-hover:underline">{post.title}</span>
                          </h3>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  )
}
