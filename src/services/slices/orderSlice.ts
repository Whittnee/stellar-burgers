import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export const getOrder = createAsyncThunk('order/get', getOrderByNumberApi);

interface OrderState {
  orderData: TOrder | null;
}

const initialState: OrderState = {
  orderData: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
      });
  }
});

export default orderSlice.reducer;
export const selectOrder = (state: RootState) => state.orderSlice.orderData;
