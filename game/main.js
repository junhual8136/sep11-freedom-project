import {loadMap} from './map.js'
import {createStartMenu} from './start-menu.js'
import {endGame} from './dead-menu.js'
import {loadSprites} from './load.js'


let gameWidth = 1200
let gameHeight = 800

kaboom({
    width: gameWidth,
    height: gameHeight,
    font: "sans-serif",
    maxFPS: 144
})

loadSprites()

function fpsDisplay() {
    const fps = add([
        text(`${debug.fps()}`, {size: 24,}),
        pos(gameWidth - 35,15),
        color(0,255,0),
        fixed(),
        z(1),
    ])
     onUpdate(() => fps.text = debug.fps())
}


// const grassTile16x = loadSprite("grass-tile-16", "assets/grass.png")
// const enemyTile = loadSprite("grass-tile-16", "assets/grass.png")
// const mainPlayer = loadSprite("64xTile", "assets/64xTile.png")

createStartMenu()
scene('game', () => {
    loadMap()
    fpsDisplay()

    setBackground(Color.fromHex('#ADD8E6'))

    const player = add([sprite("64xTile"), area(),body(),pos(750, 600),scale(0.5),"player"],)

    let speed = 90
    let playerHealth = 100

    setInterval(() => {
        if (playerHealth < 100) playerHealth += 5
    },5000)

    const hpBarBackground = add([
        pos(gameWidth - 1175, gameHeight - 780),
        rect(130, 40),
        outline(3),
        fixed(),
        color(255,255,255),
        z(0),
    ])
    const hpBar = add([
        text(`Health:`, {size: 24,}),
        pos(gameWidth - 1172,gameHeight - 775),
        fixed(),
        color(0,0,0),
        z(1),
    ])
    const HP = add([
        text(`${playerHealth}`, {size: 24,}),
        pos(gameWidth - 1095,gameHeight - 775),
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


    let currentSlot = 1
    let itemHolding = 'single'
    let amountLeft1 = 24
    let amountLeft2 = 8
    let amountLeft3 = 60

    const infoGUIBackground = add([
        pos(25, gameHeight - 100),
        rect(180, 50),
        outline(3),
        fixed(),
        color(255,255,255),
        z(0),
    ])
    const info = add([
        text(`${itemHolding}-${amountLeft1}`, {size: 24,}),
        pos(50,gameHeight - 90),
        fixed(),
        color(0,0,0),
        z(1),
    ])

    // const info2 = add([
    //     text(` - ${amountLeft1}`, {size: 24,}),
    //     pos(120,105),
    //     fixed(),
    //     color(0,0,0),
    //     z(1),
    // ])
    // wasd movement
    onKeyDown('w', () => {player.move(0, -speed)})
    onKeyDown('a', () => {player.move(-speed, 0)})
    onKeyDown('s', () => {player.move(0, speed)})
    onKeyDown('d', () => {player.move(speed, 0)})
    player.onUpdate(() => {camPos(player.pos )})

    onKeyPress("1", () => {
        currentSlot = 1
        itemHolding = 'single'
        damage = 20
        hostileKB = 2000
    })
    onKeyPress("2", () => {
        currentSlot = 2
        itemHolding = 'triple'
        damage = 40
        hostileKB = 3500
    })
    onKeyPress("3", () => {
        currentSlot = 3
        itemHolding = 'auto'
        damage = 20
        hostileKB = 2000
    })


    // debugs
    onKeyPress('p', () => {
        if (!debug.inspect) debug.inspect = true
        else if (debug.inspect) debug.inspect = false

    })

    onUpdate(() => {
        // shift to run (2x speed)
        if (isKeyDown("shift")) speed = 120
        onKeyRelease("shift", () => {speed = 60})

        HP.text = playerHealth
        HP.color = healthStatus(playerHealth)
        HP.value = playerHealth

        // fps.text = debug.fps()
        if (HP.value <= 0) {
            endGame()
        }

        info.text = itemHolding
        waveInfo.text = `Current Wave: ${currentWave} / Eniemes Alive: ${hostileAlive.length}`

        if (currentSlot === 1) {
            info.text = `${itemHolding} - ${amountLeft1}`
        } else if (currentSlot === 2) {
            info.text = `${itemHolding} - ${amountLeft2}`
        } else if (currentSlot === 3) {
            info.text = `${itemHolding} - ${amountLeft3}`
        }


        hostileAlive.forEach((hostile,index) => {
            hostile.move(player.pos.sub(hostile.pos))
            let alive = true
            if (hostile.health <= 0) {
                hostileAlive.splice(index,1)
            }
        })


    })


    const rng = (min, max) => Math.floor(Math.random() * (max - min) + min)
    const hostileAlive = []
    function wave(number) {
        for (let i=0;i<number;i++) {
            const playerX = player.pos.x
            const playerY = player.pos.y
            let [randomX,randomY] = [rng(200,800),rng(200,800)]

            // console.log(`random:${randomX},${randomY}`)
            hostileAlive.push(add([sprite("64xTile"), area(),body(),pos(randomX, randomY),scale(0.5),offscreen({ destroy: false }),"hostile",{health: 100}]))
        }
    }


   let gameTime = 0
   let currentWave = 0
   let spawnCooldown = false
   let drops = []

   setInterval(() => {
        gameTime++
        if (gameTime === 4) {
            wave(4)
            currentWave++
            return
        }
        if (hostileAlive.length === 0 && gameTime > 10) {
            if (!spawnCooldown) {
                setTimeout(() => {
                    wave(4 + 2 * currentWave)
                    currentWave++
                    drops.forEach((element,index)=> {
                        setTimeout(() => {
                            destroy(element)
                            drops.splice(index,1)
                        }, 3000);
                    });
                }, 3000);
                spawnCooldown = true
                setTimeout(() => {
                    spawnCooldown = false
                }, 4000);
            }

        }
   }, 1000);

   const waveInfo = add([
    text(`Current Wave: ${currentWave} / Eniemes Alive: ${hostileAlive.length}`, {size: 24,}),
    pos(gameWidth/2 - 150,30),
    fixed(),
    color(0,0,0),
    z(1),
    ])

    onClick(() => {
        if (currentSlot === 1) {
            if (amountLeft1 <= 0) return
            shoot(0,0,250)
        } else if (currentSlot === 2) {
            if (amountLeft2 <= 0) return
            threeShot(1000)
        }
    })
    onMouseDown(() => {
        if (currentSlot === 3) {
            if (amountLeft3 <= 0) return
            shootAuto(0,0,200)
        }
    })

    let cooldown = false
    let threeCooldown = false
    function shoot(xOffset,yOffset,timeout = 1) {
        if (cooldown) return
        add([sprite("64xTile"),pos(player.pos.x + xOffset,player.pos.y + yOffset),area(),scale(0.1),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),"projectile",])
         amountLeft1--
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, timeout)
    }
    function threeShot(timeout) {
        if (threeCooldown) return
        add([sprite("64xTile"),pos(player.pos.x ,player.pos.y),area(),scale(0.1),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),"projectile",])
        add([sprite("64xTile"),pos(player.pos.x + 25,player.pos.y + 25),area(),scale(0.1),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),"projectile",])
        add([sprite("64xTile"),pos(player.pos.x + -25,player.pos.y + -25),area(),scale(0.1),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),"projectile",])
        amountLeft2--
        threeCooldown = true
        setTimeout(() => {
            threeCooldown = false
        }, timeout)
    }
    function shootAuto(xOffset,yOffset,timeout = 1) {
        if (cooldown) return
        add([sprite("64xTile"),pos(player.pos.x + xOffset,player.pos.y + yOffset),area(),scale(0.1),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),"projectile",])
        amountLeft3--
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, timeout)
    }
    let damage = 20
    onCollide("projectile", "hostile", (projectile,hostile) => {
        hostile.health -= damage
        destroy(projectile)
        if (hostile.pos.x > projectile.pos.x) { // from right
            hostile.move(hostileKB, 0)
        }
        else if (hostile.pos.x < projectile.pos.x) { // from left
            hostile.move(-hostileKB, 0)
        }
        else if (hostile.pos.y > projectile.pos.x) { // from top
            hostile.move(0, hostileKB)
        }
        else if (hostile.pos.y < projectile.pos.x) { // from bottom
            hostile.move(0, -hostileKB)
        }
        if (hostile.health <= 0) {
            drops.push(add([sprite("64xTile"),pos(hostile.pos.x,hostile.pos.y),area(),scale(0.2),"drop",]))
            destroy(hostile)
        }
    })


    onCollide('player','drop', (player,drop) => {
        amountLeft1 += 5
        amountLeft2 += 2
        amountLeft3 += 10
        destroy(drop)

    })
    let hostileKB = -2000
    let kb = 3200
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


export { gameWidth, gameHeight, fpsDisplay }

