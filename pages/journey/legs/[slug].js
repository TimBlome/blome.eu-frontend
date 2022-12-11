import Link from "next/link"
import ReactMarkdown from "react-markdown"
import Image from "../../../components/image"
import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import { fetchAPI } from "../../../lib/api"
import { getStrapiMedia } from "../../../lib/media"

const Leg = ({ leg, categories, homepage }) => {
    return (
        <Layout categories={categories}>
        <Seo seo={homepage.attributes.seo} />
        <h1>{leg.attributes.Location}</h1>
        <div className="flex flex-wrap flex-col lg:flex-row">
          <article className="flex-none basis-1/3">
            <div className="prose">
              <ReactMarkdown source={leg.attributes.Content}
                escapeHtml={false}></ReactMarkdown>
            </div>
          </article>
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {leg.attributes.Images.data.map(image => (
                  <>
                    <Image key={image.id} image={image} fill></Image>
                  </>
              ))}
            </div>
          </main>
        </div>
       
        <Link passHref href="/journey"><a className="cursor-pointer text-sm">Zur Karte</a></Link>
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
    const [legRes, categoriesRes, homepageRes] = await Promise.all([
      fetchAPI("/journey-legs/" + params.slug, { populate: "*"}),
      fetchAPI("/categories", { populate: "*" }),
      fetchAPI("/homepage", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        },
      }),
    ])
    return {
      props: {
        leg: legRes.data,
        categories: categoriesRes.data,
        homepage: homepageRes.data,
      },
      revalidate: 10,
    }
  }
  
  export default Leg