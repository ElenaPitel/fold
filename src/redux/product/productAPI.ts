import products from './__mock__/products.json'

export function fetchProducts() {
  return new Promise<{ data: IProduct[] }>((resolve) => setTimeout(() => resolve({ data: products }), 500))
}
