import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import { fetchAPI } from "../../../lib/api"

const Leg = ({ legs, categories, homepage }) => {
    return (
        <Layout categories={categories}>
        <Seo seo={homepage.attributes.seo} />
        {/* Articles */}
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

export async function getStaticProps() {
    // Run API calls in parallel
    const [journeyRes, categoriesRes, homepageRes] = await Promise.all([
      fetchAPI("/journey", { populate: "*", sort: "id" }),
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
        legs: journeyRes.data,
        categories: categoriesRes.data,
        homepage: homepageRes.data,
      },
      revalidate: 10,
    }
  }
  
  export default Leg