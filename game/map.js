import {grassTile16x} from './main.js'


function loadMap() {
    const map = [
        // ground level
        addLevel([
            "00000000000000000000000000000000000000000000000000000000000",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "00000000000000000000000000000000000000000000000000000000000",
        ], {
            tileWidth: 128,
            tileHeight: 128,
            tiles: {
                "g" : () => [sprite("grass-tile-16"),scale(8)],
                '0': () => [area({shape: new Rect(vec2(0), 16, 16)}),body({isStatic: true})],

            }
        }),
        // map border
        // addLevel([
        //     "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "0                                                                                                                        0",
        //     "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        // ], {
        //     tileWidth: 16,
        //     tileHeight: 16,
        //     tiles: {
        //         '0': () => [
        //             area({shape: new Rect(vec2(0), 16, 16)}),
        //             body({isStatic: true})
        //         ],
        //     }
        // })
    ]
}

export {loadMap}