# Assignment 4

### Project Description

For this project, I wanted to create a popularity poll for the three best pokemon: Snorlax, Psyduck, and Slowpoke. This assignment's interactions are quite simple as users are shown three Pokemon and asked to press the vote button. Upon clicking vote, the user is redirected to the results page which showcases the results for the popularity poll. Since we are using sockets, all of the data is changed whenever another user votes.

The link to the webpage is below:

### Process

The process to creating this assignment was relatively straightforward. I first drew out what I expected the workflow to look like (user voting and then receiving data). The socket event for the client side is called when the user presses a vote button. For the server side, the moment it receives the socket emit event from the client, it will update its data and send an emit signal to ALL clients.

I have attached the wireframe and workflow for this assignment below:

!(wireframe)[https://raw.githubusercontent.com/chen-christopher/connectionsLab/main/week8/wireframe.jpeg]
!(workflow)[https://raw.githubusercontent.com/chen-christopher/connectionsLab/main/week8/workflow.jpeg]

Once I established the workflow and overall design, the rest of the project was straightforward. I had to set up all three buttons from the client side and I added a dataset value to each of them to avoid creating 3 separate event listeners. Once the vote button is clicked, the client sends a signal (voting) to the server with the dataset value (which is just the pokemon name). When the server receives the signal (voting), it checks what the pokemon name is and increments the counter for each pokemon accordingly. Afterwards, it sends the updated data (voteResults) to ALL clients. The client is listening for the signal voteResults and upon receiving it, the data is updated accordingly.

To display the data, I decided to have a separate div for each pokemon. The height is dependent on the percentage of votes each pokemon receives. If psyduck receives 50% of the votes, the height of its data div will be 50% of the container. The text on the page is also updated with the percentages and total amount of votes.

After I finished the features of this assignment, I realized that the Show Result button (check the wireframe) was redundant. Thus, I removed it and now when a user clicks vote, he/she is instantly redirected to the results.

### Reflection

I enjoyed working on this assignment. I've had only a little bit of experience working with sockets and I feel this has definitely helped in understanding how to use them. Sockets are pretty cool.

There are a few improvements that could be made. Firstly, I could introduce more pokemon and categorize them by genres and lets users vote. Additionally, this poll would rotate pokemon every now and then so we could gather more data on various pokemon to find the most popular of them all. The style of the web page could be embellished a bit more, but I didn't have the time to design a theme for it.
