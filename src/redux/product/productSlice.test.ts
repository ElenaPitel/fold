import productReducer, { ProductState, addToCart, decreaseQuantity, removeFromCart } from './productSlice'
const PRODUCTS = [
  {
    title: 'Brown eggs',
    type: 'dairy',
    description: 'Raw organic brown eggs in a basket',
    filename: '0.jpg',
    height: 600,
    width: 400,
    price: 28.1,
    rating: 4,
  },
  {
    title: 'Sweet fresh strawberry',
    type: 'fruit',
    description: 'Sweet fresh strawberry on the wooden table',
    filename: '1.jpg',
    height: 450,
    width: 299,
    price: 29.45,
    rating: 4,
  },
  {
    title: 'Asparagus',
    type: 'vegetable',
    description: 'Asparagus with ham on the wooden table',
    filename: '2.jpg',
    height: 450,
    width: 299,
    price: 18.95,
    rating: 3,
  },
]

describe('product reducer', () => {
  const initialState: ProductState = {
    products: PRODUCTS,
    cart: {},
    status: 'idle',
  }
  const title = 'Brown eggs'

  it('should handle initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual({
      products: [],
      cart: {},
      status: 'idle',
    })
  })

  it('should handle addToCart', () => {
    const actual = productReducer(initialState, addToCart(title))
    expect(actual.cart[title]).toEqual(1)
  })

  it('should handle decreaseQuantity', () => {
    const added = productReducer(initialState, addToCart(title))
    const actual = productReducer(added, decreaseQuantity(title))
    expect(actual.cart[title]).toEqual(0)
  })

  it('should handle removeFromCart', () => {
    const actual = productReducer(initialState, removeFromCart(title))
    expect(actual.cart[title]).toEqual(undefined)
  })
})
