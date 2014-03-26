Then /^I should be on the login screen$/ do 
  element_exists("view:'UIButton' marked:'Sign in'")
end

Then /^I fill out the fields$/ do
	fill_in 'Email', :with => 'example@test.com'
	fill_in 'Password', :with => 'abc123'
end

Then /^I click the Sign in button$/ do
	touch("view:'UIButton' marked:'Sign in'")
end

Then /^I should be on the trip screen$/ do 
	wait_for_element_to_exist("view:'UINavigationItemView' marked:'My Trips'")
end

Then /^I wait for trips to load$/ do
	wait_for_element_to_exist("view:'UILabel' marked:'This is a test trip'")
end

Then /^I click the test trip$/ do
	touch ("view:'UILabel' marked:'This is a test trip'")
end

