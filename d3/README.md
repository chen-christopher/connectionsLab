# Assignment 5(?)

### Project Description

For this project, I wanted to create a popularity poll for the three best pokemon: Snorlax, Psyduck, and Slowpoke. This assignment's interactions are quite simple as users are shown three Pokemon and asked to press the vote button. Upon clicking vote, the user is redirected to the results page which showcases the results for the popularity poll. Since we are using sockets, all of the data is changed whenever another user votes.

For this project, I used D3.js to create my web page. It is a very simple web page that uses D3 to create a pie chart consisting of the different types of Pokemon. D3.js has moved towards using the Observable notebook for most of its functionality. Thus, the pie chart shown on the web page is embedded from the Oberservable notebook. I originally planned on creating the racing bar chart but I had a hard time following the example code.

The link to the webpage is below:
https://chen-christopher.github.io/connectionsLab/d3

### Process

I wasn't sure what I was going to make with D3 in the beginning but I ultimately decided to use a pie chart as it seemed like a good place to start. I did not create a wireframe for this assignment as the layout was extremely simple.

To create the pie chart, I primarily followed the example listed on the ObeservableHQ notebook page. I first had to create my dataset which was split into the type of Pokemon and the number of Pokemon of that type. I realized that the numbers I had double counted Pokemon which were dual type. For example, Pokemon that are Water/Ground type are counted for both Water and Ground type. To remedy this, I added a small text to the inform the users. Although the ObservableHQ notebook is primarily in JavaScript, it was confusing at first as lots of its functions are not in vanilla JavaScript. I spent a considerable amount of time digging through D3's documentation to understand what was going on.

The process to create the pie chart is as follows: initialize your dataset, create the function for the pie chart, call the function. The pie chart function has a lot to unpack. It includes parameters such as the height, width, inner radius, outer radius, colors, stroke width, and angles. After it initializes these variables, it constructs the arc and then the SVG. The SVG then adds the arc shape with the color before appending the text.

To export from ObservableHQ, you must first publish your notebook. Afterwards, you have to hover over the left side of the chart, click the side, and click embed.

### Reflection

I enjoyed learning about D3.js; it was a library that I heard a while ago but never had the chance to explore. It was deinitely confusing at first but there's a bunch of really cool stuff to explore. I originally planned on following the example code for the race bar chart and sunflare chart, but due to time constraints I was not able to.
