import { createSlice } from "@reduxjs/toolkit";
import {
  getCartFromStorage,
  saveCartToStorage,
} from "../service/cartHandler/cartHandler";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartFromStorage(),
  },

  reducers: {
    addItem: (state, action) => {
      const check = state.items.find(
        (items) => items._id === action.payload._id
      );
      if (!check) {
        state.items.push(action.payload);
      } else {
        state.items = state.items.filter((items) => {
          if (items._id === action.payload._id) {
            items.Qty = action.payload.Qty + items.Qty;
            return items;
          }
          return items;
        });
      }
      saveCartToStorage(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (items) => items._id != action.payload._id
      );
      saveCartToStorage(state.items);
    },
    changeQty: (state, action) => {
      state.items = state.items.filter((items) => {
        if (items._id === action.payload._id) {
          items.Qty = action.payload.Qty;
          return items;
        }
        return items;
      });
      saveCartToStorage(state.items);
    },
    addQty: (state, action) => {
      state.items = state.items.filter((items) => {
        if (items._id === action.payload._id) {
          items.Qty += 1;
          return items;
        }
        return items;
      });
      saveCartToStorage(state.items);
    },
    decreaseQty: (state, action) => {
      state.items = state.items.filter((items) => {
        if (items._id === action.payload._id) {
          items.Qty -= 1;
          if (items.Qty <= 0) {
            return;
          }
          return items;
        }
        return items;
      });
      saveCartToStorage(state.items);
    },
  },
});

export const { addItem, addQty, removeItem, decreaseQty, changeQty } =
  CartSlice.actions;
export default CartSlice.reducer;
