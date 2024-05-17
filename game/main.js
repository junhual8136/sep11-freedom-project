import {loadMap} from './map.js'
import {createStartMenu,createButton,moveUp, moveLeft, moveDown, moveRight, changeToSlot1, changeToSlot2, changeToSlot3} from './start-menu.js'
import {endGame} from './dead-menu.js'
import {loadSprites} from './load.js'


let gameWidth = 1200
let gameHeight = 800
let paused = false


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
        pos(gameWidth - 40,15),
        color(0,255,0),
        fixed(),
        z(1),
    ])
     onUpdate(() => fps.text = debug.fps())
}

function createMainButton(name,x,y,ignoreThis) {

    const mainButton = add([
        rect(240, 80, { radius: 32 }),
        color(0,0,0),
        opacity(0.7),
        pos(x,y),
        outline(1),
        area(),
        scale(1),
        anchor("center"),
        fixed(),
        z(2),
    ])
    mainButton.add([
        text(name),
        anchor("center"),
        color(255, 255, 255),
        fixed(),
    ])
    mainButton.onHoverUpdate(() => {
        mainButton.outline.width = 4
        mainButton.outline.color = WHITE

    })
    mainButton.onHoverEnd(() => {
        mainButton.outline.width = 0
        mainButton.outline.color = BLACK
    })
    mainButton.onClick(ignoreThis)

    return mainButton
}


