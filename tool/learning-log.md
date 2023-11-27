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
* objects are similar to css in syntaxes expect properties are seperated by commas instead of semicolons. 

<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
