import { orderBurgerApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

export const orderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => orderBurgerApi(data)
);

interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      }
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
    },
    resetConstructor(state) {
      state.orderModalData = null;
      state.orderRequest = false;
    },
    moveConstructorIngredient(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const [ingredient] = state.constructorItems.ingredients.splice(from, 1);
      state.constructorItems.ingredients.splice(to, 0, ingredient);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        console.log(action.error.message);
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export default constructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveConstructorIngredient
} = constructorSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.constructorSlice.constructorItems;
export const selectOrderModalData = (state: RootState) =>
  state.constructorSlice.orderModalData;
export const selectOrderRequest = (state: RootState) =>
  state.constructorSlice.orderRequest;
