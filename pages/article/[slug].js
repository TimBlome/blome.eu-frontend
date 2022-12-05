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
    backgroundImage: "url(" + getStrapiMedia(article.attributes.image) + ")",
  }

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div
        className="bg-cover bg-center text-white text-8xl lg:py-20 py-5 text-center rounded-t-sm overflow-hidden"
        style={heroStyle}
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="my-5 mx-auto">
        <div className="prose lg:prose-xl">
          <ReactMarkdown
            source={article.attributes.content}
            escapeHtml={false}
          />
        </div>
        <div className="text-sm my-5">
          <Author author={article.attributes.author}></Author>
          <Moment format="MMM Do YYYY">{article.attributes.publishedAt}</Moment>
        </div>
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
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")
  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 5,
  }
}

export default Article
