import {grassTile16x} from './main.js'


function loadMap() {
    const map = [
        // ground level
        addLevel([
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",
            "0ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg0",    
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        ], {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                "g" : () => [sprite("grass-tile-16"),scale(4)],
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