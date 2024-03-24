function createStartMenu() {
    scene('startMenu', () => {
        setBackground(Color.fromHex('#000000'))

        const score = add([
            text("Score: 0"),
            pos(24, 24),
            { value: 0 },
        ])


    })
    go('startMenu')
}

export { createStartMenu }