createStartMenu()
scene('game', () => {
    loadMap()
    fpsDisplay()

    setBackground(Color.fromHex('#ADD8E6'))

    const player = add([sprite("64xTile"), area(),body(),pos(750, 600),scale(0.5),"player"],)

    let speed = 90
    let playerHealth = 100
    paused = false

    setInterval(() => {
        if (paused) return
        if (playerHealth < 100) playerHealth += 5
    },5000)
    const backgroundHP = add([
        pos(50, 50),
        rect(55, 60, {radius: 4}),
        anchor("center"),
        outline(1),
        fixed(),
        opacity(0.8),
        color(0,0,0),
        z(0),
    ])
    const HP = add([
        text(`${playerHealth}`, {size: 24,}),
        pos(50, 50),
        anchor("center"),
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
    let amountLeft1 = 24
    let amountLeft2 = 8
    let amountLeft3 = 60

    const slot1 =  add([
        pos(120, 50),rect(50, 50, {radius: 8}),anchor("center"), outline(1),fixed(),opacity(0.6),color(0,0,0),z(0),
    ])
    const slot2 = add([
        pos(180, 50),rect(50, 50, {radius: 8}),anchor("center"), outline(1),fixed(),opacity(0.6),color(0,0,0),z(0),
    ])
    const slot3 = add([
        pos(240, 50),rect(50, 50, {radius: 8}),anchor("center"), outline(1),fixed(),opacity(0.6),color(0,0,0),z(0),
    ])
    const slot1Text = add([
        text(amountLeft1,{size:18}),pos(slot1.pos.x + 5, slot1.pos.y + 10),color(255,255,255),z(1),fixed(),
    ])
    const slot2Text = add([
        text(amountLeft2,{size:18}),pos(slot2.pos.x + 5, slot2.pos.y + 10),color(255,255,255),z(1),fixed(),
    ])
    const slot3Text = add([
        text(amountLeft3,{size:18}),pos(slot3.pos.x + 5, slot3.pos.y + 10),color(255,255,255),z(1),fixed(),
    ])


    let menuOpen = false

    const menuBG = add([
        pos(gameWidth/2 - 200, gameHeight/5),
        rect(400, 450, {radius: 12}),
        outline(2),
        fixed(),
        color(0,0,0),
        opacity(0.4),
        z(1),
    ])
    const menuText = add([
        text(`MENU`, {size: 40,}),
        pos(gameWidth/2-65,gameHeight/6 + 50),
        fixed(),
        color(255,255,255),
        z(3),
    ])
    const goToStartMenu = createMainButton('Start Menu',gameWidth/2,gameHeight/3 + 190, () => {
        if (!goToStartMenu.hidden) {
            go('startMenu')

        }

    })
    const resumeButton = createMainButton('resume',gameWidth/2,gameHeight/3 + 60, () => {
        if (!resumeButton.hidden) {
            menuBG.hidden = true
            menuText.hidden = true
            resumeButton.hidden = true
            goToStartMenu.hidden = true
            menuOpen = false
            paused = false
            speed = 60
        }
    })
    menuBG.hidden = true
    menuText.hidden = true
    resumeButton.hidden = true
    goToStartMenu.hidden = true



    // wasd movement
    onKeyDown(moveUp, () => {player.move(0, -speed)})
    onKeyDown(moveLeft, () => {player.move(-speed, 0)})
    onKeyDown(moveDown, () => {player.move(0, speed)})
    onKeyDown(moveRight, () => {player.move(speed, 0)})
    player.onUpdate(() => {camPos(player.pos )})

    onKeyPress(changeToSlot1.toString(), () => {
        console.log(`switched to ${currentSlot}`)

        currentSlot = 1
        damage = 20
        hostileKB = 2000
        slot1.outline.width = 4
        slot1.outline.color = WHITE

        slot2.outline.width = 0
        slot2.outline.color = BLACK
        slot3.outline.width = 0
        slot3.outline.color = BLACK
    })
    onKeyPress(changeToSlot2.toString(), () => {
        console.log(`switched to ${currentSlot}`)

        currentSlot = 2
        damage = 40
        hostileKB = 3500
        slot2.outline.width = 4
        slot2.outline.color = WHITE

        slot1.outline.width = 0
        slot1.outline.color = BLACK
        slot3.outline.width = 0
        slot3.outline.color = BLACK
    })
    onKeyPress(changeToSlot3.toString(), () => {
        console.log(`switched to ${currentSlot}`)
        currentSlot = 3
        damage = 20
        hostileKB = 2000
        slot3.outline.width = 4
        slot3.outline.color = WHITE

        slot1.outline.width = 0
        slot1.outline.color = BLACK
        slot2.outline.width = 0
        slot2.outline.color = BLACK
    })


    onKeyPress('escape', () => {
        if (!menuOpen) {
            menuBG.hidden = false
            menuText.hidden = false
            resumeButton.hidden = false
            goToStartMenu.hidden = false
            menuOpen = true
            paused = true
            speed = 0

        }

    })

    // debugs
    onKeyPress('p', () => {
        if (!debug.inspect) debug.inspect = true
        else if (debug.inspect) debug.inspect = false

    })

    onUpdate(() => {
        if (paused) return
        // shift to run (2x speed)
        if (isKeyDown("shift")) speed = 120
        onKeyRelease("shift", () => {speed = 60})

        HP.text = playerHealth
        HP.color = healthStatus(playerHealth)
        HP.value = playerHealth


        if (HP.value <= 0) {
            endGame()
        }


        waveInfo.text = `Current Wave: ${currentWave} / Eniemes Alive: ${hostileAlive.length}`

        slot1Text.text = amountLeft1
        slot2Text.text = amountLeft2
        slot3Text.text = amountLeft3


        if (!paused) {
            hostileAlive.forEach((hostile,index) => {
                hostile.move(player.pos.sub(hostile.pos))
                let alive = true
                if (hostile.health <= 0) {
                    hostileAlive.splice(index,1)
                }
            })
        }
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
        if (!paused) {
            gameTime++
        }
        if (gameTime === 4 && !paused) {
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
                        }, 5000);
                    });
                }, 2000);
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
        if (!paused) {
            if (currentSlot === 1) {
                if (amountLeft1 <= 0) return
                shoot(0,0,250)
            } else if (currentSlot === 2) {
                if (amountLeft2 <= 0) return
                threeShot(1000)
            }
        }
    })
    onMouseDown(() => {
        if (!paused) {
            if (currentSlot === 3) {
                if (amountLeft3 <= 0) return
                shootAuto(0,0,200)
            }
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

