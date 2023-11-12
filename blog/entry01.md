# Entry 1
##### 11/6/2023

### Content
I decided to make a survival game with kaboom. So far, I tinkered with both phaser and kaboom but phaser's documentation and syntaxes were confusing so i decided to switch to kaboom. I made a tile map with [tile](https://thorbjorn.itch.io/tiled). I managed to export it to a json file and loaded it in phaser with `.loadJsonTile("map","map.json")` However, i was unable to assign collisons to different layers and I was having a hard time with the camera which made me switch to Phaser. With kaboom, there is no option to load a tilemap but there was a [plugin](https://github.com/notnullgames/tiled-kaboom) that does that and I later learned that you can manually add tiles to simulate a walls on a top-down game. It was also easier to use kaboom since kaboom functions were just arrow functions
For example, these are the two ways i found to create a rectangle on kaboom and phaser
```js
// with kaboom
add([
    rect(label.width, label.height),
    color(0, 0, 255),
    children(label),
])
```
```js
// with phaser
function create() {
    rect1 = this.add.rectangle(300, 100, 100, 30, 0x00f000, .5);
    new Phaser.Geom.Rectangle(300, 200, 100, 30);
    rect.fillRectShape(rect1);
}
```
### EDP
I am currently on the defining and researching the problem. I chose to make a top down survival game and chose a tool / game engine. I am also looking through tutorials on youtube, reading the documentation, and tinkering by making a game with help from forums and stackoverflow. The next step would be to start brainstorming the problem or start creating the game after getting comfortable with my tool.

### Skills
Some skills I used when learning Kaboom and Phaser were how to google, debugging and attention to detail. I used google to search through documentations, posts on forums and video tutorial. Which had helped me learn a bunch of functions the tool had to offer. While tinkering by making a simple game, I used debugging and attention to detail as kaboom / phaser both had strict syntaxes and the entire code will not run if there is a syntax error. I used attention to detail in the IDE and looked for opening and closing colors of syntaxes. If they were red, it meant that there isn't the other.
I used the debugger in the devoloper tools to fix all the errors preventing things from starting, such as when I had to use add import files so that the game will be able to access the config file.


[Next](entry02.md)

[Home](../README.md)