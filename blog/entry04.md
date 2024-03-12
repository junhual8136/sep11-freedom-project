# Entry 4
##### 03/11/2024

### EDP
I am currently on step 5 of the enginnering design process where I'm building my MVP. I am using all the methods I learned from the [kaboom documentation](https://kaboomjs.com) as well as looking back at it as a reference for certain things. One example was when I found out you could pass sprite tags as parameters to the `onCollide` function in the documentation and that allowed me to target the specific sprite that collided with the player.

### Skills 
While building my MVP, one of the skills I improved was attention to detail. For example with this line of code:
```js
firstWave[first] = add([sprite("64xTile"), area(),body(),pos(randomX, randomY),scale(0.5),"hostile"],{health: 100})
```
When this sprite collides, it doesn't do anything with the health property because it wasn't inside `add(array)`. The arguments passed into `onCollide("player","hostile")` does not contain the health property since it wasn't part of the object but instead was another sub element inside an array. It took me a few weeks before I noticed it and the health system finally works.


Another skill I improved was how to google. I tried to find out how to create a pathfinding system for sprites so they would slowly move toward the player and move around collidable objects if possible. I found [Replit example](https://replit.com/@AaronJewell/Pathfinding-in-Kaboom#scenes/main.js) of a pathfinder algorithm. Although I have no clue whats going on, it gave me some insight on how to create one. 

### Content



[Previous](entry03.md) | [Next](entry05.md)

[Home](../README.md)
