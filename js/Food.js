class Food {
    constructor () {

    }
    readStock(data) {
        foodS = data.val()
    }
    Change(data) {
        gameState = data.val()
    }
    readTime(data) {
        lastFeed = data.val()
    }

    writeStock(x) {
        database.ref('/').update({
            Food: x - 1
        })
    }
    writeState(x) {
        database.ref('/').update({
            gameState: gameState
        })
    }

    writeTime(x) {
        database.ref('/').update({
            Time: x
        })
    }

    writeStockUpdate(x) {
        database.ref('/').update({
            Food: 20
        })
    }
    
    writeStateUpdate(x) {
        database.ref('/').update({
            gameState: gameState
        })
    }

    writeTimeUpdate(x) {
        database.ref('/').update({
            Time: lastTime
        })
    }

    BEDROOM() {
        background(bedRoom)
    }

    WASHROOM() {
        background(washRoom)
    }

    GARDEN() {
        background(Garden)
    }
}