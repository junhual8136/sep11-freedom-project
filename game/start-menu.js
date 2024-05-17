
import {fpsDisplay, gameHeight, gameWidth} from './main.js'

function createStartMenu() {
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

    scene('startMenu', () => {
        setBackground(Color.fromHex('#808080'))
        fpsDisplay()

        const title = add([
            text("name to be decided", {
                font: 'times-new-roman',
                size: 50,
            }),
            pos(gameWidth/6, 140),
            color(BLACK),
        ])


        createButton('start',gameWidth/6,360, () => {
            go('game')
        })
        createButton('instructions',gameWidth/6,500, () => {
            go('instructions')
        })
    })

    scene('instructions', () => {
        createButton('Back',gameWidth/2, gameHeight-100, () => {
            go('startMenu')
        })
        const title = add([
            text("How to play ", {
                font: 'times-new-roman',
                size: 50,
            }),
            pos(gameWidth/2 - 170, 75),
            color(BLACK),
        ])
        const howToDoStuff = add([
            text(`
            WASD to move around
            CLICK to shoot
            1,2,3 to switch to different things
            ESCAPE to pause / open menu

            Debug things:
            P to toggle hitboxes
            `,
            {
                font: 'times-new-roman',
                size: 35,
            }),
            pos(gameWidth/6, 150),
            color(BLACK),
        ])

    })


    go('startMenu')
}

export { createStartMenu }