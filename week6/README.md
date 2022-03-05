# Assignment 3

### Project Description

For this project, I created a dataset consisting of the 10 fragrances that I have been using. I've kind of picked up a hobby (or well used to) of collecting different fragrances. After a while, it turned out that I had too many and I gave many away. I realized that there were a certain few that I gravitated towards and I used those as the basis for my project. The data contains fields such as the house, classification, notes, gender, and my own ranking. The main features for this web page is that the user can filter the dataset by pressing on a specific button.

### Process

Before I started coding, I needed to create the dataset. This itself took a while as I had to find the notes of the fragrances as well.

This assignment is divided into two parts: front end and back end. For the back end, most of it was similar to what we did in class. I primarily focused on using queries and filtering the dataset with it. The two main filters that I chose to use were the gender the fragrance was marketed towards and the different houses (brands). I just needed to set up the routing and ensure that the data returned was accurate.

The front end part of the assignment was setting up a bunch of event listeners. I wasn't sure if this was the correct way to set things up as I just added a button for each of the brands, a button for my top three, and target audience. By clicking on a button, it launches a fetch request and returns a JSON object containing that data. For example, clicking on "Men" will return all fragrances in the dataset that are targetted towards men. I then created a function that loaded the data into a div and displayed it on the web page.

I did not plan on creating some type of design for the web page but I felt it looked a little bare bones so I added some minimal styling to it.

### Reflection

For this assignment, I felt like I learned a few things. Before when I was working with Node, it was primarily with React.js and I was not too familiar with it. I think it was good to play around with vanilla JS and see how the interactions were supposed to work out. I'm not too sure if what I did with the requests was the optimal way to do it as I kept getting errors from the server side, but it does work.
