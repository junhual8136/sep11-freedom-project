
import {fpsDisplay, gameHeight, gameWidth} from './main.js'

let moveUp = 'w'
let moveLeft = 'a'
let moveDown = 's'
let moveRight = 'd'
let changeToSlot1 = 1
let changeToSlot2 = 2
let changeToSlot3 = 3


function createButton(name,x,y,ignoreThis) {
    const startButton = add([
        rect(240, 80, { radius: 8 }),
        pos(x,y),
        outline(1),
        area(),
        scale(1),
        anchor("center"),
        fixed(),
        z(2),
    ])
    startButton.add([
        text(name),
        anchor("center"),
        color(0, 0, 0),
        fixed(),
    ])
    startButton.onHoverUpdate(() => {startButton.scale = vec2(1.2)})
    startButton.onHoverEnd(() => { startButton.scale = vec2(1)})
    startButton.onClick(ignoreThis)

    return startButton
}

function createStartMenu() {

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

    // displays instructions
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
            ${(moveUp + moveLeft + moveDown + moveRight).toUpperCase()} to move around
            CLICK to shoot
            ${changeToSlot1},${changeToSlot2},${changeToSlot3} to switch to different things
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
        createButton('set controls',gameWidth/2,gameHeight - 300, () => {
            go('controls')
        })
    })
    scene('controls', () => {
        createButton('Back',gameWidth/2, gameHeight-100, () => {
            go('instructions')
        })


        // prompts user to set control
        function popUp(variable) {
            let getKeyPressed = true
            const popUpBG = add([
                rect(300,250, { radius: 8 }),
                pos(gameWidth/2 ,gameHeight/2 - 100),
                anchor('center'),
                outline(1),
                area(),
                scale(1),
                fixed(),
                z(2),
            ])
            popUpBG.add([
                text('Press a key \n ESC to return', {size: 40}),
                anchor('center'),
                color(0,0,0)
            ])
            let control
             onCharInput(ch => {
                if (!getKeyPressed) return
                if (variable == "moveUp") {
                    moveUp = ch
                }
                else if (variable == "moveLeft") {
                    moveLeft = ch
                }
                else if (variable == "moveDown") {
                    moveDown = ch
                }
                else if (variable == "moveRight") {
                    moveRight = ch
                }
                else if (variable == "changeToSlot1") {
                    changeToSlot1 = ch
                }
                else if (variable == "changeToSlot2") {
                    changeToSlot2 = ch
                }
                else if (variable == "changeToSlot3") {
                    changeToSlot3 = ch
                }
                destroy(popUpBG)
                getKeyPressed = false
            })
            onKeyPress("escape", () => {
                destroy(popUpBG)
                getKeyPressed = false

            })
        }

        // creates a small box with the control key, if clicked it will prompt a popup to allow the user to change it
        const upControl = add([text('moveUp:',{size:50}),pos(gameWidth/4 - 120, 150),color(255,255,255),z(1),fixed(),])
        const upControlRect =  add([pos(upControl.pos.x + 300, upControl.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const upControlset =  add([text(moveUp,{size: 50}),pos(upControlRect.pos.x, upControl.pos.y + 25),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        upControlRect.onClick(() => {popUp("moveUp")})

        const leftControl = add([text('moveLeft:',{size:50}),pos(gameWidth/4 - 120, 250),color(255,255,255),z(1),fixed(),])
        const leftControlRect =  add([pos(leftControl.pos.x + 300, leftControl.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const leftControlset =  add([text(moveLeft,{size: 50}),pos(leftControlRect.pos.x, leftControlRect.pos.y),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        leftControlRect.onClick(() => {popUp("moveLeft")})

        const downControl = add([text('moveDown:',{size:50}),pos(gameWidth/4 - 120, 350),color(255,255,255),z(1),fixed(),])
        const downControlRect =  add([pos(downControl.pos.x + 300, downControl.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const downControlset =  add([text(moveDown,{size: 50}),pos(downControlRect.pos.x, downControlRect.pos.y),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        downControlRect.onClick(() => {popUp("moveDown")})

        const rightControl = add([text('moveRight:',{size:50}),pos(gameWidth/4 - 120, 450),color(255,255,255),z(1),fixed(),])
        const rightControlRect =  add([pos(rightControl.pos.x + 300, rightControl.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const rightControlset =  add([text(moveRight,{size: 50}),pos(rightControlRect.pos.x, rightControlRect.pos.y),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        rightControlRect.onClick(() => {popUp("moveRight")})

        const hotbar1 = add([text('slot1:',{size:50}),pos(gameWidth/2 + 100, 150),color(255,255,255),z(1),fixed(),])
        const hotbar1Rect =  add([pos(hotbar1.pos.x + 250, hotbar1.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const hotbar1set =  add([text(changeToSlot1,{size: 50}),pos(hotbar1Rect.pos.x, hotbar1Rect.pos.y),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        hotbar1Rect.onClick(() => {popUp("changeToSlot1")})

        const hotbar2 = add([text('slot2:',{size:50}),pos(gameWidth/2 + 100, 250),color(255,255,255),z(1),fixed(),])
        const hotbar2Rect =  add([pos(hotbar2.pos.x + 250, hotbar2.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const hotbar2set =  add([text(changeToSlot2,{size: 50}),pos(hotbar2Rect.pos.x, hotbar2Rect.pos.y),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        hotbar2Rect.onClick(() => {popUp("changeToSlot2")})

        const hotbar3 = add([text('slot3:',{size:50}),pos(gameWidth/2 + 100, 350),color(255,255,255),z(1),fixed(),])
        const hotbar3Rect =  add([pos(hotbar3.pos.x + 250, hotbar3.pos.y + 25),rect(55, 60, {radius: 4}),anchor("center"),outline(1),fixed(),area(),opacity(0.8),color(0,0,0),z(0),])
        const hotbar3set =  add([text(changeToSlot3,{size: 50}),pos(hotbar3Rect.pos.x, hotbar3Rect.pos.y),anchor("center"),outline(1),fixed(),opacity(0.8),color(255,255,255),z(0),])
        hotbar3Rect.onClick(() => {popUp("changeToSlot3")})


        // updates control
        onUpdate(() => {
            upControlset.text = moveUp
            leftControlset.text = moveLeft
            downControlset.text = moveDown
            rightControlset.text = moveRight

            hotbar1set.text = changeToSlot1
            hotbar2set.text = changeToSlot2
            hotbar3set.text = changeToSlot3
        })
    })

    go('startMenu')
}

export { createStartMenu, createButton, moveUp,moveDown,moveLeft,moveRight,changeToSlot1,changeToSlot2,changeToSlot3}