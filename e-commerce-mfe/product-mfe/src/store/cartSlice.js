import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
  clearCartByUserId,
} from "../services/order-service";

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
  return data;
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
      quantityPrice: item.price,
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
        (sum, item) => sum + item.quantity * item.quantityPrice,
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
          (sum, item) => sum + item.quantity * item.quantityPrice,
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
        (sum, item) => sum + item.quantity * item.quantityPrice,
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
          (sum, item) => sum + item.quantity * item.quantityPrice,
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.totalQuantity += action.payload.quantity;
        state.totalPrice +=
          action.payload.quantity * action.payload.quantityPrice;
      })
      .addCase(updateCartItemInBackend.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
        state.totalQuantity = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.quantity * item.quantityPrice,
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
