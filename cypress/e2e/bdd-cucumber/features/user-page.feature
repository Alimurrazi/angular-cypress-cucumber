Feature: User List functionality
  Background: Prepare user page
    Given I am on the user page

  Scenario: Users appear in UI when API call succeeds
    When I click the "Get Users" button
    Then A api call will be requested with valid response
    And user list will be appear on successful api request

  Scenario: Users do not appear in UI when API call fails
    When I click the "Get Users" button to check failed response
    Then A api call will be requested with failed response
    And User list will not appear on failed api request
