import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
  return (
    <section className="section">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
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
