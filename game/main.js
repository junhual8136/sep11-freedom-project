import {loadMap} from './map.js'
import {createStartMenu,createButton,moveUp, moveLeft, moveDown, moveRight, changeToSlot1, changeToSlot2, changeToSlot3} from './start-menu.js'
import {endGame} from './dead-menu.js'
import {loadSprites} from './load.js'


let gameWidth = 1200
let gameHeight = 800
let paused = false

let totalKills = 0
let currentWave = 0

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

const rng = (min, max) => Math.floor(Math.random() * (max - min) + min)

createStartMenu()

scene('game', () => {
    loadMap()
    fpsDisplay()
    setBackground(BLACK)

    const player = add([sprite("pale"), area(),body(),pos(750, 600),scale(2.5),"player"],)
    const greenTest = add([
        circle(13),
        opacity(0.9),
        color('#FFA500'),
    ])

    let speed = 90
    let playerHealth = 100
    paused = false

    let currentSlot = 1
    let amountLeft1 = 24
    let amountLeft2 = 8
    let amountLeft3 = 60

    let menuOpen = false

    let gameTime = 0
    let spawnCooldown = false
    let drops = []

    let cooldown = false
    let threeCooldown = false

    let damage = 20

    let explosionKB = -30000

    let hostileKB = -2000
    let kb = 6000
    let hostileDamage = 5

    const hostileAlive = []

    const blastLocations = []
    const currentProjectiles = []

    let hostileSpeed = 90


    // Heals the player every 5 seconds
    setInterval(() => {
        if (paused) return
        if (playerHealth < 100) playerHealth += 5
    },5000)


    // Health HUD
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

    // Hotbar HUD
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

    // Menu GUI
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

    // Hides the Menu on load
    menuBG.hidden = true
    menuText.hidden = true
    resumeButton.hidden = true
    goToStartMenu.hidden = true

    // Wave info HUD
    const waveInfo = add([
        text(`Current Wave: ${currentWave} / Eniemes Alive: ${hostileAlive.length}`, {size: 24,}),
        pos(gameWidth/2 - 150,30),
        fixed(),
        color(0,0,0),
        z(1),
    ])

    // Controls
    // movement
    onKeyDown(moveUp, () => {player.move(0, -speed)})
    onKeyDown(moveLeft, () => {player.move(-speed, 0)})
    onKeyDown(moveDown, () => {player.move(0, speed)})
    onKeyDown(moveRight, () => {player.move(speed, 0)})
    player.onUpdate(() => {camPos(player.pos )})

    // Hotbar switch and select
    // Switch to hotbar 1
    onKeyPress(changeToSlot1.toString(), () => {
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
    // Switch to hotbar 2
    onKeyPress(changeToSlot2.toString(), () => {
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
    // Switch to hotbar 3
    onKeyPress(changeToSlot3.toString(), () => {
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

    // Opens Menu
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

    // Toggles debug mode
    onKeyPress('p', () => {
        if (!debug.inspect) debug.inspect = true
        else if (debug.inspect) debug.inspect = false
    })
    onKeyPress('j', () => {
       console.log(`${player.pos.x} ${player.pos.y}`)
    })

    // clicks to shoot
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
    // if on Hotbar 3, hold to shoot continuously
    onMouseDown(() => {
        if (!paused) {
            if (currentSlot === 3) {
                if (amountLeft3 <= 0) return
                shootAuto(0,0,200)
            }
        }
    })
    // shooting system
    // If on cooldown, it will stop the function
    // single Shot for hotbar1
    function shoot(xOffset,yOffset,timeout = 1) {
        if (cooldown) return
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + xOffset,player.pos.y + yOffset),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: 1},"projectile",]))
         amountLeft1--
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, timeout)
    }
    // Triple Shot for hotbar2
    function threeShot(timeout) {
        if (threeCooldown) return
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x ,player.pos.y),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: 2},"projectile",]))
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + 25,player.pos.y + 25),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: 2},"projectile",]))
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + -25,player.pos.y + -25),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: 2},"projectile",]))
        amountLeft2--
        threeCooldown = true
        setTimeout(() => {
            threeCooldown = false
        }, timeout)
    }
    // Auto for hotbar 3
    function shootAuto(xOffset,yOffset,timeout = 1) {
        if (cooldown) return
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + xOffset,player.pos.y + yOffset),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: 1},"projectile",]))
        amountLeft3--
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, timeout)
    }

    // Everything inside Will run every frame
    onUpdate(() => {
        if (paused) return

        // Sprinting
        if (isKeyDown("shift")) speed = 120
        onKeyRelease("shift", () => speed = 60)

        // updates health
        HP.text = playerHealth
        HP.color = healthStatus(playerHealth)
        HP.value = playerHealth

        // prompts the dead menu
        if (HP.value <= 0) {
            endGame()
        }

        // Wave info
        waveInfo.text = `Current Wave: ${currentWave} / Eniemes Alive: ${hostileAlive.length}`

        // Updates ammo count in the Hotbar HUD
        slot1Text.text = amountLeft1
        slot2Text.text = amountLeft2
        slot3Text.text = amountLeft3

        // Makes every hostile entity follow the player
        if (!paused) {
            hostileAlive.forEach((hostile,index) => {
                // hostile.move(player.pos.sub(hostile.pos))
                const distanceX = player.pos.x - hostile.pos.x
                const distanceY = player.pos.y - hostile.pos.y
                // console.log(`${distanceX} ${distanceY}`)
                if (distanceX > 0) {
                    hostile.move(hostileSpeed,0)
                } else if (distanceX < 0) {
                    hostile.move(-hostileSpeed,0)
                }

                if (distanceY > 0) {
                    hostile.move(0,hostileSpeed)
                } else if (distanceY < 0) {
                    hostile.move(0,-hostileSpeed)
                }

                if (hostile.health <= 0) {
                    hostileAlive.splice(index,1)
                }
            })
        }

        currentProjectiles.forEach((element,index) => {
            if (element.piercing < 1) {
                destroy(element)
                currentProjectiles.slice(index,1)
            }
        })

    })


    // summons a number of enemies at a random location
    function wave(number) {
        for (let i=0;i<number;i++) {
            const explosive = rng(1,10)
            // rolls random X and Y coordinates
            let randomSpawn = ['north','east','south','west']
            let chooseSpawn = randomSpawn[rng(1,4) - 1]
            let [randomX,randomY] = [500,500]
            switch(chooseSpawn) {
                case 'north':
                    randomX = 1200
                    randomY = 200
                    break
                case 'east':
                    randomX = 2200
                    randomY = 800
                    break
                case 'south':
                    randomX = 1200
                    randomY = 1400
                    break
                case 'west':
                    randomX = 1600
                    randomY = 800
                    break
                default: break;
            }
            // 1/10 enemies will be a unique type
            if (explosive === 1) {
                hostileAlive.push(add([sprite("red"), area(),body(),pos(randomX, randomY),scale(0.2),outline(5),offscreen({ destroy: false }),"hostile","explosive",{health: 100}]))
            } else {
                hostileAlive.push(add([sprite("green"), area(),body(),pos(randomX, randomY),scale(0.2),outline(5),offscreen({ destroy: false }),"hostile",{health: 100}]))
            }
        }
    }


    // runs every 1 second, updates game time
    // each tick is a second and checks are run every tick
   setInterval(() => {
        if (!paused) {
            gameTime++
        }
        if (gameTime === 4 && !paused) {
            wave(4)
            currentWave++
            return
        }


        // checks if all the enemies are dead and summons a new wave
        if (hostileAlive.length === 0 && gameTime > 10) {
            if (!spawnCooldown) {
                setTimeout(() => {
                    wave(4 + 2 * currentWave)
                    currentWave++
                    // deletes all ammo drops after 5 seconds when a new wave begins
                    drops.forEach((element,index)=> {
                        setTimeout(() => {
                            destroy(element)
                            drops.splice(index,1)
                        }, 5000);
                    });
                }, 2000);
                // cooldown to prevent bug that calls the wave function twice due to lag
                spawnCooldown = true
                setTimeout(() => {
                    spawnCooldown = false
                }, 4000);
            }
        }

        // counts down the bomb
        blastLocations.forEach((element,index) => {
            element.timeLeft--
            element.text = element.timeLeft
            if (element.timeLeft <= 0) {
                explode(element.pos.x,element.pos.y)
                destroy(element)
                blastLocations.splice(index,1)
            }
        });

   }, 1000);


    // collisions
    // runs when bullet/projectile hits the enemies
    onCollide("projectile", "hostile", (projectile,hostile) => {
        if (projectile.piercing < 1) {
            destroy(projectile)
        }
        hostile.health -= damage
        projectile.piercing -= 1


        // checks from which direction the bullet hit the enemy and deal knockback toward that direction
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
        // deletes the enemy if health is 0 or below
        // spawns an ammo drop at that death location
        if (hostile.health <= 0) {
            drops.push(add([sprite("yellow"),pos(hostile.pos.x,hostile.pos.y),area(),scale(1),"drop",]))
            destroy(hostile)
            totalKills++
        }
    })

    // collision between projectile and explosive enemies
    onCollide("projectile", "explosive", (projectile,explosive) => {
        // on death, triggers a bomb that counts down from 4, which at 0 will explode
        if (explosive.health <= 0) {
           const timeBomb = add([
                text('4'),
                color(BLACK),
                pos(explosive.pos.x,explosive.pos.y),
                outline(1),
                area(),
                scale(1),
                z(1),
                {timeLeft: 4},
            ])
            timeBomb.add([
                rect(30,30),
                opacity(0.5),
                color(RED),

            ])
            blastLocations.push(timeBomb)
        }
    })

    // creates an explosion
    function explode(x,y) {
        // everything within the circle will be used to detect if player collided with the explosion
        const circles = add([
            circle(196),
            area(),
            pos(x, y),
            opacity(0.7),
            color('#FFA500'),
            'explosion',
        ])

        // explosion will last 750ms
        setTimeout(() => {
            destroy(circles)
        }, 750);
    }

    // collisions
    // explosions, player looses 25 health
    onCollide('player','explosion', (player,explosion) => {
        playerHealth -= 25
        console.log('in')
    })
    onCollide('player','drop', (player,drop) => {
        amountLeft1 += 5
        amountLeft2 += 2
        amountLeft3 += 10
        if (playerHealth <= 200)  playerHealth += 10
        destroy(drop)

    })
    // checks if enemies hit the player
    onCollide("player","hostile", (player,hostile) => {
        // 33% chance for a enemy to deal 2x damage
        const takeCrit = rng(1,3) <= 1 ? true : false
        if (takeCrit) playerHealth -= hostileDamage * 2
        else playerHealth -= hostileDamage

        // checks if player was hit by an enemy and will knock the player back from the direction it was hit from
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


export { gameWidth, gameHeight, fpsDisplay, totalKills, currentWave}

