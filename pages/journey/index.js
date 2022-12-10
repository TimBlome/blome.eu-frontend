import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"
import ReactMarkdown from "react-markdown"
import Map from "../../components/Map"

const DEFAULT_CENTER = [51.9919086, 8.6249415]

const Journey = ({ journey, categories, homepage }) => {
    return (
        <Layout categories={categories} noMargin={true}>
        <Seo seo={homepage.attributes.seo} />
        <div className="m-0 p-o h-full">
          <Map className="w-full h-full" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {
                  journey.attributes.journey_legs?.data.map(leg =>
                    <Marker position={[leg.attributes.Lat, leg.attributes.Lon]}>
                      <Popup>
                        <h2 className="text-lg">{leg.attributes.Location}</h2>
                        <p>{leg.attributes.Content}</p>
                      </Popup>
                    </Marker>
                  )}
              </>
            )}
          </Map>
        </div>

        

        {/* <div className="mt-5">
        {
          journey.attributes.journey_legs.data.map(leg => {
            return(
              <div key={leg.id} className="p-4 border border-black border-1">
                <h2 className="text-lg">{leg.attributes.Location}</h2>
                <div className="prose prose:sm lg:prose-md">
                  <ReactMarkdown
                    source={leg.attributes.Content}
                    escapeHtml={false}
                  />
                </div>
              </div>
            
            )
          })
        }
        </div> */}
        
        </Layout>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [journeyRes, categoriesRes, homepageRes] = await Promise.all([
      fetchAPI("/journey", { populate: "*"}),
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
        journey: journeyRes.data,
        categories: categoriesRes.data,
        homepage: homepageRes.data,
      },
      revalidate: 10,
    }
  }
  
  export default Journey