import {loadMap} from './map.js'
import {createStartMenu,createButton,moveUp, moveLeft, moveDown, moveRight, changeToSlot1, changeToSlot2, changeToSlot3, openTheUpgradeMenu} from './start-menu.js'
import {endGame} from './dead-menu.js'
import {loadSprites} from './load.js'


let gameWidth = 1200
let gameHeight = 800
let paused = false

let totalKills = 0
let currentWave = 0

let totalCurrency = 0

let singleDamage = 20
let singleGoThrough = 1

let tripleDamage = 20
let tripleGoThrough = 2

let autoDamage = 20
let autoGoThrough = 1

let speed = 90
let maxHealth = 200
let allUpgradeMenu

let upgradeCosts = {
    singleDMG: 10,
    singleGoThrough: 10,
    tripleDMG: 10,
    tripleGoThrough: 10,
    autoDMG: 10,
    autoGoThrough: 10,
    maxHealth: 10,
    speed: 10,
}

let hostileHealth = 100
let explosionDamage = 25

kaboom({
    width: gameWidth,
    height: gameHeight,
    font: "sans-serif",
    maxFPS: 144,
    root: document.querySelector(".game-screen"),
})

loadSprites()

function fpsDisplay() {
    const fps = add([
        text(`FPS: ${debug.fps()}`, {size: 16,}),
        pos(gameWidth - 90,30),
        anchor("center"),
        fixed(),
        color(255,255,255),
        z(3),
    ])
   const fpsBackground = add([
    rect(90,30, {radius: 8}),
    pos(gameWidth - 90,30),
    anchor("center"),
    fixed(),
    color(0,0,0),
    opacity(0.8),
    z(2),
   ])


     onUpdate(() => fps.text = `FPS: ${debug.fps()}`)
}

