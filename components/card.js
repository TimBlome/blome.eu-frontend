import React from "react"
import Link from "next/link"
import Moment from "react-moment"

import { getStrapiMedia } from "../lib/media"

const Card = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <article className="cursor-pointer rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 hover:ease-in overflow-hidden flex flex-col gap-2">
        <div className="flex-1 h-12">
          <img className="object-cover object-center w-full h-56" src={getStrapiMedia(article.attributes.image)}></img>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{article.attributes.title}</h2>
          <p className="font-thin">
            {article.attributes.description}
          </p>
        </div>
        <div className="p-4 text-sm">
          <Moment format="MMM Do YYYY">
            {article.attributes.publishedAt}
          </Moment>
        </div>
      </article>
    </Link>
  )
}

export default Card
