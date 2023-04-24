import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchProducts } from './productAPI'

export interface ProductState {
  products: IProduct[]
  cart: Record<string, number>
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ProductState = {
  products: [],
  cart: {},
  status: 'idle',
}

export const loadProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await fetchProducts()
  return response.data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      if (state.cart[action.payload] === undefined) {
        state.cart[action.payload] = 0
      }
      state.cart[action.payload]++
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      if (state.cart[action.payload] > 0) {
        state.cart[action.payload]--
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.cart[action.payload]
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      .addCase(loadProducts.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { addToCart, decreaseQuantity, removeFromCart } = productSlice.actions

export const selectProducts = (state: RootState) => state.product.products
export const selectProductsByTitle = (state: RootState) => {
  let productsByTitle: Record<string, IProduct> = {}
  // eslint-disable-next-line array-callback-return
  state.product.products.map((product) => {
    productsByTitle[product.title] = product
  })
  return productsByTitle
}
export const selectCart = (state: RootState) => state.product.cart

export default productSlice.reducer
