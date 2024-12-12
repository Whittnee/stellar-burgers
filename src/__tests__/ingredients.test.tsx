import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice, {
  getIngredients,
  selectIngredients
} from '../../src/services/slices/ingredientsSlice';

describe('Ingredients Testing', () => {
  const expectedResult = {
    success: true,
    data: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ]
  };

  it('тест индикатора загрузки ингредиентов', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { ingredients: ingredientsSlice }
    });
    expect(store.getState().ingredients.isLoadingIngredients).toBe(false);
    const promise = store.dispatch(getIngredients());
    expect(store.getState().ingredients.isLoadingIngredients).toBe(true);
    await promise;
    expect(store.getState().ingredients.isLoadingIngredients).toBe(false);
  });

  it('тест загрузки ингредиентов', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { ingredients: ingredientsSlice }
    });
    expect(store.getState().ingredients.ingredients).toStrictEqual([]);
    await store.dispatch(getIngredients());
    const ingredients = store.getState().ingredients.ingredients;
    expect(ingredients).toEqual(expectedResult.data);
  });
});
