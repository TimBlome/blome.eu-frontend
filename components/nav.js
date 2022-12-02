import React, { useState } from "react"
import Link from "next/link"


const Nav = ({ categories }) => {
  return (
    <nav className="flex p-10 items-center gap-4" role="navigation" aria-label="main navigation">
      <div className="flex-none">
        <Link href="/">
            <h1 className="font-bold cursor-pointer">Tim Moritz Blome</h1>
        </Link>
        <p>I am into IT and currently on a roadtrip around europe</p>
      </div>
      <div className="flex-1">
          
      </div>
      <div className="flex-none">
        <div className="flex gap-4">
          {categories.map((category) => {
              return (
                <Link key={category.id} href={`/category/${category.attributes.slug}`}>
                  <a className="navbar-item">{category.attributes.name}</a>
                </Link>
              )
            })}
        </div>
      </div>
    </nav>
  )
}

export default Nav
