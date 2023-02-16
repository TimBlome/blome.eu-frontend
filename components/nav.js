import React, { useState } from "react"
import Link from "next/link"

const Nav = ({ categories }) => {
  return (
    <nav
      className="flex flex-wrap p-10 items-center gap-4"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="flex-auto">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">Tim Moritz Blome</h1>
        </Link>
      </div>
      <div className="flex-1 flex-grow">
        <div className="flex gap-4 flex-row-reverse">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/category/${category.attributes.slug}`}
                className="navbar-item"
              >
                {category.attributes.name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex-none w-full text-sm">
        <p>
          I am into IT and currently on a roadtrip around europe.{" "}
          <Link
            href="/journey"
            className="font-semibold underline hover:underline-offset-2"
          >
            Follow my journey
          </Link>
        </p>
      </div>
    </nav>
  )
}

export default Nav
