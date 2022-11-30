import Nav from "./nav"


const Layout = ({ children, categories, seo }) => (
  <>
    <Nav categories={categories} />
    {children}
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="block">
          <div className="level">
            <div className="level-item">
              <a href="/">Home</a>
            </div>
            <div className="level-item">
              <a href="#">GitHub</a>
            </div>
            <div className="level-item">
              <a href="#Impressum">Impressum</a>
            </div>
          </div>
        </div>
        <div className="block">
          <p>
            <strong>blome.eu</strong> by Tim Moritz Blome
          </p>
        </div>
      </div>
    </footer>
  </>
)

export default Layout
