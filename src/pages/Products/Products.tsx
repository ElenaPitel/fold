import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ProductCard from '../../components/ProductCard'
import { selectProducts, selectCart, loadProducts, addToCart } from '../../redux/product/productSlice'

const Products = () => {
  const products = useAppSelector(selectProducts)
  const cart = useAppSelector(selectCart)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.title}
          quantity={cart[product.title]}
          product={product}
          addToCart={(id) => dispatch(addToCart(id))}
        />
      ))}
    </div>
  )
}

export default Products
