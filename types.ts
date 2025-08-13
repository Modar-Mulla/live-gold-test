export type Product = {
  id: number,
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: { width: number, height: number, depth: number },
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[],
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  },
  images: string[],
  thumbnail: string

}

export type Review = {
  comment: string
  date: string
  rating: number
  reviewerEmail: string
  reviewerName: string
}

export type LoginResponse =
  {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    accessToken: string
    refreshToken: string
  }

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  birthDate: string
  image: string
}

export type Category = {
  name: string
  slug: string
  url: string
}