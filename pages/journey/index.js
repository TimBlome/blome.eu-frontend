import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"
import ReactMarkdown from "react-markdown"
import Map from "../../components/Map"
import Link from "next/link"
import { useRouter } from "next/dist/client/router"


const DEFAULT_CENTER = [51.9919086, 8.6249415]

const Journey = ({ journey, legs, categories, homepage }) => {
  const router = useRouter();
  const {focus} = router.query;
  const lastLeg = legs.find(leg => leg.id == focus) ?? legs?.slice(-1)[0];
  const polyline = legs?.map(leg => [leg.attributes.Lat, leg.attributes.Lon]);
  const blackOptions = { color: 'black', smoothFactor: 10 }
    return (
        <Layout categories={categories} noMargin={true}>
        <Seo seo={homepage.attributes.seo} />
        <div className="m-0 p-o h-full">
          <Map className="w-full h-full" center={[lastLeg.attributes.Lat, lastLeg.attributes.Lon]} zoom={8}>
            {({ TileLayer, Marker, Popup, Polyline }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Polyline pathOptions={blackOptions} positions={polyline}></Polyline>
                {
                  legs?.map(leg =>
                    <Marker key={leg.id} position={[leg.attributes.Lat, leg.attributes.Lon]}>
                      <Popup>
                        <h2 className="text-lg">{leg.attributes.Location}</h2>
                        <p>{leg.attributes.Description}</p>
                        <Link href={"/journey/legs/" + leg.id}>Mehr lesen...</Link>
                      </Popup>
                    </Marker>
                  )}
              </>
            )}
          </Map>
        </div>       
        </Layout>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [journeyRes, legsRes, categoriesRes, homepageRes] = await Promise.all([
      fetchAPI("/journey"),
      fetchAPI("/journey-legs", { populate: "*", sort: "Date"}),
      fetchAPI("/categories", { populate: "*" }),
      fetchAPI("/homepage", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        },
      }),
    ]);
  
    return {
      props: {
        journey: journeyRes.data,
        legs: legsRes.data,
        categories: categoriesRes.data,
        homepage: homepageRes.data,
      },
      revalidate: 10,
    }
  }
  
  export default Journey