import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { RootState } from '../store';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const info = await loginUserApi(data);
    if (info.success) {
      setCookie('accessToken', info.accessToken);
      localStorage.setItem('refreshToken', info.refreshToken);
    }
    return info;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const info = await registerUserApi(data);
    if (info.success) {
      setCookie('accessToken', info.accessToken);
      localStorage.setItem('refreshToken', info.refreshToken);
    }
    return info;
  }
);

export const logoutUser = createAsyncThunk('user/logut', async () => {
  const info = await logoutApi();
  if (info.success) {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
  return info;
});

export const getOrders = createAsyncThunk('orders/getAll', getOrdersApi);

export const getUser = createAsyncThunk('user/get', getUserApi);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

interface UserState {
  user: TUser;
  orders: TOrder[];
  error: string;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {
    email: '',
    name: ''
  },
  orders: [],
  error: '',
  isAuthChecked: true,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          email: '',
          name: ''
        };
        state.isAuthenticated = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        console.log(action.error.message);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.userSlice.user;
export const selectOrders = (state: RootState) => state.userSlice.orders;
export const selectError = (state: RootState) => state.userSlice.error;
export const selectIsAuthChecked = (state: RootState) =>
  state.userSlice.isAuthChecked;
export const selectisAuthenticated = (state: RootState) =>
  state.userSlice.isAuthenticated;
