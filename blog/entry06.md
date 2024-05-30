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
#### Expo 
During my expo presentation, my goal was to not stumble on my pitch which was something difficult as I was not good at public speaking or presenting. I somewhat acheived this through making my elevator pitch simple which was:
[link](https://docs.google.com/document/d/1CTkA5cejtmFIsAXrzmy3vTPbwRi9JOe1MUS77tNvC3s/edit?usp=drive_web&ouid=106478877337369976452)
```
Hello my name is Junhua,
I made a top-down shooter with kaboom.js
Which I'll demo right now,
we can change the controls before we start
enemies will spawn and you can shoot them
once they die,
a new wave will spawn,
the game doesn't have a clear ending,
the goal is to get to the highest wave you can,
you can also buy upgrades to help you in higher waves
```
which was short enough to be said under a minute gives a basic overview of what i Made

#### In class presentation 
[link](https://docs.google.com/presentation/d/1YjBGGBWw0L0pfHdGI_GWlrywG2UYlI3lDZEz4mcNhSw/edit?usp=drive_web&ouid=106478877337369976452)


My main takeaways from the in class presentation was to add a bit of text that isn't code to the slides because I had to rely on looking at what I put on the slide, and give an explanation as I present. 

I also attempted to pratice my presentation through talking to a person and myself but that didn't work as presenting to a class with a lot of people is different than a one on one conversation. 

[Previous](entry05.md) | [Next](entry07.md)

[Home](../README.md)
