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

    const player = add([sprite("64xTile"), area(),body(),pos(gameWidth/2, gameHeight/2),scale(0.5),"player"],)

    let speed = 90
    let playerHealth = 100

    setInterval(() => {
        if (playerHealth < 100) playerHealth += 5
    },5000)
    
    const hpBarBackground = add([
        pos(25, 20),
        rect(130, 40),
        outline(3),
        fixed(),
        color(255,255,255),
        z(0),
    ])
    const hpBar = add([
        text(`Health:`, {size: 24,}),
        pos(28,27),
        fixed(),
        color(0,0,0),
        z(1),
    ])
    const HP = add([
        text(`${playerHealth}`, {size: 24,}),
        pos(105,27),
        fixed(),
        color(healthStatus(playerHealth)),
        z(1),
        { value: playerHealth },
    ])

    function healthStatus(value) {
        if (value >= 75) return GREEN
        else if (value >= 50) return rgb(255,215,0)
        else if (value >= 25) return rgb(255,140,0)
        else return RED
    }
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

        HP.text = playerHealth
        HP.color = healthStatus(playerHealth)
        HP.value = playerHealth

        if (HP.value <= 0) {
            endGame()
        }

        hostileAlive.forEach(hostile => {
            hostile.move(player.pos.sub(hostile.pos))
            // console.log(hostile.pos)
        })
    })





    const rng = (min, max) => Math.floor(Math.random() * (max - min) + min)
    const hostileAlive = []
    for (let i=0;i<=2;i++) {
        hostileAlive.push(`firstEnemy${i}`)
        const playerX = player.pos.x
        const playerY = player.pos.y
        let randomX = rng(playerX - 750, playerX + 750)
        let randomY = rng(playerY - 750, playerY + 750)
        // console.log(`random:${randomX},${randomY}`)
        hostileAlive[i] = add([sprite("64xTile"), area(),body(),pos(randomX, randomY),scale(0.5),offscreen({ destroy: false }),"hostile",{health: 100}])
        // console.log(hostileAlive[i].pos)
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
    let kb = 300
    let hostileDamage = 5
    onCollide("player","hostile", (player,hostile) => {
        const takeCrit = rng(1,3) <= 1 ? true : false
        if (takeCrit) playerHealth -= hostileDamage * 2
        else playerHealth -= hostileDamage

        if (hostile.pos.x > player.pos.x) { // from right
            player.move(-kb, 0)
        }
        else if (hostile.pos.x < player.pos.x) { // from left
            player.move(kb, 0)
        }
        else if (hostile.pos.y > player.pos.x) { // from top
            player.move(0, -kb)
        }
        else if (hostile.pos.y < player.pos.x) { // from bottom
            player.move(0, kb)
        }
    })
})



export { grassTile16x, gameWidth, gameHeight }

