var database, dog, happyDog, foodS, foodStock
var reset, feedbutton, lastFeed, readStock, bedRoom, Garden, washRoom;
var gameState = "Hungry",
    time = 0
var CurrentTime

function preload() {
    dogImg = loadImage('images/dogImg.png')
    doghappyImg = loadImage('images/dogImg1.png')
    milkImg = loadImage('images/Milk.png')
    bedRoom = loadImage('images/Bed Room.png')
    washRoom = loadImage('images/Wash Room.png')
    Garden = loadImage('images/Garden.png')
    livingRoom = loadImage('images/Living Room.png')
}
function setup() {
    database = firebase.database();
    createCanvas(500, 700);

    dog = createSprite(width - 200, height / 2, 50, 50)
    dog.addImage(dogImg)
    dog.scale = 0.2

    CurrentTime = hour()

    reset = createButton('Buy Food')
    reset.position(860, 540)

    feedbutton = createButton('Feed')
    feedbutton.position(800, 540)
    
    addHour = createButton('+ 1 Hour')
    addHour.position(800, 270)

    milk = createSprite(50, 40, 0, 0)
    milk.addImage(milkImg)
    milk.scale = 0.1

    start = new Food()
}
function draw() {
    background("Red")

    
    foodStock = database.ref('Food')
    foodStock.on("value", start.readStock)
    
    feedtime = database.ref('Time')
    feedtime.on("value", start.readTime)
    
    state = database.ref('gameState')
    state.on("value", start.Change)
    
    start.writeStateUpdate(gameState)
    


    if (gameState === "Hungry") {

        if (foodS !== undefined) {
            fill("white")
            textSize(20)
            text(" = " + foodS, 70, 50)
        }
        if (lastFeed > 12)
            text("Last Feed = " + lastFeed + " PM", 250, 50)

        else if (lastFeed < 12)
            text("Last Feed = " + lastFeed + " AM", 250, 50)

        buttonPressed()
        drawSprites()
    }
    changeBackground()
    increaseTime()
}
function buttonPressed() {

    if (foodS < 5) {
        reset.mousePressed(() => {
            start.writeStockUpdate(foodS)
        })
    }
    else {
        reset.mousePressed(() => {
            alert("You have Sufficient Food")
        })
    }

    if (foodS !== 0) {
        feedbutton.mousePressed(() => {
            start.writeStock(foodS)
            lastTime = hour()
            CurrentTime = hour()
            start.writeTimeUpdate(lastFeed)
            gameState = "justFinished"
            start.writeStateUpdate(gameState)
            dog.addImage(doghappyImg)
        })
    }
    if (foodS <= 0) {
        feedbutton.mousePressed(() => {
            alert("Please Buy Some Food for Your Dog")
        })
    }
}

function changeBackground() {

    if (gameState !== "Hungry") {

        if (CurrentTime === (lastFeed + 1)) {
            start.BEDROOM()
            time=0
            gameState = "afterEating"
            start.writeStateUpdate(gameState)
        }
        if (CurrentTime === (lastFeed + 2)) {
            start.WASHROOM()
            gameState = "afterEating"
            start.writeStateUpdate(gameState)
        }
        if (CurrentTime === (lastFeed + 3)) {
            start.GARDEN()
            gameState = "afterEating"
            start.writeStateUpdate(gameState)
        }
        if (CurrentTime === (lastFeed + 4)) {
            start.GARDEN()
            gameState = "Hungry"
            start.writeStateUpdate(gameState)
        }
        if(gameState==="justFinished")
            time +=1
            
            
        if(time >= 100&&gameState==="justFinished")
            background(livingRoom)
    }
}
function increaseTime(){
    addHour.mousePressed(() => {
        lastTime -=1
        CurrentTime = hour()
        start.writeTimeUpdate(lastFeed)
    })
}