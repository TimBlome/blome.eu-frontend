import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"

const Impressum = ({categories}) => {
    return (
        <Layout categories={categories}>
            <h1 className="text-xl">Impressum</h1>

            <h2 className="text-lg">Angaben gemäß § 5 TMG</h2>
            <p className="my-1">Tim Moritz Blome<br />
            </p>

            <h2 className="font-semibold">Kontakt</h2>
            <p className="my-1">Telefon: (+49) 173 9960535<br />
            E-Mail: info@blome.eu</p>

            <h2 className="font-semibold">Redaktionell verantwortlich</h2>
            <p className="my-1">Tim Moritz Blome<br />
            Telefon: (+49) 173 9960535<br />
            E-Mail: info@blome.eu</p>
        </Layout>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [categoriesRes] = await Promise.all([
      fetchAPI("/categories", { populate: "*" }),
    ])
  
    return {
      props: {
        categories: categoriesRes.data
      },
      revalidate: false,
    }
  }

export default Impressum