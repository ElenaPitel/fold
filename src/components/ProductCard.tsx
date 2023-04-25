import _ from 'lodash'

interface ProductCardProps {
  product: IProduct
  quantity: number | undefined
  addToCart: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, addToCart }) => {
  return (
    <div data-cy={`${product.title}`} data-testId="productCard" className="max-w-sm bg-white rounded-lg shadow-md justify-start">
      <img
        className="block object-cover object-center w-96 h-96 rounded-lg p-4"
        src={`assets/images/${product.filename}`}
        alt="product"
        data-testId="image"
      />
      <div className="px-5 pb-5">
        <div className="flex items-center mt-2.5 mb-5">
          {_.range(5).map((i: number) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < product.rating ? 'text-yellow-300' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-5">
          <span data-testId="price" className="text-3xl font-bold text-gray-900">${product.price}</span>
          <button data-testId="addToCartButton"
            onClick={() => addToCart(product.title)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {`Add to cart (-${quantity || 0})`}
          </button>
        </div>
        <h5 data-testId="title" className="text-xl font-semibold tracking-tight text-gray-900">{product.title}</h5>
        <h5 data-testId="description" className="text-lg tracking-tight text-gray-500">{product.description}</h5>
      </div>
    </div>
  )
}

export default ProductCard
