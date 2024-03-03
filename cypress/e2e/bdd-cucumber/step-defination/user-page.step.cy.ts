import {
  Given,
  When,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

Given('I am on the user page', () => {
  cy.visit('/');
});

When('I click the "Get Users" button', () => {
  cy.intercept('GET', apiUrl).as('getUserList');
  cy.contains('Get User').click();
});

Then('A api call will be requested with valid response', () => {
  cy.wait('@getUserList').then((interception) => {
    expect(interception.request.url).to.eq(apiUrl);
    expect(interception.response?.statusCode).to.eq(200);
  });
});

Then('user list will be appear on successful api request', () => {
  cy.get('span.user-name').its('length').should('be.greaterThan', 0);
});

When('I click the "Get Users" button to check failed response', () => {
  cy.intercept('GET', apiUrl, { forceNetworkError: true }).as('getUserList');
  cy.contains('Get User').click();
});

Then('A api call will be requested with failed response', () => {
  cy.wait('@getUserList').then((interception) => {
    expect(interception.request.url).to.eq(apiUrl);
    expect(interception.error).to.exist;
    expect(interception.error?.message).to.eq('forceNetworkError called');
  });
});

Then('User list will not appear on failed api request', () => {
  cy.get('span.user-name').should('not.exist');
});
