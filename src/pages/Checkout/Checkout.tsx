import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectCart,
  addToCart,
  removeFromCart,
  selectProductsByTitle,
  decreaseQuantity,
} from '../../redux/product/productSlice'

const Checkout = () => {
  const productsByTitle = useAppSelector(selectProductsByTitle)
  const cart = useAppSelector(selectCart)
  const dispatch = useAppDispatch()

  const totalPrice = useMemo(() => {
    return Object.keys(cart).reduce((prev, curr) => prev + productsByTitle[curr].price * cart[curr], 0)
  }, [productsByTitle, cart])

  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cart).map((title) => (
            <tr key={title} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                {title}
              </th>
              <td className="px-6 py-4">${productsByTitle[title].price}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => dispatch(decreaseQuantity(title))}
                  className="text-white text-blue-700 hover:text-blue-800 font-medium text-sm px-3 py-2 text-center"
                >
                  -
                </button>
                {cart[title]}
                <button
                  onClick={() => dispatch(addToCart(title))}
                  className="text-white text-blue-700 hover:text-blue-800 font-medium text-sm px-3 py-2 text-center"
                >
                  +
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => dispatch(removeFromCart(title))}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-xl font-black">Total: ${totalPrice.toFixed(2)}</h1>
    </div>
  )
}

export default Checkout
