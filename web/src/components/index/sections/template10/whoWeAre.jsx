import Image from "next/image";
import lang from "@/locales";

export default function WhoWeAre({aboutData}) {

    let content = "BlueTech is a forward-thinking company dedicated to harnessing innovation and technology to create meaningful solutions for a rapidly evolving world. Founded in [Year], BlueTech specializes in [your industry or focus, e.g., cutting-edge software development, sustainable technology, etc.] and has grown to become a trusted name in the industry. Guided by our core values of integrity, collaboration, and creativity, <br/><br/> we strive to push boundaries and deliver excellence in everything we do.  Whether developing advanced technologies, optimizing processes, or solving complex challenges, BlueTech is committed to helping our clients achieve their goals. As a company, we also believe in sustainability and responsible innovation. We aim to contribute positively to the environment and society through the thoughtful application of technology. Join us on our journey to shape a smarter, more connected future. Learn more about what we do and how we can work together by exploring our website or contacting our team today."

    return (
        <div className="bg-mainColorLight py-8 lg:py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-8">
                <div className="flex flex-col p-0">
                    <div className="h-1 w-28 bg-gradient-to-r from-mainColorNormal to-mainColorNormalAlpha-50 mb-6"></div>
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">{lang.WhoWeAre}</h2>
                    <p
                       className="flex-1 text-gray-700 mb-4 overflow-hidden relative"
                       dangerouslySetInnerHTML={{ __html: aboutData.aboutText }} >
                    </p>
                </div>
                <div>
                    <div className="relative h-60 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${aboutData.aboutCover}`}
                            alt="About Us"
                            fill
                            quality={90}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
