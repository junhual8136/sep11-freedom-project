// import {grassTile16x} from './main.js'
import { loadSprites } from "./load.js"

function loadMap() {
    const map = [
        // ground level
        addLevel([
            "1222222222de2222222223",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "4ffffffffffffffffffff6",
            "7888888888de8888888889",
        ], {
            tileWidth: 128,
            tileHeight: 128,
            tiles: {

                'f': () => [sprite("floor-new"),scale(8)],
                '2': () => [sprite("wall2"),area(),body({isStatic: true}),scale(8)],
                '1': () => [sprite("wall1"),area(),body({isStatic: true}),scale(8)],
                '4': () => [sprite("wall4"),area(),body({isStatic: true}),scale(8)],
                '3': () => [sprite("wall3"),area(),body({isStatic: true}),scale(8)],
                '6': () => [sprite("wall6"),area(),body({isStatic: true}),scale(8)],
                '7': () => [sprite("wall7"),area(),body({isStatic: true}),scale(8)],
                '8': () => [sprite("wall8"),area(),body({isStatic: true}),scale(8)],
                '9': () => [sprite("wall9"),area(),body({isStatic: true}),scale(8)],

                'd': () => [sprite("entrance-part-1"),area(),body({isStatic: true}),scale(8)],
                'e': () => [sprite("entrance-part-2"),area(),body({isStatic: true}),scale(8)],

            }
        }),

        addLevel([
            "1222222222de2222222223",
            "4ffcfffffafffffafffff6",
            "4ffffafffffaafffaffff6",
            "4ffcfbfffffffffffafff6",
            "4ffffafffffbbfafffffa6",
            "4ffffffffffffffffffff6",
            "4fcffbfffcaffbbbfffff6",
            "4ffffaaffffffffffffcf6",
            "4ffbffafffffffffbfaff6",
            "4ffffcffffbffffffcfff6",
            "4ffaffffffffffffffaff6",
            "4fffffffffffaafffffff6",
            "7888888888de8888888889",
        ], {
            tileWidth: 128,
            tileHeight: 128,
            tiles: {
                'a': () => [sprite("pebble"),scale(8)],
                'b': () => [sprite("pebble2"),scale(8)],
                'c': () => [sprite("pebble3"),scale(8)],
            }
        })
    ]
}

export {loadMap}