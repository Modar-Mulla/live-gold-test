'use server'
const API_URL = process.env.DUMMY_API

export async function getProductsByCategory(category: string) {

  const url = `https://dummyjson.com/products/category/${category}`
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return { status: true, message: data?.message, data: data }
  }
  else {
    const error = await response.json()
    console.log(error)
    return { status: false, message: response.statusText, data: {} }
  }
}

export async function getProductById(id: string) {

  const url = `https://dummyjson.com/products/${id}`
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return { status: true, message: data?.message, data: data }
  }
  else {
    const error = await response.json()
    console.log(error)
    return { status: false, message: response.statusText, data: {} }
  }
}

export async function getProductsByQuery(query: string) {

  const url = `https://dummyjson.com/products/search?q=${query}`
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return { status: true, message: data?.message, data: data }
  }
  else {
    const error = await response.json()
    console.log(error)
    return { status: false, message: response.statusText, data: {} }
  }
}

export async function getProducts(query: { skip?: string, limit?: string } = {}) {
  try {
    if (!API_URL) {
      throw new Error("API_URL environment variable is not defined");
    }
    const url = new URL(`${API_URL}/products`)
    if (query?.skip) {
      url.searchParams.append("skip", query.skip)
    }
    if (query?.limit) {
      url.searchParams.append("limit", query.limit)
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("[getProducts] Error fetching products:", error);
    return { success: false, data: [], error: "Error!" };
  }
}

export async function getCategories() {
  try {
    if (!API_URL) {
      throw new Error("API_URL environment variable is not defined");
    }
    const url = new URL(`${API_URL}/products/categories`)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("[getCategories] Error fetching categories:", error);
    return { success: false, data: [], error: "Error!" };
  }
}

