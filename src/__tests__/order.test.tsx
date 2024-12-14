import { configureStore } from '@reduxjs/toolkit';
import orderSlice, { getOrder } from '../../src/services/slices/orderSlice';

describe('Order Testing', () => {
  const expectedResult = {
    success: true,
    orders: [
      {
        _id: '6756f5cee367de001daf7d3e',
        ingredients: ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093c'],
        owner: '6740a8a9b27b06001c3e9ca2',
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2024-12-09T13:51:10.769Z',
        updatedAt: '2024-12-09T13:51:11.714Z',
        number: 62050,
        __v: 0
      }
    ]
  };

  it('тест загрузки заказа', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { order: orderSlice }
    });
    expect(store.getState().order.orderData).toBe(null);
    await store.dispatch(getOrder(62050));
    expect(store.getState().order.orderData).toEqual(expectedResult.orders[0]);
  });
});
