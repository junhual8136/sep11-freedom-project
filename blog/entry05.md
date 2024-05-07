# Entry 5
##### 5/03/2024

### EDP
I am currently step 7 of the EDP where I am finishing my MVP and adding things beyond it. I am adding things such as textures and models to my project as well as improving performance by reducing the amount of objects in the game through increasing the size of each tile to create a bigger map with less tiles rather than creating hundreds of individual tiles with their own custom property which uses up a lot of the game's resources.  

### Skills 
Some skills I improved on while working beyond my MVP was organization. I had to refactor a lot of old code that were a mess such as the old GUIs I made that follows the camera to look fixed on the screen. This was before I discovered the `fixed()` method. I had also learned how to use javascript modules. Instead of writing everything in one file,  i seperated each game scene such as the start and actual game in different files which I then export and import whatever was needed. 

I also did some time management as I only have a little more than a month before the project was due. I tried to work on the project at least twice a week for an hour or two. 
### Content
I noticed that my game was running quite slow so I had created a counter that showed the frames per second
```js
function fpsDisplay() {
    const fps = add([
        text(`${debug.fps()}`, {size: 24,}),
        pos(gameWidth - 30,15),
        color(0,255,0),
        fixed(),
        z(1),
    ])
     onUpdate(() => fps.text = debug.fps())
}
```
With this, I was able to debug what was causing lag by commenting out parts that I thought would cause lag
With this, I had noticed that the more lines I removed from my tilemap,  the higher the frames got. 
I did some [research](https://stackoverflow.com/questions/69959651/is-there-a-way-to-merge-multiple-tiles-in-a-level-kaboom-js) and found out that Kaboom has trouble rendering thousands of tiles since every tile is an object with a lot of properties.

```js
 addLevel([
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",    
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        ], {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                "g" : () => [sprite("grass-tile-16"),scale(4)],
                '0': () => [area({shape: new Rect(vec2(0), 16, 16)}),body({isStatic: true})],
            }
```
Each tile was 32px by 32px big and there were a few hundred in this one single scene. My solution was to just increase the tile's width and height so that I can use less and make a bigger map.
However, I found out that the tiles were still 32px by 32px but they were placed in a 128x by 128x grid. 


![image](https://github.com/junhual8136/sep11-freedom-project/assets/114585741/207920dd-e3df-4d59-930d-e2e9e090ed2b)

I realized that I could just increase the scale of my tile
```js
{
            tileWidth: 128,
            tileHeight: 128,
            tiles: {
                "g" : () => [sprite("grass-tile-16"),scale(8)],
                '0': () => [area({shape: new Rect(vec2(0), 16, 16)}),body({isStatic: true})],
            }
```
Which led to less lag and had the same result as a tilemap with hundreds of smaller tiles.


[Previous](entry04.md) | [Next](entry06.md)

[Home](../README.md)
