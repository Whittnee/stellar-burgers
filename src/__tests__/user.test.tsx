import { getCookie } from '../../src/utils/cookie';
import userSlice, {
  getOrders,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../../src/services/slices/userSlice';

describe('User Testing', () => {
  const getUserResult = {
    success: true,
    user: {
      email: 'test123@gmail.com',
      name: 'test123'
    }
  };
  const authorizationResult = {
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    user: {
      email: 'test123@gmail.com',
      name: 'test123'
    }
  };
  const getOrdersResult = {
    success: true,
    orders: [
      {
        _id: '6759f1a8e367de001daf87a2',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный spicy фалленианский бессмертный бургер',
        createdAt: '2024-12-11T20:10:16.171Z',
        updatedAt: '2024-12-11T20:10:17.156Z',
        number: 62454
      },
      {
        _id: '6759f0cbe367de001daf879c',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный люминесцентный метеоритный бургер',
        createdAt: '2024-12-11T20:06:35.197Z',
        updatedAt: '2024-12-11T20:06:36.026Z',
        number: 62453
      },
      {
        _id: '6759e9bde367de001daf877b',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный экзо-плантаго метеоритный бургер',
        createdAt: '2024-12-11T19:36:29.571Z',
        updatedAt: '2024-12-11T19:36:30.336Z',
        number: 62452
      }
    ],
    total: 62080,
    totalToday: 193
  };

  it('тест авторизации пользователя по токену', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
    expect(state.isAuthenticated).toBe(false);
    const newState = userSlice(state, {
      type: getUser.fulfilled.type,
      payload: getUserResult
    });
    expect(newState.user).toEqual(getUserResult.user);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('тест авторизации пользователя по логину и паролю', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
    expect(state.isAuthenticated).toBe(false);
    const newState = userSlice(state, {
      type: loginUser.fulfilled.type,
      payload: authorizationResult
    });
    expect(newState.user).toEqual(authorizationResult.user);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('тест авторизации пользователя по логину и паролю с ошибкой', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
    expect(state.isAuthenticated).toBe(false);
    const newState = userSlice(state, {
      type: loginUser.rejected.type,
      error: { message: 'error' }
    });
    expect(newState.user).toEqual(state.user);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe('error');
  });

  it('тест регистрации пользователя', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
    expect(state.isAuthenticated).toBe(false);
    const newState = userSlice(state, {
      type: registerUser.fulfilled.type,
      payload: authorizationResult
    });
    expect(newState.user).toEqual(authorizationResult.user);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('тест регистрации пользователя с ошибкой', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state.user).toEqual({
      email: '',
      name: ''
    });
    expect(state.isAuthenticated).toBe(false);
    const newState = userSlice(state, {
      type: registerUser.rejected.type,
      error: { message: 'error' }
    });
    expect(newState.user).toEqual(state.user);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe('error');
  });

  it('тест на получение заказов пользователя', () => {
    const state = userSlice(undefined, { type: '@@INIT' });
    expect(state.orders).toStrictEqual([]);
    const newState = userSlice(state, {
      type: getOrders.fulfilled.type,
      payload: getOrdersResult.orders
    });
    expect(newState.orders).toEqual(getOrdersResult.orders);
  });

  it('тест деавторизации пользователя', () => {
    const initialState = {
      user: {
        email: 'test123@gmail.com',
        name: 'test123'
      },
      orders: [],
      error: '',
      isAuthChecked: true,
      isAuthenticated: true
    };
    const state = userSlice(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state.user).toEqual(initialState.user);
    expect(state.isAuthenticated).toBe(true);
    const newState = userSlice(state, { type: logoutUser.fulfilled.type });
    expect(newState.user).toEqual({
      email: '',
      name: ''
    });
    expect(newState.isAuthenticated).toBe(false);
  });

  it('тест на обновление данных пользователя', () => {
    const initialState = {
      user: {
        email: 'test123@gmail.com',
        name: 'test123'
      },
      orders: [],
      error: '',
      isAuthChecked: true,
      isAuthenticated: true
    };
    const state = userSlice(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state.user).toEqual(initialState.user);
    const newState = userSlice(state, {
      type: updateUser.fulfilled.type,
      payload: {
        succsess: true,
        user: {
          email: 'test@gmail.com',
          name: 'test'
        }
      }
    });
    expect(newState.user).not.toEqual(state.user);
    expect(newState.user).toEqual({
      email: 'test@gmail.com',
      name: 'test'
    });
  });
});
