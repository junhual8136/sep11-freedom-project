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
`addLevel([],{})` creates a tilemap and you can specify what each symbol represents. With this, I created a ground layer with a the grass tile sprite which was loaded with `const grassTile16x = loadSprite("grass-tile-16", "assets/grass.png")` I then created a second invisible layer that acts like a border. The replit documentation said that the `solid()` property would prevent sprites from moving past it which is basically creating collision. However, It turned out that the feature was removed in Kaboom 3.0 and did a bit of googling. Out of all the places, I found a reddit post on [r/learnjavascript](https://www.reddit.com/r/learnjavascript/comments/15t5d9b/kaboomjs_solid_is_not_defined/?rdt=43048) that had the same issue and one comment had a [link](https://github.com/replit/kaboom/issues/662#issuecomment-1383741122) to the kaboom github which said that the new replacement for `solid()` was `body({isStatic: true})]`. This made me realize that I should've read the Kaboom.js documentation more carefully as it was stated in the body() function paremeters. 
```
isStatic?: boolean
If object is static, won't move, and all non static objects won't move past it.
```


[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)
