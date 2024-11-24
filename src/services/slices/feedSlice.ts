import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

interface FeedState {
  orders: TOrder[];
  isLoadingFeed: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
}

const initialState: FeedState = {
  orders: [],
  isLoadingFeed: false,
  feed: {
    total: 0,
    totalToday: 0
  }
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoadingFeed = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoadingFeed = false;
        console.log(action.error.message);
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoadingFeed = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  }
});

export default feedSlice.reducer;
export const selectIsLoadingFeed = (state: RootState) =>
  state.feedSlice.isLoadingFeed;
export const selectFeedOrders = (state: RootState) => state.feedSlice.orders;
export const selectFeed = (state: RootState) => state.feedSlice.feed;
