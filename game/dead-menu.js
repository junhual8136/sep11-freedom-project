import { createStartMenu, createButton } from "./start-menu.js"
import { fpsDisplay, gameHeight, gameWidth } from "./main.js"



function endGame() {
    scene('end', () => {
        fpsDisplay()
        setBackground(Color.fromHex('#808080'))
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