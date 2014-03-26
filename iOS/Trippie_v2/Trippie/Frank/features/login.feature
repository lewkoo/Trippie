Feature: 
  Logging into app

Scenario: 
    Inputting a username and password to move from the 'Login' screen to the 'Trips' screen

Given I launch the app
Then I should be on the login screen
Then I fill out the fields
Then I click the Sign in button
Then I should be on the trip screen