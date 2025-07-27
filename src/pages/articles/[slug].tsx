import { Router, useRouter } from "next/router";
import "@/app/main.css"
import "@/app/globals.css"
import "../shadow.css"
import Header from "@/app/components/defaults/header";
import Footer from "@/app/components/defaults/footer";
import Articles from "@/lib/articles"
import { Montserrat, Roboto } from "next/font/google";

const fontFamily = Montserrat({
    weight: "500",
    subsets: ["latin"]
})

const lightFontFamily = Montserrat({
    weight: "300",
    subsets: ["latin"]
})

type article = {
    found: boolean,
    title: string,
    path: string,
    tags: string[],
    slug: string,
    image: string,
    content: string,
    imgAlt: string,
    author: string,
    readTime: string,
}

type articleClient = {
    article: article
}

interface context {
    params: {
        slug?: string
    }
}

export default function Page({ article }: articleClient) {
    return (
        <>
            <div className="h-[100vh] flex flex-col justify-between">
                <Header />
                <div className="grow flex flex-row justify-between">
                    <div></div>
                    <div className={`grow max-w-[1000px] flex flex-col gap-5 box-border p-2`}>
                        <div className="rounded-2xl relative bg-center w-full aspect-video bg-cover inset-shadow flex flex-col-reverse box-border p-2" style={{backgroundImage: `url(${article.image})`}}>
                            <p className={`text-white text-sm`}>{article.readTime} read - By {article.author}</p>
                            <p className={`text-white font-bold text-lg ${fontFamily.className}`}>{article.title}</p>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: article.content}} className={`flex flex-col gap-5 ${lightFontFamily.className}`}></div>
                    </div>
                    <div></div>
                </div>
                <Footer />
            </div>
        </>
    )

}

export async function getServerSideProps(context: context) {

    const articleData = await Articles.getBySlug(context.params.slug || '') as article

    await articleData

    if (!articleData.found) return { notFound: true }

    return {
        props: {

            article: {
                ...articleData
            }
        }
    }
}