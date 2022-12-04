import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
  return (
    <section className="section">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {articles.map((article, i) => {
          return (
            <Card key={article.attributes.slug} article={article} />
          )
        })}
      </div>
    </section>
  )
}

export default Articles
