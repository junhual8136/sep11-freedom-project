# Entry 3
##### 2/5/2024

### Content
I've been slowly learning new concepts and creating a game which will probably be my mvp. Doing things such as updating text or doing checks can not be just put somewhere random in the code. I realized that since the code executes top-down, by the time the game loads, all functions and checks are already performed. Which means I couldn't just write an if statement somewhere to update something like the health text whenever it goes down.

I reazlied that I had to put a lot of checks and updates in the `onUpdate(()=>{ })` function. The function will execute everything inside every frame. Kaboom runs at 60 fps, so the code inside will run 60 times a second.

During this time, I had also found out that Kaboom.js had a [Discord server](https://discord.com/invite/aQ6RuQm3TF) and there are channels where you could ask questions or help about anything related the framework.


By going through the [kaboom documentation](https://kaboomjs.com/), and searching through random keywords that are related to what creating text. I learned how to create health in kaboom with variables and display it in text with the `add([text]).` function
```js
let playerHealth = 100
const hpBar = add([
    text(`Health:${playerHealth}`, {size: 24,}),
    pos(player.pos.x-590, player.pos.y-400),
    { value: health },
])
```
The player you move around will have 100 health points and there is a text at the top left of the screen displaying your health. I used `onUpdate(()=>{ })` to update the health text whenever it updates
```js
onUpdate(() => {
    hpBar.text = `Health:${playerHealth}`
})
```
An issue with the `text()` function was it was considered a sprite inside the game. Whenever the camera moves, the health text would be in the same place of the game, instead of being fixed to somewhere in the screen
![image](../ss/health.png)
I did not find any other methods to create text so for now, I used `onUpdate(()=>{ })` to update the text location relative to the player. Whenever the player moves, the text would move as well but it would appear to be fixed to somewhere
```js
onUpdate(() => {
    hpBar.text = `Health:${playerHealth}`
    hpBar.pos.x = player.pos.x-590
    hpBar.pos.y = player.pos.y-400
})
```
This should always update the text location so it would always be in the top-left part of the screen to the player(camera is focused on).

During feburary break, I will be learning how to create and use scenes so I could make a death and maybe a start menu.


### EDP
I am currently on step 4 of the engineering design process where I know what I'm making and finding specific functions in kaboom.js that will be needed to make it. I used the [kaboom documentation](https://kaboomjs.com/) to look for these functions. I then used those functions such as `add([text)` and `onUpdate(()=>{})` to create a basic game and tinker around with the settings to make it work for the game. The next step would be for me to build my mvp.

### Skills
I continued to improve my skills on how to google and debugging. While on the kaboom documenation, I found out that kaboom.js had a discord server which can offer help whenever I'm stuck. I also googled how to create certain features with kaboom. I also searched for how to rotate a sprite to face the direction of the mouse since I don't know the how to calculate the angles to turn. I found [This](https://blog.jordienric.com/kaboomjs-how-to-get-the-angle-of-the-mouse-in-relation-to-a-playerobject) which had:
```js
const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x);
const angleInDeg = (angle * 180) / Math.PI;
```
which is the math required to find the degree of the mouse in relation of the sprite.
I also continued to use my debugging skills to fix issues with my code. One example was when I had to find a solution to the health text not being fixed to the screen. I ended up using `onUpdate(()=>)` to move the sprite every frame to the very top left of the camera.



[Previous](entry02.md) | [Next](entry04.md)

[Home](../README.md)
