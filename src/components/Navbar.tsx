import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  {
    to: '/',
    name: 'Product\'s',
  },
  {
    to: '/checkout',
    name: 'Chekcout',
  },
]

const Nav = () => {
  const location = useLocation()

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white px-3 py-2 text-lg font-medium">FLOD</h1>
            </div>
            <div>
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_LINKS.map((nav) => (
                  <Link
                    key={nav.to}
                    to={nav.to}
                    className={`
                      ${nav.to === location.pathname ? 'text-white' : 'text-gray-500'}
                      hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {nav.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
