Feature: 
  Viewing Trips

Scenario: 
    Select a trip from the Trip Table View to view its destinations

Given I launch the app
When I type "example@test.com" into the "txtEmail" text field
When I type "abc123" into the "txtPassword" text field
When I touch the button marked "Sign In"
Then I should see a navigation bar titled: "My Trips"
When I touch the 