import { getIngredients } from '../../src/services/slices/ingredientsSlice';
import { rootReducer } from '../services/store';

describe('RootReducer Testing', () => {
  it('тест инициализации rootReducer', () => {
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
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const state = rootReducer(initialState, { type: getIngredients.fulfilled.type, payload: expectedResult.data });
    expect(state).not.toEqual(initialState);
    expect(state.ingredientsSlice.ingredients).toEqual(expectedResult.data);
  });
});
