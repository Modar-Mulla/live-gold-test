import { create } from "zustand"
import { Product } from "./types"

export type State = {
  items: Product[]
}

export type Actions = {
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  clearItems: () => void
}

export const useCartStore = create<State & Actions>()((set) => ({
  items: [],

  addItem: (product: Product) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === product.id)

      if (index !== -1) {
        return {
          items: [
            ...state.items.slice(0, index),
            {
              ...state.items[index],

            },
            ...state.items.slice(index + 1),
          ],
        }
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }),

  removeItem: (id: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),


  clearItems: () => set(() => ({ items: [] })),
}))

// Hooks
export const useAddItem = () => useCartStore((state) => state.addItem)
export const useRemoveItem = () => useCartStore((state) => state.removeItem)
export const useClearItems = () => useCartStore((state) => state.clearItems)
