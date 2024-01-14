// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      //   state.items += action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
    deleteItem: (state, action) => {
     state.items= state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, clearCart, deleteItem } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
