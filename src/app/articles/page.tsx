import Header from "../components/defaults/header"
import Footer from "../components/defaults/footer"

import articles from "@/lib/articles"
import Cards from "../components/tools/cards"

import { Montserrat } from "next/font/google"

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

export default function page() {
    return (<body className={`h-[100vh] flex flex-col justify-between ${fontFamily.className}`}>
        <Header />
        <div className={`w-full flex-col flex grow items-center ${fontFamily.className}`}>
            <div className="w-full max-w-[800px] p-5 flex flex-col gap-5">
                <h1>Articles</h1>
                <div className="w-full grid grid-cols-2 gap-5 not-md:grid-cols-1">
                    {
                        articles.list().map((article, num) => {
                            const data = article as articleData
                            return <Cards.articleCard name={data.title} shortDescription={data.description} href={`/articles/${data.slug}`} thumbnail={data.image} identifier={data.slug}/>
                        })
                    }
                </div>
            </div>
        </div>
        <Footer />
    </body>)
}