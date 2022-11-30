import React, { useState } from "react"
import Link from "next/link"


const Nav = ({ categories }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1 className="title is-4">blome.eu</h1>
          </a>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setExpanded(!expanded)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu ${expanded ? "is-active" : ""}`}>
          <div className="navbar-end">
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
    </div>
  )
}

export default Nav
