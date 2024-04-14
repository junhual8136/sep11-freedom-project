# Tool Learning Log

Tool: Phaser

Project: **X**

---

10/26/2023
* I had no clue how to start until I watched a [tutorial](https://www.youtube.com/watch?v=fdXcD9X4NrQ)
* I set up a config file with a scene, and now I'm learning all the functions from the documentation

11/13/2023:
* Set up a basic kaboom (config)[https://kaboomjs.com/doc/setup], (canvas)[https://kaboomjs.com/#kaboom], and (plugins)[https://github.com/notnullgames/tiled-kaboom]
* attempted to load tilemap with the plugin
* attempted to create a sprite and load it into the canvas

11/20/2023
* I tried to use `onKeyDown()` to make wasd controls
```js
onKeyDown("w", () => {
    sprite.move(0, -SPEED) // moves up
})
onKeyDown("a", () => {
    sprite.move(-SPEED, 0) // moves left
})
onKeyDown("s", () => {
    sprite.move(-SPEED, 0) // moves down
})
onKeyDown("d", () => {
    player.move(SPEED, 0) // moves right
})
```
* Also learned what arrow functions are from this and [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) which are basically just like normal functions but arranged differently and also automatically returns if its only one line
```js
// normal function
function add(a,b) {
    return a + b
}
// arrow function
let add = (a,b) => a + b
```

11/27/2023
* I had to learn objects and classes in JS because kaboom uses them and I had no clue how to use them.
    * Learned `class` and `constructor()` functions
    * methods are functions inside an object
    * `this` in js are used inside `constructors()` and logs information of that object
* objects are similar to css in syntaxes expect properties are seperated by commas instead of semicolons.
* [link](https://www.w3schools.com/js/js_function_call.asp) `call()` is used to call methods inside objects
* tried learning regex with [regex101]{https://regex101.com/}


12/4/2023
* Tried looking for tutorials online for kaboom Js that aren't just a step by step guide on how to make a specific game
    * looked through source codes of games on replit that were made with Kaboom.Js
* Continued to learn the basicas of object oriented programming.
    * learned constructor and factory functions
    * `for in` and `for of` loops


12/17/2023
* Messed around with tilemaps and sprite loading

2/1/2024
*  created a constructor function that when called, creates a new object into the game
* tried to use the follow() method to make a entity move toward the player but it just teleports
* used follow() instead on text that display an entity's health instead
<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->

3/4/2024
* attempted to center the game screen with css
    * putting the game inside a div
* tried using the built in health() to create a health system and used onUpdate() to check health every frame
* found out about html modules which allowed me to create different js files so I can seperate the main code and the code for the game map.

3/14
* Attempted to create GUIs with the `draw` and shape functions like `rect`

3/24
* attempted to make a projectile system using `Math.atan2(x,y)` to get the angle between the mouse and the player.

3/31
* `scene('name',()=>{}` to make game menus such as start and game over

4/5
* used `move()` with `sub()` to make a sprite move toward the player
* `fixed()` makes something static/fixed to the screen

4/8
* performance issues when there are too much tiles
