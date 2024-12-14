import { TIngredient } from '@utils-types';
import constructorSlice, {
  addIngredient,
  initialState,
  moveConstructorIngredient,
  removeIngredient
} from '../services/slices/constructorSlice';

describe('Constructor Testing', () => {
  const initialIngredients = [
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
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
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  it('тест на добавление ингредиента в конструктор', () => {
    const state = constructorSlice(
      initialState,
      addIngredient(initialIngredients[0])
    );
    const { bun } = state.constructorItems;
    expect(bun).toMatchObject(initialIngredients[0]);
  });

  it('тест на удаление ингредиента с конструктора', () => {
    const state = constructorSlice(
      initialState,
      addIngredient(initialIngredients[1])
    );
    const { ingredients } = state.constructorItems;
    expect(ingredients[0]).toMatchObject(initialIngredients[1]);
    const newState = constructorSlice(state, removeIngredient(ingredients[0]));
    expect(newState.constructorItems.ingredients).toStrictEqual([]);
  });

  it('тест на изменение порядка ингредиентов в конструкторе', () => {
    const ingredients = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            id: '123',
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            id: '1234',
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null
    };
    const state = constructorSlice(
      ingredients,
      moveConstructorIngredient({ from: 0, to: 1 })
    );
    expect(state.constructorItems.ingredients).toEqual([
      ingredients.constructorItems.ingredients[1],
      ingredients.constructorItems.ingredients[0]
    ]);
  });
});