function createMainButton(name,x,y,width=240,height = 80,ignoreThis) {
    const mainButton = add([
        rect(width, height, { radius: 32 }),
        color(0,0,0),
        opacity(0.7),
        pos(x,y),
        outline(1),
        area(),
        scale(1),
        anchor("center"),
        fixed(),
        z(2),
        'upgradeMenu'
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

    const player = add([sprite("pale"), area(),body(),pos(750, 600),anchor('center'),scale(2.5),"player"],)
    const greenTest = add([
        circle(13),
        opacity(0.9),
        color('#FFA500'),
    ])


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

    let hostileKB = 2000
    let kb = 4000
    let hostileDamage = 5

    const hostileAlive = []

    const blastLocations = []
    const currentProjectiles = []

    let hostileSpeed = 90
    let sprintSpeed = speed * 2
    let sprinting = false

    let isUpgradeMenuOpen = false
    let testCommandMenuOpen = false

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


    // Command bar used for testing
    const testMenu = add([
        rect(200,50),
        pos(gameWidth/2,gameHeight - 250),
        anchor('center'),
        area(),
        opacity(0.5),
        color(0,0,0),
        fixed(),
        'testMenu',
        'commandBar',
    ])
    const testMenuText = add([
        text('', {size: 18}),
        anchor('center'),
        pos(testMenu.pos.x,testMenu.pos.y),
        fixed(),
        color(255,255,255),
        'testMenu',
    ])
    onClick('commandBar', (command) => {
        testCommandMenuOpen = true
    })
    let textCD = false
    onCharInput((ch) => {
        if (testCommandMenuOpen) {
            if (textCD) return
            testMenuText.text += ch
            textCD = true
            setTimeout(() => {
                textCD = false
            }, 50);

        }
    })
        onKeyPress('backspace',() => {
            if (testCommandMenuOpen) {
                testMenuText.text = ''
            }
        })
        onKeyPress('enter', () => {
            if (testCommandMenuOpen) {
                if (testCommandMenuOpen) {
                    let execute = testMenuText.text
                    if (execute.toLowerCase() == 'kill') {
                        playerHealth = 0
                    }
                    if (execute.toLowerCase() == 'set 1000') {
                        totalCurrency = 1000
                    }
                    let searchWave = new RegExp('add')
                    if (searchWave.test(execute)) {
                        let result = execute.match('[0-9]')
                        currentWave += 9

                    }
                    hideCommandMenu('hide')
                }
            }
        })

    function hideCommandMenu(which) {
        let allCommmandcomponents = get('testMenu')
        if (which == 'show') {
            testCommandMenuOpen = true
            allCommmandcomponents.forEach(element => {
                element.hidden = false
            })
        } else if (which == 'hide') {
            testCommandMenuOpen = false
            allCommmandcomponents.forEach(element => {
                element.hidden = true
            });
        }
    }

    hideCommandMenu('hide')
    // Upgrade menu
    // function upgradeMenu(openOrClose) {


    const upgradeMenuBackground = add([
        pos(gameWidth/2, gameHeight/2.5),
        rect(1100, 500, {radius: 12}),
        outline(3),
        fixed(),
        anchor('center'),
        color(0,0,0),
        opacity(0.6),
        z(1),
        'upgradeMenu'
    ])
    const menuSingleDamage = add([text(`Single Damage: ${singleDamage}`,{size:24}),pos(upgradeMenuBackground.pos.x - 250, upgradeMenuBackground.pos.y - 200),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuSingleDamageUpgrade = createMainButton('+',menuSingleDamage.pos.x + 150, menuSingleDamage.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.singleDMG >= 0) {
            singleDamage++
            totalCurrency -= upgradeCosts.singleDMG
            upgradeCosts.singleDMG += 10
        }
    })
    const menuSingleDamageCost = add([
        text(`Cost: ${upgradeCosts.singleDMG}`, {size:24}),
        pos(menuSingleDamage.pos.x - 100,menuSingleDamage.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])
    const menuTripleDamage = add([text(`Triple Damage: ${tripleDamage}`,{size:24}),pos(upgradeMenuBackground.pos.x - 250, upgradeMenuBackground.pos.y - 100),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuTripleDamageUpgrade = createMainButton('+',menuTripleDamage.pos.x + 150, menuTripleDamage.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.singleDMG >= 0) {
            tripleDamage++
            totalCurrency -= upgradeCosts.tripleDMG
            upgradeCosts.tripleDMG += 10
        }
    })
    const menuTripleDamageCost = add([
        text(`Cost: ${upgradeCosts.tripleDMG}`, {size:24}),
        pos(menuTripleDamage.pos.x - 100,menuTripleDamage.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])

    const menuAutoDamage = add([text(`Auto Damage: ${autoDamage}`,{size:24}),pos(upgradeMenuBackground.pos.x - 250, upgradeMenuBackground.pos.y ),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuAutoDamageUpgrade = createMainButton('+',menuAutoDamage.pos.x + 150, menuAutoDamage.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.autoDMG >= 0) {
            autoDamage++
            totalCurrency -= upgradeCosts.autoDMG
            upgradeCosts.autoDMG += 10
        }
    })
    const menuAutoDamageCost = add([
        text(`Cost: ${upgradeCosts.autoDMG}`, {size:24}),
        pos(menuAutoDamage.pos.x - 100,menuAutoDamage.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])

    const menuSpeed = add([text(`Speed: ${speed}`,{size:24}),pos(upgradeMenuBackground.pos.x - 250, upgradeMenuBackground.pos.y + 100),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuSpeedUpgrade = createMainButton('+',menuSpeed.pos.x + 150, menuSpeed.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.speed >= 0) {
            speed += 5
            totalCurrency -= upgradeCosts.speed
            upgradeCosts.speed += 10
        }
    })
    const menuSpeedCost = add([
        text(`Cost: ${upgradeCosts.speed}`, {size:24}),
        pos(menuSpeed.pos.x - 100,menuSpeed.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])



    const menuSinglePiercing = add([text(`Single Piercing: ${singleGoThrough}`,{size:24}),pos(upgradeMenuBackground.pos.x + 200, upgradeMenuBackground.pos.y - 200),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuSinglePiercingUpgrade = createMainButton('+',menuSinglePiercing.pos.x + 150, menuSinglePiercing.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.singleGoThrough >= 0) {
            singleGoThrough++
            totalCurrency -= upgradeCosts.singleGoThrough
            upgradeCosts.singleGoThrough += 10
        }
    })
    const menuSinglePiercingCost = add([
        text(`Cost: ${upgradeCosts.singleGoThrough}`, {size:24}),
        pos(menuSinglePiercing.pos.x - 100,menuSinglePiercing.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])

    const menuTriplePiercing = add([text(`Triple Piercing: ${tripleGoThrough}`,{size:24}),pos(upgradeMenuBackground.pos.x + 200, upgradeMenuBackground.pos.y - 100),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuTriplePiercingUpgrade = createMainButton('+',menuTriplePiercing.pos.x + 150, menuTriplePiercing.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.tripleGoThrough >= 0) {
            tripleGoThrough++
            totalCurrency -= upgradeCosts.tripleGoThrough
            upgradeCosts.tripleGoThrough += 10
        }
    })
    const menuTriplePiercingCost = add([
        text(`Cost: ${upgradeCosts.tripleGoThrough}`, {size:24}),
        pos(menuTriplePiercing.pos.x - 100,menuTriplePiercing.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])

    const menuAutoPiercing = add([text(`Auto Piercing: ${autoGoThrough}`,{size:24}),pos(upgradeMenuBackground.pos.x + 200, upgradeMenuBackground.pos.y),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuAutoPiercingUpgrade = createMainButton('+',menuAutoPiercing.pos.x + 150, menuAutoPiercing.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.autoGoThrough >= 0) {
            autoGoThrough++
            totalCurrency -= upgradeCosts.autoGoThrough
            upgradeCosts.autoGoThrough += 10
        }
    })
    const menuAutoPiercingCost = add([
        text(`Cost: ${upgradeCosts.autoGoThrough}`, {size:24}),
        pos(menuAutoPiercing.pos.x - 100,menuAutoPiercing.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])

    const menuMaxHealth = add([text(`Max Health: ${maxHealth}`,{size:24}),pos(upgradeMenuBackground.pos.x + 200, upgradeMenuBackground.pos.y + 100),fixed(),anchor('center'),color(255,255,255),z(1),'upgradeMenu'])
    const menuMaxHealthUpgrade = createMainButton('+',menuMaxHealth.pos.x + 150, menuMaxHealth.pos.y,80,60,() => {
        if (isUpgradeMenuOpen && totalCurrency - upgradeCosts.maxHealth >= 0) {
            maxHealth += 10
            totalCurrency -= upgradeCosts.maxHealth
            upgradeCosts.maxHealth += 10
        }
    })
    const menuMaxHealthCost = add([
        text(`Cost: ${upgradeCosts.maxHealth}`, {size:24}),
        pos(menuMaxHealth.pos.x - 100,menuMaxHealth.pos.y + 20),
        z(1),
        color(255,255,255),
        fixed(),
        'upgradeMenu'
    ])

    const currencyDisplay = add([
        text(totalCurrency),
        pos(upgradeMenuBackground.pos.x + 450,upgradeMenuBackground.pos.y - 220),
        color(YELLOW),
        fixed(),
        z(2),
        anchor('center'),
        'upgradeMenu',
    ])

    const closeButton = createMainButton('Close',gameWidth/2, gameHeight - 275,240,80, () => {
        if (isUpgradeMenuOpen) {
            const allUpgradeMenu2 = get('upgradeMenu')
            allUpgradeMenu2.forEach(element => {
                element.hidden = true
            })
            isUpgradeMenuOpen = false
        }
    })
    const allUpgradeMenus = get('upgradeMenu')
    allUpgradeMenus.forEach(element => {
        element.hidden = true
    })


    onUpdate(() => {
        if (!isUpgradeMenuOpen) return
        menuSingleDamage.text = `Single Damage: ${singleDamage}`
        menuTripleDamage.text = `Triple damage: ${tripleDamage}`
        menuAutoDamage.text = `Auto Damage: ${autoDamage}`
        menuSinglePiercing.text = `Single Piercing: ${singleGoThrough}`
        menuTriplePiercing.text = `Triple Piercing: ${tripleGoThrough}`
        menuAutoPiercing.text = `Auto Piercing: ${autoGoThrough}`
        menuSpeed.text = `Speed: ${speed}`
        menuMaxHealth.text = `Max Health: ${maxHealth}`
        currencyDisplay.text = totalCurrency

        menuSingleDamageCost.text = `Cost: ${upgradeCosts.singleDMG}`
        menuTripleDamageCost.text = `Cost: ${upgradeCosts.tripleDMG}`
        menuAutoDamageCost.text = `Cost: ${upgradeCosts.autoDMG}`
        menuSinglePiercingCost.text = `Cost: ${upgradeCosts.singleGoThrough}`
        menuTriplePiercingCost.text = `Cost: ${upgradeCosts.tripleGoThrough}`
        menuAutoPiercingCost.text = `Cost: ${upgradeCosts.autoGoThrough}`
        menuSpeedCost.text = `Cost: ${upgradeCosts.speed}`
        menuMaxHealthCost.text = `Cost: ${upgradeCosts.maxHealth}`
    })


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
    const goToStartMenu = createMainButton('Start Menu',gameWidth/2,gameHeight/3 + 190,240,80, () => {
        if (!goToStartMenu.hidden) {
            go('startMenu')
        }
    })
    const resumeButton = createMainButton('resume',gameWidth/2,gameHeight/3 + 60,240,80, () => {
        if (!resumeButton.hidden) {
            menuBG.hidden = true
            menuText.hidden = true
            resumeButton.hidden = true
            goToStartMenu.hidden = true
            menuOpen = false
            paused = false
        }
    })

    // Hides the Menu on load
    menuBG.hidden = true
    menuText.hidden = true
    resumeButton.hidden = true
    goToStartMenu.hidden = true

    // Wave info HUD
    const waveInfo = add([
        text(`Current Wave: ${currentWave}
        Eniemes Alive: ${hostileAlive.length}`
        , {size: 24,}),
        pos(backgroundHP.pos.x + 55,backgroundHP.pos.y + 70),
        fixed(),
        anchor('center'),
        color(255,255,255),
        z(1),
    ])


    // Controls
    // movement

    onKeyDown(moveUp, () => {
        if (paused) return
        if (!sprinting) player.move(0, -speed)
        else if (sprinting) player.move(0, -sprintSpeed)
    })
    onKeyDown(moveLeft, () => {
        if (paused) return
        if (!sprinting) player.move(-speed, 0)
        else if (sprinting) player.move(-sprintSpeed, 0)
    })
    onKeyDown(moveDown, () => {
        if (paused) return
        if (!sprinting) player.move(0, speed)
        else if (sprinting) player.move(0,sprintSpeed)
    })
    onKeyDown(moveRight, () => {
        if (paused) return
        if (!sprinting) player.move(speed, 0)
        else if (sprinting) player.move(sprintSpeed,0)

    })
    player.onUpdate(() => {camPos(player.pos)})

     // Sprinting
     onKeyDown("shift", () => {
        sprinting = true
     })
     onKeyRelease("shift", () => {
        sprinting = false
     })

    // Hotbar switch and select
    // Switch to hotbar 1
    onKeyPress(changeToSlot1.toString(), () => {
        currentSlot = 1
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
        slot3.outline.width = 4
        slot3.outline.color = WHITE

        slot1.outline.width = 0
        slot1.outline.color = BLACK
        slot2.outline.width = 0
        slot2.outline.color = BLACK
    })
    // opens command bar
    onKeyPress('/', () => {
        hideCommandMenu('show')
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
        }
    })

    // Opens upgrade menu
    onKeyPress(openTheUpgradeMenu, ()=> {
            if (isUpgradeMenuOpen) return

            allUpgradeMenus.forEach(element => {
                element.hidden = false
            })

            isUpgradeMenuOpen = true
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
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + xOffset,player.pos.y + yOffset),anchor("center"),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: singleGoThrough, fireType: 'single'},"projectile",]))
         amountLeft1--
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, timeout)
    }
    // Triple Shot for hotbar2
    function threeShot(timeout) {
        if (threeCooldown) return
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x ,player.pos.y),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: tripleGoThrough, fireType: 'triple', },"projectile",]))
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + 25,player.pos.y + 25),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: tripleGoThrough,fireType: 'triple',},"projectile",]))
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + -25,player.pos.y + -25),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: tripleGoThrough, fireType: 'triple',},"projectile",]))
        amountLeft2--
        threeCooldown = true
        setTimeout(() => {
            threeCooldown = false
        }, timeout)
    }
    // Auto for hotbar 3
    function shootAuto(xOffset,yOffset,timeout = 1) {
        if (cooldown) return
        currentProjectiles.push(add([sprite("yellow"),pos(player.pos.x + xOffset,player.pos.y + yOffset),area(),scale(0.2),move(toWorld(mousePos()).sub(player.pos),1500),offscreen({ destroy: true }),{piercing: autoGoThrough, fireType: 'auto',},"projectile",]))
        amountLeft3--
        cooldown = true
        setTimeout(() => {
            cooldown = false
        }, timeout)
    }

    // Everything inside Will run every frame
    onUpdate(() => {
        if (paused) return

        // updates health
        HP.text = playerHealth
        HP.color = healthStatus(playerHealth)
        HP.value = playerHealth

        // prompts the dead menu
        if (HP.value <= 0) {
            totalCurrency = 0
            singleDamage = 20
            singleGoThrough = 1
            tripleDamage = 20
            tripleGoThrough = 2
            autoDamage = 20
            autoGoThrough = 1
            speed = 90
            maxHealth = 200
            upgradeCosts = {
                singleDMG: 10,
                singleGoThrough: 10,
                tripleDMG: 10,
                tripleGoThrough: 10,
                autoDMG: 10,
                autoGoThrough: 10,
                maxHealth: 10,
                speed: 10,
            }
            currentWave = 0
            endGame()
        }

        // Wave info
        waveInfo.text = `Current Wave: ${currentWave} \n Eniemes Alive: ${hostileAlive.length}`

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
                hostileAlive.push(add([sprite("red"), area(),body(),pos(randomX, randomY),scale(0.2),outline(5),anchor("center"),offscreen({ destroy: false }),"hostile","explosive",{health: hostileHealth}]))
            } else {
                hostileAlive.push(add([sprite("green"), area(),body(),pos(randomX, randomY),scale(0.2),outline(5),anchor("center"),offscreen({ destroy: false }),"hostile",{health: hostileHealth}]))
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

                    if (currentWave % 5 == 0) {
                        hostileSpeed += 20
                        hostileDamage += 5
                        hostileHealth += 25
                        explosionDamage += 5

                        const reminder = add([
                            text('Enemy speed, health and damage has increased', {size: 24}),
                            pos(gameWidth/2,gameHeight - 25),
                            anchor('center'),
                            fixed(),
                            z(2),
                            color(255,255,255)
                        ])
                        setTimeout(() => {
                            destroy(reminder)
                        }, 3000);

                    }

                    // deletes all ammo drops after 5 seconds when a new wave begins
                    drops.forEach((element,index)=> {
                        setTimeout(() => {
                            destroy(element)
                            drops.splice(index,1)
                        }, 5000);
                    });
                }, 3000);
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

        if (projectile.fireType == 'single') {
            hostile.health -= singleDamage
        } else if (projectile.fireType == 'triple') {
            hostile.health -= tripleDamage
        } else if (projectile.fireType == 'auto') {
            hostile.health -= autoDamage
        }
        projectile.piercing -= 1

        // checks from which direction the bullet hit the enemy and deal knockback toward that direction
        if (hostile.pos.x > projectile.pos.x) { // from left
            hostile.move(2000, 0)
        }
        else if (hostile.pos.x < projectile.pos.x) { // from right
            hostile.move(-2000, 0)
        }

        if (hostile.pos.y < projectile.pos.y) { // from top
            hostile.move(0, -2000)
        }
        else if (hostile.pos.y > projectile.pos.y) { // from bottom
            hostile.move(0, 2000)
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
        playerHealth -= explosionDamage
        console.log('in')
    })
    onCollide('player','drop', (player,drop) => {
        amountLeft1 += 5
        amountLeft2 += 2
        amountLeft3 += 10
        totalCurrency += 10
        if (playerHealth < maxHealth)  playerHealth += 10
        destroy(drop)

    })
    // checks if enemies hit the player
    onCollide("player","hostile", (player,hostile) => {
        // 33% chance for a enemy to deal 2x damage
        const takeCrit = rng(1,3) <= 1 ? true : false
        if (takeCrit) playerHealth -= hostileDamage * 2
        else playerHealth -= hostileDamage

        // checks if player was hit by an enemy and will knock the player back from the direction it was hit from
        if (hostile.pos.x > player.pos.x + 10) { // from right
            player.move(-kb, 0)
        }
        else if (hostile.pos.x < player.pos.x - 10) { // from left
            player.move(kb, 0)
        }

        if (hostile.pos.y > player.pos.y) { // from top
            player.move(0, -kb)
        }
        else if (hostile.pos.y < player.pos.y) { // from bottom
            player.move(0, kb)
        }
    })
})


export { gameWidth, gameHeight, fpsDisplay, totalKills, currentWave}

