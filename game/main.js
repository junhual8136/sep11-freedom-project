import {loadMap} from './map.js'

kaboom({
    width: 1200,
    height: 800,
    font: "sans-serif",
    canvas: document.querySelector("game"),
})
setBackground(Color.fromHex('#ADD8E6'))

loadMap()

//====================================================================================================================
// Assets
//====================================================================================================================
const grassTile16x = loadSprite("grass-tile-16", "assets/grass.png")
const enemyTile = loadSprite("grass-tile-16", "assets/grass.png")
let speed = 60
const mainPlayer = loadSprite("64xTile", "assets/64xTile.png")

//====================================================================================================================
// Main player
//====================================================================================================================
const player = add([sprite("64xTile"), area(),body(),pos(30, 20),scale(0.5),"player"], )

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

    if (hpBar.value <= 0 && hpBar.value > -1000) {
        const death = add([
            text(`you died`, {size: 100,}),
            pos(player.pos.x, player.pos.y),
        ])
        speed = 0
        hpBar.value = -1000
        hpBar.text = "dead"
    }
 })
//  onMouseMove(() => {
//     const playerPosition = player.pos
//     const mousePosition = mousePos()
//     // const angle = Math.atan2(mousePosition.y - playerPosition.y, mousePosition.x - playerPosition.x)
//     const angle = Math.atan2(mousePosition.x - playerPosition.x,mousePosition.y - playerPosition.y)
//     const angleInDeg = (angle * 180) / Math.PI
//     player.angle = angleInDeg
//     drawLine({
//         p1: player.pos,
//         p2: mousePos(),
//         width: 4,
//         color: rgb(0, 0, 255),
//     })
//  })

//====================================================================================================================
// Enemies
//====================================================================================================================
let firstWave = []
for (let first=0;first<=1;first++) {
    firstWave.push(`firstEnemy${first}`)
    let randomX = Math.ceil(Math.random(1,200) * 100)
    let randomY = Math.ceil(Math.random(1,200) * 100)
    firstWave[first] = add([sprite("64xTile"), area(),body(),pos(randomX, randomY),scale(0.5),"hostile",{health: 100}])
}
onUpdate(() => {
})


onClick(() => {
    const playerP = player.pos
    const mouseP = mousePos()
    const angle = Math.atan2(mouseP.y - playerP.y, mouseP.x - playerP.x)
    const angleInDeg = (angle * 180) / Math.PI
    spawnBullet(playerP, mouseP)
  })
function spawnBullet(p, mouseP) {
  const BULLET_SPEED = 600
  const bullet = add([
    rect(5, 5),
    area(),
    pos(p.sub(12,12)),
    anchor("center"),
    color(255, 0, 0),
    outline(1),
    move(mouseP, BULLET_SPEED),
    "projectile",
  ]);
}


let damage = 20
onCollide("projectile", "hostile", (projectile,hostile) => {
    console.log(hostile.health)
    hostile.health -= damage
    destroy(projectile)
    if (hostile.health <= 0) {
        destroy(hostile)
    }
})


export { grassTile16x }

