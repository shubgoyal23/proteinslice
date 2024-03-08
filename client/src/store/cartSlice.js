import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
   name: "cart",
   initialState: {
      items: [],
   },

   reducers: {
      addItem: (state, action) => {
         state.items.push(action.payload);
      },
      removeItem: (state, action) => {
         state.items = state.items.filter(
            (items) => items._id != action.payload._id
         );
      },
      changeQty: (state, action) => {
         state.items = state.items.filter((items) => {
            if (items._id === action.payload._id) {
               items.Qty = action.payload.Qty
               return items;
            }
            return items;
         });
      },
      addQty: (state, action) => {
         state.items = state.items.filter((items) => {
            if (items._id === action.payload._id) {
               items.Qty += 1;
               return items;
            }
            return items;
         });
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
      },
   },
});

export const { addItem, addQty, removeItem, decreaseQty, changeQty } = CartSlice.actions;
export default CartSlice.reducer;
