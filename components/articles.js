import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5)
  const leftArticles = articles.slice(0, leftArticlesCount)
  const rightArticles = articles.slice(leftArticlesCount, articles.length)

  return (
    <section className="section">
    <div className="columns is-multiline">
      {articles.map((article, i) => {
        return (
          
              <Card
                article={article}
                key={article.attributes.slug}
              />
            
        )
      })}
    </div>
    </section>
  )
}

export default Articles
