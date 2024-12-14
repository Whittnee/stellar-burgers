import { configureStore } from '@reduxjs/toolkit';
import feedSlice, { getFeeds } from '../../src/services/slices/feedSlice';

describe('Feed Testing', () => {
  const expectedResult = {
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

  it('тест индикатора загрузки заказов', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { feed: feedSlice }
    });
    expect(store.getState().feed.isLoadingFeed).toBe(false);
    const promise = store.dispatch(getFeeds());
    expect(store.getState().feed.isLoadingFeed).toBe(true);
    await promise;
    expect(store.getState().feed.isLoadingFeed).toBe(false);
  });

  it('тест загрузки заказов', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(expectedResult)
      })
    ) as jest.Mock;
    const store = configureStore({
      reducer: { feed: feedSlice }
    });
    expect(store.getState().feed.orders).toStrictEqual([]);
    await store.dispatch(getFeeds());
    expect(store.getState().feed.orders).toEqual(expectedResult.orders);
    expect(store.getState().feed.feed.total).toEqual(expectedResult.total);
    expect(store.getState().feed.feed.totalToday).toEqual(
      expectedResult.totalToday
    );
  });
});
