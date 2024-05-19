import { createStartMenu, createButton } from "./start-menu.js"
import { fpsDisplay, gameHeight, gameWidth, currentWave, totalKills } from "./main.js"



function endGame() {
    scene('end', () => {
        fpsDisplay()
        setBackground(Color.fromHex('#808080'))
        const status = add([
            text("Dead", {
                font: 'times-new-roman',
                size: 50,
            }),
            pos(gameWidth/2, gameHeight/4),
            color(RED),
        ])
        const highestWaveScore = add([
            text(`Wave Lasted: ${currentWave} `, {
                font: 'times-new-roman',
                size: 50,
            }),
            pos(gameWidth/2 - 120 , 450),
            color(BLACK),
        ])
        const totalKillScore = add([
            text(`Total Kills: ${totalKills} `, {
                font: 'times-new-roman',
                size: 50,
            }),
            pos(gameWidth/2 - 120, 550),
            color(BLACK),
        ])
        createButton('menu',gameWidth/1.85,350, ()=> {
            go('startMenu')
        })
    })
    go('end')
    console.log(gameWidth,gameHeight)
}

export { endGame }