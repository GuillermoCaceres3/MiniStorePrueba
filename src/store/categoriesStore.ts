import { create } from 'zustand'

type CategoriesStore = {
  inactiveCategories: string[]
  toggleCategoryStatus: (categoryName: string) => void
  isCategoryActive: (categoryName: string) => boolean
}

const getStoredInactiveCategories = (): string[] => {
  const stored = localStorage.getItem('inactiveCategories')
  return stored ? JSON.parse(stored) : []
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  inactiveCategories: getStoredInactiveCategories(),

  toggleCategoryStatus: (categoryName) => {
    const currentInactive = get().inactiveCategories

    const updatedInactive = currentInactive.includes(categoryName)
      ? currentInactive.filter((category) => category !== categoryName)
      : [...currentInactive, categoryName]

    localStorage.setItem(
      'inactiveCategories',
      JSON.stringify(updatedInactive),
    )

    set({
      inactiveCategories: updatedInactive,
    })
  },

  isCategoryActive: (categoryName) => {
    return !get().inactiveCategories.includes(categoryName)
  },
}))

