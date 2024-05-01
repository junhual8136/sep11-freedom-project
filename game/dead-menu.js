import { createStartMenu } from "./start-menu.js"
import { fpsDisplay, gameHeight, gameWidth } from "./main.js"


function createButton(name,x,y,ignoreThis) {
    const startButton = add([
        rect(240, 80, { radius: 8 }),
        pos(x,y),
        area(),
        scale(1),
        anchor("center"),
    ])
    startButton.add([
        text(name),
        anchor("center"),
        color(0, 0, 0),
    ])
    startButton.onHoverUpdate(() => {startButton.scale = vec2(1.2)})
    startButton.onHoverEnd(() => { startButton.scale = vec2(1)})
    startButton.onClick(ignoreThis)
}


function endGame() {
    scene('end', () => {
        fpsDisplay()
        const score = add([
            text("Dead", {
                font: 'times-new-roman',
                size: 50,
            }),
            pos(gameWidth/2, gameHeight/4),
            color(RED),
        ])
        createButton('menu',gameWidth/1.85,350, ()=> {
            go('startMenu')
        })
    })
    go('end')
    console.log(gameWidth,gameHeight)
}

export { endGame }