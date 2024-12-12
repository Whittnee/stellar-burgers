import { getIngredientsApi } from '../../../src/utils/burger-api';
import ingredients from '../../fixtures/ingredients.json';

import order from '../../fixtures/order.json';
import user from '../../fixtures/user.json'

const mockTokens = {
  accessToken: 'testAccessToken123',
  refreshToken: 'testRefreshToken123'
};

describe('Constructor Testing', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: ingredients
    }).as('getIngredientsApi');
  });
  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', {
      statusCode: 200,
      body: user
    }).as('getUserApi');
  });
  beforeEach(() => {
    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      delay: 1000,
      body: order
    }).as('orderBurgerApi');
  });

  it('тест на получение ингредиентов', () => {
    cy.visit('/');
    cy.wait('@getIngredientsApi').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body.data).to.deep.equal(ingredients.data);
    });
  });

  it('тест на добавление ингредиентов в конструктор', () => {
    cy.visit('/');
    cy.get('.constructor-element__row').should('have.length', 0);
    cy.contains('Краторная булка N-200i')
      .should('exist')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.get('.constructor-element__row').should('have.length', 2);
    cy.contains('Биокотлета из марсианской Магнолии')
      .should('exist')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.get('.constructor-element__row').should('have.length', 3);
    cy.contains('Соус Spicy-X')
      .should('exist')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.get('.constructor-element__row').should('have.length', 4);
    cy.get('.constructor-element__row')
      .contains('Биокотлета из марсианской Магнолии')
      .siblings('.constructor-element__action')
      .click();
  });

  it('тест работы модального окна', () => {
    cy.visit('/');
    cy.contains('Краторная булка N-200i').click();
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('exist');
    cy.contains('Детали ингредиента').siblings('button').click();
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('exist');
    cy.get('.RuQycGaRTQNbnIEC5d3Y').click({ force: true });
  });

  it('тест на создание заказа', () => {
    cy.setCookie('accessToken', mockTokens.accessToken);
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', mockTokens.refreshToken);
    });
    cy.visit('/');
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .within(() => {
        cy.get('button').click();
      });
    cy.contains('Оформить заказ').click();
    cy.get('.xqsNTMuGR8DdWtMkOGiM').contains('68322').should('exist');
    cy.get('.xqsNTMuGR8DdWtMkOGiM').find('button').click();
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('not.exist');
    cy.get('.constructor-element__row').should('not.exist');
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });
});
