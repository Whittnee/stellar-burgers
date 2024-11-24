import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { act } from 'react-dom/test-utils';
import { RootState } from '../store';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

interface IngredientsState {
  isLoadingIngredients: boolean;
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
}

const initialState: IngredientsState = {
  isLoadingIngredients: false,
  ingredients: [],
  buns: [],
  mains: [],
  sauces: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoadingIngredients = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoadingIngredients = false;
        console.log(action.error.message);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoadingIngredients = false;
        state.ingredients = action.payload;
        state.buns = action.payload.filter((i) => i.type === 'bun');
        state.mains = action.payload.filter((i) => i.type === 'main');
        state.sauces = action.payload.filter((i) => i.type === 'sauce');
      });
  }
});

export default ingredientsSlice.reducer;

export const selectBuns = (state: RootState) => state.ingredientsSlice.buns;
export const selectMains = (state: RootState) => state.ingredientsSlice.mains;
export const selectSauces = (state: RootState) => state.ingredientsSlice.sauces;
export const selecetIsLoadingIngredients = (state: RootState) =>
  state.ingredientsSlice.isLoadingIngredients;
export const selectIngredients = (state: RootState) =>
  state.ingredientsSlice.ingredients;
