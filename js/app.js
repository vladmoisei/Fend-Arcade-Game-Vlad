let score = document.querySelector('.score__label');
let level = 1;
let lives = document.querySelector('.life');
let heartCounter = 0;

let heartHTMl = '<img src="images/Heart.png" alt="Life image" class="heart show">';
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 78;
    this.height = 50;
    this.speed = setSpeedOfEnemy();
};

// Enemy collision with player
Enemy.prototype.checkCollision = function(player) {
    // var rect1 = {x: 5, y: 5, width: 50, height: 50}
    // var rect2 = {x: 20, y: 10, width: 10, height: 10}

    // if (rect1.x < rect2.x + rect2.width &&
    //  rect1.x + rect1.width > rect2.x &&
    //  rect1.y < rect2.y + rect2.height &&
    //  rect1.height + rect1.y > rect2.y) {
    // // collision detected!
    // }

    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y
        ) {
        //alert('ciocnire');
        removeHeart();
        checkLives();
        console.log('ciocnire');
        player.reset();
        }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollision(player);
    this.x += this.speed * dt;
    //check if enemy's position is oputside the canvas
    if (this.x > 550) {
        //console.log(this.x);
        this.reset();
        //console.log(this.x);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset Enemy to start position
Enemy.prototype.reset = function() {
    //check if enemy's position is oputside the canvas
        this.x = (-50) * getCoordonateEndX();
        this.y = getRowNumber();
        this.speed = setSpeedOfEnemy();
        this.increaseNumber();
}

//Increase enemy number by level
Enemy.prototype.increaseNumber = function () {
    switch (checkLevel()) {
        case 2: {
            if (allEnemies.length === 3) {
                allEnemies.push (new Enemy(-50, getRowNumber()));
                console.log(allEnemies.length);
            }
        }
        break;
        case 3: {
            if (allEnemies.length === 4) {
                allEnemies.push (new Enemy(-50, getRowNumber()));
            }
        }
        break;
        case 4: {
            if (allEnemies.length === 5) {
                allEnemies.push (new Enemy(-50, getRowNumber()));
            }
        }
        break;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(avatar = 'char-boy.png') {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/' + avatar;
    this.x = 200;
    this.y = 400;
    this.width = 65;
    this.height = 50;
    startLives();
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x = 200;
    if (this.y < 0) {
        score.textContent = (1+Number(score.textContent)).toString();
        this.reset();
    }
}

// Reset player
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(5, getRowNumber()), new Enemy(5, getRowNumber()), new Enemy(5, getRowNumber())];

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left': if (this.x >= 90) {
            this.x -= 101;
        }
        break;
        case 'up': if (this.y >= 60) {
            this.y -= 83;
        }
        break;
        case 'right': if (this.x < 402) {
            this.x += 101;
        }
        break;
        case 'down': if (this.y < 400) {
            this.y +=83;
        }
        break;
    }
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Get random speeds for different levels
// * Function Set Level
// * Function get random integer between an interval
// * Function return speed for enemy by level

//Function Set level
function checkLevel() {
    let scoreValue = Number(score.textContent);
    if (scoreValue > 10 && scoreValue < 21) {
        level = 2;
    }
    if (scoreValue >= 21 && scoreValue < 36) {
        level = 3;
    }
    else if (scoreValue > 35) {
        level = 4;
    }
    else if (scoreValue < 10) {
        level = 1;
    }
    return level;
}


// This Function return a random number between a given interval
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Function return speed of enemy by level
function setSpeedOfEnemy() {
    let speed = 0;
    switch (checkLevel()) {
        case 1: speed = getRandomInt(3, 12) * 10;
        break;
        case 2: speed = getRandomInt(6, 16) * 10;
        break;
        case 3: speed = getRandomInt(9, 20) * 10;
        break;
        case 4: speed = getRandomInt(12, 30) * 10;
        break;
    }
    //console.log(speed);
    return speed;
}

// Get random rows for enemy

function getRowNumber() {
    let rowNumber = {1: 65,2: 150, 3: 235};
    let rowCoordonateX = 0;
    switch (getRandomInt(1, 4)) {
        case 1: rowCoordonateX = rowNumber[1];
        break;
        case 2: rowCoordonateX = rowNumber[2];
        break;
        case 3: rowCoordonateX = rowNumber[3];
        break;
    }
    return rowCoordonateX; //return y coordanate for each row
}

// Get random columns for gem

function getColumnNumber() {
    let columnNumber = {1: -2,2: 99, 3: 200, 4: 301, 5: 402};
    let columnCoordonateY = 0;
    switch (getRandomInt(1, 6)) {
        case 1: columnCoordonateY = columnNumber[1];
        break;
        case 2: columnCoordonateY = columnNumber[2];
        break;
        case 3: columnCoordonateY = columnNumber[3];
        break;
        case 4: columnCoordonateY = columnNumber[4];
        break;
        case 5: columnCoordonateY = columnNumber[5];
        break;
    }
    return columnCoordonateY; //return x coordanate for each column
}

// Get x coordonate to reset enemy position
function getCoordonateEndX() {
    let startPositionRandom = getRandomInt(1, 4);
    return (startPositionRandom);
}

// Logic lives
// Start hearts
function startLives() {
    lives.innerHTML = `${heartHTMl}${heartHTMl}${heartHTMl}`;
    heartCounter = 3;
}

// Add heart to html
function addHeart() {
    lives.innerHTML += heartHTMl;
    heartCounter++;
}

// Remove heart from html
function removeHeart() {
    if (lives.firstElementChild) {
        lives.lastElementChild.remove();
        heartCounter--;
    }
}

function checkLives() {
    if (lives.firstElementChild) return true;
    return false;
}

// Character Selection

let characters = document.querySelectorAll('.char');
characters.forEach(character => character.addEventListener("click", handlerEventClickOnCard));

function handlerEventClickOnCard() {
    clearCharacterSelection();
    selectCharacter(this);
    //console.log(this);
}

function clearCharacterSelection() {
    characters.forEach(character => character.className = 'char');
}

function selectCharacter(elem) {
    elem.className = 'char char__selected';
    player.sprite = elem.getAttribute('src');
}

// Gem to Canvas

var Gem = function() {
    this.type = getRandomInt(1, 7);
    this.sprite = gemType[this.type];
    this.x = getColumnNumber();
    this.y = getRowNumber();
    this.width = 50;
    this.height = 40;
    this.score = gemScore[this.type];
}

// Gem taken by the player
Gem.prototype.checkCollision = function(player) {

    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y
        ) {
        //alert('ciocnire');
        // increaseScore(); DE FACUT
        console.log('increase score');
        score.textContent = (this.score + Number(score.textContent)).toString();
        if (this.type === 6 && heartCounter < 5) addHeart();
        this.reset();
        }
}

// Update gem if it is taken or not
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollision(player);
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset Enemy to start position
Gem.prototype.reset = function() {
    this.x = getColumnNumber();
    this.y = getRowNumber();
    this.type = getRandomInt(1, 7);
    this.sprite = gemType[this.type];
    this.score = gemScore[this.type];
}

var gemType = {
    1: 'images/Gem-Blue.png',
    2: 'images/Gem-Green.png',
    3: 'images/Gem-Orange.png',
    4: 'images/Key.png',
    5: 'images/Star.png',
    6: 'images/Heart.png'
    };
var gemScore = {
    1: 4,
    2: 2,
    3: 3,
    4: 5,
    5: 10,
    6: 0
};

let gem = new Gem();