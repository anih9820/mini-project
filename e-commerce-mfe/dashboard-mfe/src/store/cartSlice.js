// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCartByUserId, updateCart, clearCartByUserId } from '../services/order-service';  

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalPrice: 0,
//   status: 'idle',
//   error: null,
// };

// export const updateCartWithBackend = createAsyncThunk(
//   'cart/updateCartWithBackend',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const items = state.cart.items; 

//     const payload = items.map(item => ({
//       productId: item.id,
//       name: item.name,
//       imageUrl: item.imageUrl,
//       supplierId: item.supplierId,
//       quantity: item.quantity,
//       quantityPrice: item.price,
//     }));

//     const data = await updateCart(payload);

//     return data.items.map(item => ({
//       id: item.productId || null,
//       name: item.name || null,
//       price: item.quantityPrice || null,
//       imageUrl: item.imageUrl || null,
//       supplierId: item.supplierId || null,
//       quantity: item.quantity || null,
//     }));
//   }
// );



// export const clearCart = createAsyncThunk(
//   'cart/clearCart',
//   async () => {
//     await clearCartByUserId();  
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find(item => item.id === newItem.id);
    
//       if (!existingItem) {
//         state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
//       } else {
//         existingItem.quantity += newItem.quantity || 1; 
//       }
//       state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//     },
//     removeItem(state, action) {
//       const id = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
    
//       if (existingItem) {
//         if (existingItem.quantity === 1) {
//           state.items = state.items.filter(item => item.id !== id);
//         } else {
//           existingItem.quantity--;
//         }
//         state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
//         state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//       }
//     },
//     incrementQuantitySlice(state, action) {
//       const n= action.payload; 
//       console.log(n.id);
//       const existingItem = state.items.find(item => item.id === n.id);

//       if (existingItem) {
//         existingItem.quantity++; 
//       }

//       state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
//       state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
//     },
    
//     clearCartState(state) {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateCartWithBackend.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateCartWithBackend.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//         state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
//         state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       })
//       .addCase(updateCartWithBackend.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(clearCart.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(clearCart.fulfilled, (state) => {
//         state.status = 'succeeded';
//         state.items = [];
//         state.totalQuantity = 0;
//         state.totalPrice = 0;
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { addItem, removeItem, clearCartState,incrementQuantitySlice} = cartSlice.actions;
// export default cartSlice.reducer;
