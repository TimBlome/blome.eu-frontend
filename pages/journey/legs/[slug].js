import Link from "next/link"
import ReactMarkdown from "react-markdown"
import Image from "../../../components/image"
import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import Articles from "../../../components/articles"
import { fetchAPI } from "../../../lib/api"
import { getStrapiMedia } from "../../../lib/media"

const Leg = ({ leg, categories, homepage, articles }) => {
    return (
        <Layout categories={categories}>
        <Seo seo={homepage.attributes.seo} />
        <Link passHref href={{
              pathname: '/journey',
              query: { focus: leg.id },
            }}><a className="cursor-pointer text-sm">⬅️back</a></Link>
        <h1 className="text-2xl my-2">{leg.attributes.Location}</h1>
        <div className="grid grid-cols-4 gap-4">
          <article className="col-span-4 xl:col-span-3">
            <div className="prose">
              <ReactMarkdown source={leg.attributes.Content}
                escapeHtml={false}></ReactMarkdown>
            </div>
          </article>
          <main className="col-span-4 xl:col-span-1 order-last xl:order-2 xl:row-span-2">
            <div className="grid grid-cols-1 gap-2">
              {leg.attributes.Images.data.map(image => (
                  <Image key={image.id} image={image} fill></Image>
              ))}
            </div>
          </main>
          <div className="col-span-4 xl:col-span-3 xl:order-last">
            <Articles articles={articles}></Articles>
          </div>
        </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const journeyRes = await fetchAPI("/journey-legs")
    return {
      paths: journeyRes.data.map((leg) => ({
        params: {
          slug: leg.id.toString(),
        },
      })),
      fallback: false,
    }
  }

export async function getStaticProps({ params }) {
    // Run API calls in parallel
    const [legRes, categoriesRes, homepageRes, articleRes] = await Promise.all([
      fetchAPI("/journey-legs/" + params.slug, { populate: "*"}),
      fetchAPI("/categories", { populate: "*" }),
      fetchAPI("/homepage", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        },
      }),
      fetchAPI("/articles", { populate: "*", sort: "createdAt:desc" })
    ])
    return {
      props: {
        leg: legRes.data,
        categories: categoriesRes.data,
        homepage: homepageRes.data,
        articles: articleRes.data
      },
      revalidate: 10,
    }
  }
  
  export default Leg