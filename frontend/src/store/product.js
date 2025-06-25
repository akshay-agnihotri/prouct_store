import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProducts: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please provide all fields",
      };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));

    return {
      success: true,
      message: "Product created successfully",
    };
  },
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("unable to delete the product");
      }

      const { success, message } = await response.json();

      if (success) {
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        }));
      }

      return {
        success,
        message,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  },
}));
