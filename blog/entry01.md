# Entry 1
##### 11/6/2023

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
  let rect1 = this.add.rectangle(300, 100, 100, 30, 0x00f000, .5);
let rect = new Phaser.Geom.Rectangle(300, 200, 100, 30);
  rect3.fillRectShape(rect);
}
```




[Next](entry02.md)

[Home](../README.md)