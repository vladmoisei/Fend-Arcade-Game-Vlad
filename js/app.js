// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 78;
    this.height = 71;
    this.speed = speed;
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
    this.x += setSpeedOfEnemy() * dt;
    if (this.x > 500) this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
    this.height = 84;
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x = 200;
    //this.y = 400;
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
var allEnemies = [new Enemy(5, 65), new Enemy(5, 150), new Enemy(5, 235)];

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

//Get random speeds for different levels
//
//
//

//Function Set level
let score = document.querySelector('.score__label');
let level = 1;
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
    return level;
}


// This Function return a random number between a given interval
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Function Set speed of enemy by level
function setSpeedOfEnemy() {
    let speed = 0;
    switch (checkLevel()) {
        case 1: speed = getRandomInt(20, 90);
        break;
        case 2: speed = getRandomInt(50, 120);
        break;
        case 3: speed = getRandomInt(80, 160);
        break;
        case 4: speed = getRandomInt(110, 200);
        break;
    }
    return speed;
}