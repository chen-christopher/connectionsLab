# Project Two: Documentation

By Chris and Yeji

# **Description + Inspiration**

Test-Your-Luck is a 4 player connected application game where users can play three rounds of chance games to compete which each other to see who is the luckiest out of the group 🍀. The main structure of the game was inspired by Jackbox Games where players enter a room code to access a game from their smartphones or tablets and play a set of mini games.

Link to glitch: [https://fire-shining-magnesium.glitch.me/](https://fire-shining-magnesium.glitch.me/)

Link to Github Repository: 

![example.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2bcf00e-c9f9-447c-a568-54aab639158b/Untitled.png)

Screenshot from Jackbox Party Pack 8

# Process

### Brainstorming

When we were brainstorming the type of games we would want to implement, we were drawn to chance games such as rock, paper, scissors, poison chalice, crocodile game, as the outcome would always vary depending. We also wanted to make sure the game was playable by multiple players, greater than two, which contributed to our decision of using chance games.

### Identifying Design Objectives

We started with identifying the design objectives of the game.

1. **Consistency in style**
    
    Since we had multiple levels and different objects contained in each one, it was important to us to have a consistent style throughout the levels. To achieve this, we made our own graphics using figma. We also made sure the fonts used were consistent. We used the font Joti One for all the titles and the color scheme used for each stage changed to visually communicate level change. But the dark tone of the color, used to create a castle-like atmosphere, stayed consistent throughout. 
    

1. **Cartoonish style**
    
    We were both a fan of more cartoonish, flat, simple graphics so we achieved this through keeping the objects flat and using pastel colors. 
    

1. **Minimal Text**
    
    If there is one thing we learnt from user testing, it was that users next want to read a large body of text when they are playing games. Keeping this in mind, we wanted to keep text at a minimum. Other than the title, buttons, and the game instructions, we removed any form of text while the game was running. Even for the level description, we introduced a timer to display one line of text at a time, instead of all of them at once, to make sure the user gave attention to each line of text. 
    
2. **Cool Colored Palette**
    
    The palette used for this website was at a cooler side as we were trying to create a medieval castle like atmosphere. In addition to the palette, the style of the doors (in the pointy arch), the chalice, and the rusted brick walls were used to further help develop this atmosphere.
    
3. **Highlighting interact-able objects**
    
    To achieve using minimal text, we made sure the interactions spoke for themselves. To achieve this, we highlighted the objects or changed the mouse cursor to pointer on hover to indicate a possible interaction. 
    

### Wireframing

With these design objectives in mind, we created a wireframe on Figma, along with all the visuals we would need for the game.

![wireframe.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2fae382-b80d-47f4-aeb2-98f557109a2c/Screen_Shot_2022-04-15_at_11.27.54_AM.png)

### Coding

After the wireframe was completed, we identified the general workflow for the user. Ideally, a user would first create a room and other users would join. The names would all be randomly generated. Once four players have joined the room, the players can start the game. The rules to the game are simple and each user takes turn clicking on one of the objects presented on the screen until one player remains.  

We first started with generating the rooms with sockets. Once a user creates a room from the home page, a signal is sent to the server with its randomly generated name and room code. This information is also stored in the session storage. Each time a new user joins the room, the server sends a signal to all clients, updating the players in the lobby. The server keeps track of how many user are connected in a particular room and which rooms are in use. Once the client presses start game, a signal is sent to the server and then the server sends a signal to all clients in that room. This signal redirects them to the game page. 

One problem we realized is that upon leaving a page (going from lobby to game) users are disconnected from the lobby so we had to reconnect them to the correct room. This was done with the session storage that we saved earlier. On load, the game displays the level one text with the instructions. Afterwards, the server sends a signal to all clients to tell who’s turn it is. There was probably a more optimal way to do it, but what we did was that we had the server send a signal with the name of the current player and if it matched on the client side, it was his/her turn and other players were notified as well. When a user clicks on the shown item (for level one it was the door) the user’s name and guess were sent to the server. Upon receiving the guess, the server compares the guess to the randomly generated answer and sends a response. If it was a match, the server also updates the users object that we generated earlier and marking the player as dead. The signal includes the user’s name and whether or not he/she died. On the client side, if a player dies, all players are notified and the next game is started.  For all three games, similar logic is implemented. 

To keep track of who’s turn it was, we used an array of players that was constructed when the user connected into the game page. Each time a user guessed, the a counter would increment and we’d mod it by the length of the array so that we do not get index out of bound errors. When a user dies, the user is removed from the list. 

One thing we added for the door game was that there would be a reshuffling of the doors. In the first stage, we didn’t want the last player to die all the time (if all 3 players survive the 4th player is guaranteed to die). To resolve this, if the previous three players don’t die, the doors are reset allowing the 4th player to make a choice from any of the four doors and the game continues. This was done by keeping track of how many “safe” doors have been opened and reshuffling them when it occurred. 

To ensure that users were unable to click a previously clicked door, we would add a class that removed point events whenever it was clicked. Additionally, we didn’t want users to be clicking when it was not their turn so we added the same class described above to all objects and that would only be removed when it was their turn. 

# Learnings / Challenges

There were quite a few challenges throughout this project. The first thing that pops to mind would be managing the sockets. We would have problems disconnecting users from the given socket and despite them leaving, they would still show up on the lobby. This would inadvertently just break the game. Another problem that we faced was actually implementing the join lobby functionality. In terms of coding the game, there are definitely parts which are suboptimal. For example, the code for the game logic was extremely repetitive. Additionally, we also created a socket signal for each game despite the games having similar code. One way to remedy this would to change the data that was sent. This would include adding what the current game is and depending on what the data was, the items displayed/game logic would change accordingly. 

I’ve had only a little exposure to sockets and I’ve learned a great deal from this project. Having the ability to connect with others is a pretty cool feature. Other than the optimizations in the code, I'm not sure what the industry standard for sockets looks like and I would have greatly appreciated delving a bit more into that. Due to time constraints, we weren't able to fully flesh out some of the ideas we had, but overall it was a fun and interesting projec to work on. 


# Moving Forward

1. **Incorporation of Sound / Music**
    
    To improve the game, we want to add sound design. To do so, we would add medieval themed music and add a sound effect whenever an event happens. For example, when the user dies, there would be a dramatic sound effect, when the crocodile snaps it would create a large sound to add tension to the game. We could also incorporate a narrator, like in Jackbox, to read the level descriptions.
    
2. **Improved UI/UX**

	While playing the game, we realized that there were a few areas in which we could improve in the UI/UX department. For example, better highlighting who’s turn it was, the next player, and the players alive. This could include a text block on the top right that had an indicator on who it was currently. We designed it in our initial wireframe but due to time constraints we were unable to flesh it out. 

3. **Mouse Movement**
	
	Currently, there isn’t much a user can do other than wait for his/her turn. Additionally, we can only see the result of other players. One addition could be that while other players are waiting, they can see the current players mouse movement.