import React from "react"
import Link from "next/link"
import NextImage from "./image"

const Card = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <article>
          <NextImage width="100%" height="100%" image={article.attributes.image} />
          <p id="category" className="uk-text-uppercase">
            {article.attributes.category.name}
          </p>
          <p id="title" className="uk-text-large">
            {article.attributes.title}
          </p>
      </article>
    </Link>
  )
}

export default Card
