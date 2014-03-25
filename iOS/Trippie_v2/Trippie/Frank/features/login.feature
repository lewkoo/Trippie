Feature: 
  Logging into app

Scenario: 
    Inputting a username and password to move from the 'Login' screen to the 'Trips' screen

Given I launch the app
When I type "example@test.com" into the "txtEmail" text field
When I type "abc123" into the "txtPassword" text field
When I touch the button marked "Sign In"
Then I should see a navigation bar titled "My Trips"