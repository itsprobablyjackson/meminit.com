import { Router, useRouter } from "next/router";
import "@/app/main.css"
import "@/app/globals.css"
import "../shadow.css"
import Header from "@/app/components/defaults/header";
import Footer from "@/app/components/defaults/footer";
import Articles from "@/lib/articles"
import { Montserrat, Roboto } from "next/font/google";
import AdBanner from "@/app/components/adComponents/banner";
import Skyscraper from "@/app/components/adComponents/skyscraper";

import articles from "@/lib/articles"
import Cards from "@/app/components/tools/cards"
import tools from "@/app/tools"

type articleData = {
    found: boolean,
    title: string,
    tags: string[],
    slug: string,
    image: string,
    content: string,
    imgAlt: string,
    author: string,
    readTime: string,
    fileName: string,
    description: string
}


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
    extraHtml: {
        sideArticles: articleData[]
    }
}

interface context {
    params: {
        slug?: string
    }
}

export default function Page({ article, extraHtml }: articleClient) {
    return (
        <>
            <div className="h-[100vh] flex flex-col justify-between">
                <Header />
                <div className="grow flex flex-row justify-between relative">
                    <div className="w-full px-5 py-2 relative flex flex-col gap-5 not-md:hidden">
                        {extraHtml.sideArticles.map((data, index) => {
                            return <Cards.articleCard name={data.title} shortDescription={data.description} href={`/articles/${data.slug}`} thumbnail={data.image} identifier={data.slug} />;
                        })}
                        <div className="sticky top-17 self-start w-full box-border py-2">
                            <div className="box-border">
                                <Skyscraper />
                            </div>
                        </div>
                    </div>
                    <div className={`grow max-w-[1000px] flex flex-col gap-5 box-border p-2`}>
                        <div className="rounded-2xl relative bg-center w-full aspect-video bg-cover inset-shadow flex flex-col-reverse box-border p-2" style={{ backgroundImage: `url(${article.image})` }}>
                            <p className={`text-white text-sm`}>{article.readTime} read - By {article.author}</p>
                            <p className={`text-white font-bold text-lg ${fontFamily.className}`}>{article.title}</p>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: article.content }} className={`flex flex-col gap-5 ${lightFontFamily.className}`}></div>
                    </div>
                    <div className="w-full px-5 not-md:hidden py-2 relative flex flex-col gap-5">
                        <div className="sticky top-17 self-start w-full box-border py flex flex-col gap-5">
                            <Skyscraper />
                            {tools.popular.map((data, index) => {
                                if (index > 1) return
                                return <Cards.articleCard name={data.name} shortDescription={data.shortDescription} href={`/articles/${data.identifier}`} thumbnail={data.thumbnail} identifier={data.identifier} />
                            })}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )

}

export async function getStaticPaths() {
    const allArticles = Articles.list() as articleData[];
    const paths = allArticles.map(article => ({
        params: { slug: article.slug }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps(context: context) {
    const slug = context.params.slug || '';
    const articleData = await Articles.getBySlug(slug) as article;

    if (!articleData.found) return { notFound: true };

    let articleList: articleData[] = [];
    Articles.list().map((article, num) => {
        const data = article as articleData;
        articleList.push(data);
    });

    return {
        props: {
            article: {
                ...articleData
            },
            extraHtml: {
                sideArticles: articleList
            }
        }
    };
}