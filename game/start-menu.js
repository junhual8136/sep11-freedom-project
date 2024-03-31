
import {gameHeight, gameWidth} from './main.js'

function createStartMenu() {
    scene('startMenu', () => {
        setBackground(Color.fromHex('#000000'))

        const score = add([
            text("name to be decided", {
                font: 'times-new-roman',
                size: 40,
            }),
            pos(gameWidth/6, 130),
            color(RED),
        ])

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
        createButton('start',gameWidth/6,360, ()=> {
            go('game')
        })
    })
    go('startMenu')
}

export { createStartMenu }