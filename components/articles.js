import React from "react"
import Card from "./card"

const Articles = ({ articles }) => {
  return (
    <section className="section">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 auto-cols-fr">
        {articles.map((article, i) => {
          return (
            <div key={article.attributes.slug} className={i == 0 ? "md:col-span-2" : ""}>
              <Card article={article} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Articles
