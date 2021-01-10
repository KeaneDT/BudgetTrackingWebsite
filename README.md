# ID_S10202630_Keane-Travasso_ASG2

For this ID Assignment 2 I have decided to use Html,Css,Javascript,Bootstrap and some APIs to make a budget tracker application that can be ued on both mobile and desktop. The name of this application is a simple one, Budget Tracker. I might improve on the name futher down the road. The application consists of 3 main parts, the title screen, the about section and the tracker itself. 

The tracker will use simple Javascript, to take the budget entered by the user to create the balance. There will be a month input to track the balance and expenses. The user can then input as many expense inputs as they want which will then be deducted from the balance. The user will be able to see all the expenses that they have added to be deducted from the balance. If the user had made a mistake, they will be able to clear the expenses list by clicking on a button. I will also add a feature that will alert the user if the balance has gone to 0 or less than 0. Once the user has input all the expenses for the month, they can click on the save button which will save the total expense cost and the balance for that month in the local storage of the website. The results of which will then be displayed being compared to other 'saved' inputs by the user for the previous months, using Charts.js. If the user chooses, they can clear the local storage of the website.

(I might find an API to make this process of tracking and logging data easier.)

Some additional features i would like to add to the website is a dark mode feature which will switch the color theme of the page upon clicking an icon.

# Problems Faced
I initially wanted to add a line chat below the doughnut chart, which would compare the total expenses across the various months objects saved in the local storage. However, I had to remove this feature as the line chart would keep bugging out and would break the application.

Another Issue that users might face that I was unable to fix was the doughnut chart disappearing and not being loaded back in after creating and saving objects rapidly. This only happed to me once so it should not be too much of an issue.

Creating an object month with the same name would also bug the Localstorage out and would mix up the values.

# Reason

The main reason I am creating this application is to help people to keep track of their spending habits and alongside this, promote healthy spending habits. I think that overspending is an issue in this day and age as I have seen many people not set monthly budgets for themselves and spend an enormous amount of money on unnecessary expenses.

From the perspective of the user, I would like a simple to use application which would enable to log and track my spending habits. I believe that after consiously using this application for an extended period of time, budgeting would become a habit I unconsiously perform which will help me save up more money for the long run.

# Links to Wireframe

The Wireframe files can be found in the ID_S10202630_Keane Travasso_Wireframe folder.
It consists of 2 .xd files, one for the Desktop view and the other for the mobile view.

# Features implemented

-Allows users to input a budget which would set the initial value for the budget variable
-Allows users to input their expenses for the month as well as the categories which would be deducted from the balance variable
-Allows users to save the final balance once they have subtracted all their expenses
-Allows users to a overview of which categories they spent the most money at, in the form of a doughnut chart
-Budget input field only allows valid numbers and filters out any non-numbers
-All submit buttons do not work unless there are values in the respective input fields
-Adding expenses will 'lock' the input fields for month and budget, asking the user to confirm if they want to make some changes
-All expenses inputted are appended to the expense list as well as their category
-There is a clear button in the expense list which clears the list and restores the original balance amount
-The application will alert the user if the expense value is more than the balance value
-Expense changes are mirrored in the chart as soon as they are made.
-Save button in the Expense List pushes an object into an array, which is then stored in localstorage.
-Clicking the load button allows users to load previously saved data to edit. The changes can then be saved and will be stored in the local storage.
-If there are multile objects saved, they can be cycled through by Loading save, then Saving changes. Doing this will move on to the next object saved.
-At the very bottom of the page there is a Clear all data button which will clear localstorage.

-Retrieving the values from the local storage would first check that the local storage is not empty.
# Technology used

So far I have used Bootstrap, Jquery & Chart.Js to help me make the website.

I have also added nomalize css: https://necolas.github.io/normalize.css/8.0.1/normalize.css

# Media 
Money Image used from: https://www.investopedia.com/terms/m/money.asp

# Acknowledgements
Color Scheme for doughnut chart: http://www.mulinblog.com/a-color-palette-optimized-for-data-visualization/
How to create alert boxes: https://www.w3schools.com/howto/howto_js_alert.asp
How to create Dark Mode Toggle Switches: https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
