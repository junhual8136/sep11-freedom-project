import {loadMap} from './map.js'
import {createStartMenu} from './start-menu.js'
import {endGame} from './dead-menu.js'

let gameWidth = 1200
let gameHeight = 800

kaboom({
    width: gameWidth,
    height: gameHeight,
    font: "sans-serif",
    canvas: document.querySelector("game"),
})

setBackground(Color.fromHex('#ADD8E6'))

const grassTile16x = loadSprite("grass-tile-16", "assets/grass.png")
const enemyTile = loadSprite("grass-tile-16", "assets/grass.png")
const mainPlayer = loadSprite("64xTile", "assets/64xTile.png")

createStartMenu()

scene('game', () => {
    loadMap()

    const player = add([sprite("64xTile"), area(),body(),pos(200, 100),scale(0.5),"player"],)

    let speed = 90
    let playerHealth = 100

    const hpBar = add([
        text(`Health:${playerHealth}`, {size: 24,}),
        pos(player.pos.x-590, player.pos.y-400),
        { value: health },
    ])

    // wasd movement
    onKeyDown('w', () => {player.move(0, -speed)})
    onKeyDown('a', () => {player.move(-speed, 0)})
    onKeyDown('s', () => {player.move(0, speed)})
    onKeyDown('d', () => {player.move(speed, 0)})
    player.onUpdate(() => {camPos(player.pos )})

    onUpdate(() => {
        // shift to run (2x speed)
        if (isKeyDown("shift")) speed = 120
        onKeyRelease("shift", () => {speed = 60})

        hpBar.pos.x = player.pos.x-590
        hpBar.pos.y = player.pos.y-400
        hpBar.text = `Health:${playerHealth}`
        hpBar.value = playerHealth

        if (hpBar.value <= 0) {
            const death = add([
                text(`you died`, {size: 100,}),
                pos(player.pos.x, player.pos.y),
            ])
            // speed = 0
            // hpBar.value = -1000
            // hpBar.text = "dead"
            endGame()
        }

        // hostileAlive.forEach(hostile => {
        //     hostile.move(player.pos.sub(hostile.pos))
        //     // console.log(hostile.pos)
        // })
    })



    onKeyPress("space", () => {
        playerHealth = 0
    })

    const rng = (min, max) => Math.floor(Math.random() * (max - min) + min)
    const hostileAlive = []
    for (let i=0;i<=2;i++) {
        hostileAlive.push(`firstEnemy${i}`)
        const playerX = player.pos.x
        const playerY = player.pos.y
        let randomX = rng(playerX - 500, playerX + 500)
        let randomY = rng(playerY - 500, playerY + 500)
        console.log(`random:${randomX},${randomY}`)
        hostileAlive[i] = add([sprite("64xTile"), area(),body(),pos(randomX, randomY),scale(0.5),offscreen({ destroy: false }),"hostile",{health: 100}])
        console.log(hostileAlive[i].pos)
    }

    onClick(() => {
        add([
        sprite("64xTile"),
        pos(player.pos.x,player.pos.y),
        area(),
        scale(0.1),
        move(toWorld(mousePos()).sub(player.pos),1500),
        offscreen({ destroy: true }),
        "projectile",
        ])
    })

    let damage = 20
    onCollide("projectile", "hostile", (projectile,hostile) => {
        hostile.health -= damage
        destroy(projectile)
        if (hostile.health <= 0) {
            destroy(hostile)
        }
    })
})



export { grassTile16x, gameWidth, gameHeight }

