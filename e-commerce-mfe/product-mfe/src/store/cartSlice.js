import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
  clearCartByUserId,
} from "../services/order-service";
import { getProductById } from "../services/product-service";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const userId = localStorage.getItem("userId");
  const data = await getCartByUserId(userId);
  // For each cart item, fetch product details and merge them
  const merged = await Promise.all(
    (data || []).map(async (item) => {
      try {
        const product = await getProductById(item.productId);
        return { ...product, ...item };
      } catch {
        return item;
      }
    })
  );
  return merged;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item) => {
    const payload = {
      productId: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      supplierId: item.supplierId,
      quantity: item.quantity,
      price: item.price,
    };
    const data = await addToCart(payload);
    return data;
  }
);

export const updateCartItemInBackend = createAsyncThunk(
  "cart/updateCartItemInBackend",
  async ({ cartItemId, updatedItem }) => {
    const data = await updateCartItem(cartItemId, updatedItem);
    return data;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const userId = localStorage.getItem("userId");
  await clearCartByUserId(userId);
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemLocally(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      } else {
        existingItem.quantity += newItem.quantity || 1;
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.quantity * (item.price || 0),
        0
      );
    },

    removeItemLocally(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.productId === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.productId !== id);
        } else {
          existingItem.quantity--;
        }

        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.quantity * (item.price || 0),
          0
        );
      }
    },

    clearCartState(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    incrementQuantitySlice(state, action) {
      const updatedItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === updatedItem.productId
      );
      if (existingItem) {
        existingItem.quantity++;
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.quantity * (item.price || 0),
        0
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.quantity * (item.price || 0),
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // Merge original product info from the action.meta.arg (the product passed to the thunk)
        const original = action.meta && action.meta.arg ? action.meta.arg : {};
        const merged = { ...original, ...action.payload };
        state.items.push(merged);
        state.totalQuantity += merged.quantity;
        state.totalPrice += merged.quantity * (merged.price || 0);
      })
      .addCase(updateCartItemInBackend.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          // Merge updated fields but keep product info
          state.items[index] = {
            ...state.items[index], // keep product info
            ...updatedItem, // update quantity, price, etc.
          };
        }
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.quantity * (item.price || 0),
          0
        );
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addItemLocally,
  removeItemLocally,
  clearCartState,
  incrementQuantitySlice,
} = cartSlice.actions;

export default cartSlice.reducer;
