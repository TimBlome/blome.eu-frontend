import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import Author from "../../components/author"
import { getStrapiMedia } from "../../lib/media"

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  const heroStyle = {
    backgroundImage: 'url(' + getStrapiMedia(article.attributes.image) + ')'
  };

  const titleStyle = {
    fontSize: 100 / article.attributes.title.length + 'vw'
  }

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="bg-cover bg-center text-white text-center min-h-56 rounded-t-sm overflow-hidden" style={heroStyle}>
        <h1 style={titleStyle}>{article.attributes.title}</h1>
      </div>
      <div className="prose lg:prose-xl">
        <ReactMarkdown
            source={article.attributes.content}
            escapeHtml={false}
        />
      </div>
      <div className="text-sm my-5">
        <Author author={article.attributes.author}></Author>
        <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
        </Moment>
      </div>

    </Layout>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*"
  })
  const categoriesRes = await fetchAPI("/categories")
  console.log(articlesRes, articlesRes.data[0].attributes, articlesRes.data[0].attributes.author.data.attributes );
  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 1,
  }
}

export default Article
