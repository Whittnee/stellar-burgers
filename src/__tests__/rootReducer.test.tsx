import { initialState } from '../services/slices/constructorSlice';
import { rootReducer } from '../services/store';

describe('RootReducer Testing', () => {
  it('тест инициализации rootReducer', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const state = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
