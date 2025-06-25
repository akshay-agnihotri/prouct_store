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
  updateProduct: async (id, updatedData) => {
    try {
      const filteredData = {};
      console.log(updatedData);

      if (updatedData.name) filteredData.name = updatedData.name;
      if (updatedData.price) filteredData.price = updatedData.price;
      if (updatedData.image) filteredData.image = updatedData.image;

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      if (!response.ok) {
        return {
          success: false,
          message: "cannot update the product",
        };
      }

      const result = await response.json();
      console.log(result);

      return result;
    } catch (err) {
      console.log("error: ", err);
      return {
        success: false,
        message: err.message,
      };
    }
  },
}));
