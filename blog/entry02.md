# Entry 2
##### 12/12/2023

### Content  
During the past month, I learned how to do most of the basic things in Kaboom.js such as loading sprites, creating a map, adding controls, animations, and the physics engine (collisions). One important thing I learned was the physics engine. I used the [replit doucmentation](https://docs.replit.com/tutorials/kaboom/physics-playground-with-kaboom) which taught me how to create collisions in a top-down style game. 
```js
const grassTile16x = loadSprite("grass-tile-16", "assets/grass.png")

const map = [
    addLevel([
        "gggggggggggggggggggggggggggggg",
        "gggggggggggggggggggggggggggggg",
        "gggggggggggggggggggggggggggggg",
        "gggggggggggggggggggggggggggggg",
        "gggggggggggggggggggggggggggggg",
        "gggggggggggggggggggggggggggggg",
        "gggggggggggggggggggggggggggggg",
    ], {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            "g" : () => [sprite("grass-tile-16"),]
        }
    }),
    addLevel([
        "000000000000000000000000000000",
        "0                            0",
        "0                            0",
        "0                            0",
        "0                            0",
        "0                            0",
        "000000000000000000000000000000",

    ], {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            '0': () => [area({shape: new Rect(vec2(0), 16, 16)}),body({isStatic: true})],
        }
    })
]
```
This
[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
