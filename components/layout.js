import Nav from "./nav"


const Layout = ({ children, categories, seo }) => (
  <>
    <div className="flex flex-col min-h-screen">
      <div>
        <Nav categories={categories} />
      </div>
      <div className="flex-1 md:container md:mx-auto p-4">
        {children}
      </div>
      <footer className="flex-none p-4 bg-slate-200 align-middle ">
        <div className="flex gap-4 justify-center">
          <a href="/">Home</a>
          <a href="https://github.com/TimBlome">GitHub</a>
          <a href="/impressum">Impressum</a>
        </div>
        <div className="text-sm text-center m-4">
          <p>
            <strong>blome.eu</strong> by Tim Moritz Blome
          </p>
        </div>
      </footer>
    </div>
  </>
)

export default Layout
