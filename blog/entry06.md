# Entry 6
##### 5/28/24

### EDP
I am on step 8 of the engineering design process where I'm communicating the result by showing what I've made to people in my class and other SEP students. With this, I have gone through the entire EDP. 

### Skills
Some skills I've improved from this project was time management, I had to get my project to be presentation standards which meant I had to spend the entire week prior on the adding the beyond MvP features that I had planned but never gotten to. Which had led me to commit over 30 times in a week which was almost a third of my total on this project. Another skill I had improved was problem decomposition when I made menus and UI. I broke the task down into smaller parts such as creating a background, text, and creating buttons and adding functions onto it. 
```js
  function createButton(name,buttonRadius,width,height,x,y,rgb,doThis) {
    const button = add([
        rect(width, height, { radius: buttonRadius  }),
        pos(x,y),
        outline(1),
        area(),
        scale(1),
        anchor("center"),
        fixed(),
        z(2),
    ])
    button.add([
        text(name),
        anchor("center"),
        color(RBG),
        fixed(),
    ])
    button.onHoverUpdate(() => {button.outline = 5})
    button.onHoverEnd(() => {button.outline = 1})
    button.onClick(doThis)

    return button
}
```
I made a reusable function that creates buttons, which allowed me to create UIs easily, changing certain parameters to fit the context.

### content

[Previous](entry05.md) | [Next](entry07.md)

[Home](../README.md)
