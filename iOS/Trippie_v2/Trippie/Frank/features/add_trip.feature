Feature: 
  Adding Trip

Scenario: 
    Add a trip
Given I launch the app
When I type "example@test.com" into the "txtEmail" text field
When I type "abc123" into the "txtPassword" text field
When I touch the button marked "Sign In"
Then I should see a navigation bar titled: "My Trips"
When I touch the Plus button
Then I should see a navigation bar titled: "Add New Trip"
Then I type "This is a new trip" into the "txtTripName" text field
Then I should see a navigation bar titled "My Trips"