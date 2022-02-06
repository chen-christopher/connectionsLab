# Assignment 2

### Project Description

For this project, I wanted to create some type of interaction with art. As technology progresses, there isn't much you can do with paintings or prints other than look at them; I wanted to incoporate some type of interactions with art pieces. This idea originally came to me when I was building a web page for my artist friend. I did not get the chance to fully flesh it out until now.

This assignment has two interactions: one with hover and the other with a click. The hover interaction is done witth purely CSS while the clicking interaction uses JavaScript. In this assignment, I split an art work into three separate sections and inside each of these sections there contains a few characters which are hidden. By hovering over a section, the characters within the section will show up. Lastly, by clicking any section, the three sections combine together forming the actual art piece with all the characters shown.

### Process

Before I started coding, the images themselves needed some preprocessing. The original image itself had to be divided into three sections equally. I was given the characters as separate images which helped with positioning the characters within the painting.

The layout of the assignment is very simple: it's a full screen div that contains a flex box. The flex box contains the three images that are separated slightly with a margin. The character images are the exact same size as each individual image and by using position absolute, I can position them to where they are exactly as the original image. I then set the opacity for all of the characters to 0 and by hovering, it increases the opacity.

The onclick event requires animations. The first click slides all three images together and shows the complete art piece. The second click then reverts everything and causes each individual section to slide away from each other. This interaction is done with adding/removing the animation class from my CSS. To check which "state" I was in, I had a boolean variable called "endPageShown" and depending on if it were true or false, a different animation would play. Lastly, to prevent users from spam clicking the art piece, I added another boolean variable called "endAnim" that is set to false when a user clicks on the art piece. While "endAnim" is false, users are unable to keep clicking. The variable is then set to true after the animation finishes and this is done by using setTimeout().

I have attached the wireframe for this assignment below:
!(wireframe)[wireframe.jpeg]

### Reflection

For this assignment, I tried to be a bit more mindful with my naming like the previous assignment. However, I don't particularly agree with one of the naming conventions/feedback that I was given: "try to avoid using `.className tag` for styling. Make it just .className." I believe that there are some cases where using a .className tag makes a lot more sense. For example in this assignment, all three of my images have exactly the same style and by using .className img, I can apply CSS to each of the images instead of adding it to each image individually. I can understand why it could be a bit confusing to use .className tag if other people were to read your code, but I feel like it's also quite intuitive for a block element containing only images to have a tag for images and have the block class name contain the structure for the images.

While working on this assignment, I realized that your animation can be interrupted if you allow the user to spam the interaction. Although my solution of using setTimeout() works, I'm not sure if this is the optimal way to go about it.
