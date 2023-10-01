import getRoute from "../functions/getRoute"
import Link from 'next/link'

export default function ProductosLayout({ children }) {
  const categories = [
    {
      name: 'Todos',
      url: ''
    },
    {
      name: 'CPU',
      url: 'cpu'
    },
    {
      name: 'GPU',
      url: 'gpu'
    },
    {
      name: 'Memoria RAM',
      url: 'ram'
    },
    {
      name: 'Almacenamiento',
      url: 'almacenamiento'
    },
    {
      name: 'Refrigeracion',
      url: 'refrigeracion'
    }
  ]

  const route = getRoute() === 'productos' ? '' : getRoute()
  var color_text = 'text-gray-100'

  return (
    <div className='mx-auto flex max-w-fit flex-col py-6 text-white md:flex-row'>
      <div className='order-first flex-none md:w-1/6'>
        <nav className='col-span-2 w-full flex-none px-6 py-2 md:py-4 md:pl-10'>
          <h3 className='font-semibold text-white md:block'>Categorias</h3>
          <ul className="md:block">
            {categories.map((category) => {
              color_text = category.url === route ? color_text : 'text-gray-400'
              return <li className={`mt-2 flex text-sm ${color_text}`}>
                <Link className='w-full hover:text-gray-100' href={`/productos/${category.url}`}>{category.name}</Link>
              </li>
            }
            )}
          </ul>
        </nav>
      </div>
      <div className="order-last min-h-screen w-full md:order-none pr-20">
        {children}
      </div>
    </div >
  )
}
