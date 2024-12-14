
import { rootReducer } from '../services/store';

describe('RootReducer Testing', () => {
  it('тест инициализации rootReducer', () => {
    const expectedInitialResult = {
      ingredientsSlice: {
        isLoadingIngredients: false,
        ingredients: [],
        buns: [],
        mains: [],
        sauces: []
      },
      constructorSlice: {
        constructorItems: { bun: null, ingredients: [] },
        orderRequest: false,
        orderModalData: null
      },
      feedSlice: {
        orders: [],
        isLoadingFeed: false,
        feed: { total: 0, totalToday: 0 }
      },
      orderSlice: { orderData: null },
      userSlice: {
        user: { email: '', name: '' },
        orders: [],
        error: '',
        isAuthChecked: true,
        isAuthenticated: false
      }
    }
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual(expectedInitialResult);
  });
});
