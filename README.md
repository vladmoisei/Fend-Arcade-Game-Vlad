# Classic Arcade Game Clone
Udacity Front-End Web Developer Nanodegree Project 3
===============================

## Project overview

The objective is to practice object-oriented JavaScript programming by recreating the classic arcade game **Frogger**.  Given visual assets and a game loop engine, I must create classes for the game pieces, and add properties and methods to govern their interactions.

## Getting started

The starting source code was cloned from https://github.com/udacity/frontend-nanodegree-arcade-game.

## Specifications

| Criteria              | Specifications    |
| --------------------- | ----------------- |
| Game Functions        | Game functions correctly and runs error-free (player cannot move off-screen, bugs cross the screen, bug-player collision resets the game, something happens when player reaches the water). To exceed specifications, add such functionality as collectible items on screen, multiple bug types, timed games, etc. |
| Object-Oriented Code  | Game objects (player and bugs) are implemented using JavaScripts's object-oriented programming features. |
| Code Quality          | Code is formatted with consistent, logical, and easy-to-read formatting as described in [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html) |
| Comments              | Comments are present and effectively explain longer code procedures. To exceed specifications, comments must be thorough and concise, and code must be self-documenting. |
| Documentation         | A README file is included detailing all steps required to successfully run and play the application |

## Steps taken
* Implement Enemy, Player, Gem classes-
  - implement collision between enemy and player
  - movement of enemy
  - random speed for enemy
  - increase number of enemy
  - movement of player
  - limit player's movement on canvas
  - randomly show gem
  - implement collision between gem and player (player take gem)
* Additional Functionality
  - Player selection: allow the user to select the image for the player character before starting the game.
  - Score: the score can increase each time the player reaches the water
  - Collectibles: allow the player to collect artefacts to increase score
  - Level: it is increased by the score number; increase number of enemies; increase speed of enemies
  - Lives: show by hearts number

## Where to Play
* [Link to WebSite](https://vladmoisei.github.io/Fend-Arcade-Game-Vlad/)


### Game's rules
* The game starts automatically.
* Press F5 to start a new game.
* Use arrow keys to move left, right, up, down
* Score points when you reach the water zone or grab an artefact
  - Reach the water zone to score 1 point
  - Grab a green gem to score 2 points
  - Grab an orange gem to score 3 points
  - Grab a blue gem to score 4 points
  - Grab a key to score 5 points
  - Grab a star to score 10 points
* Game levels and lives rules
  - Win a life when you pick up a heart (you can have maximum to 5)
  - Lose a life when you hit a bug (or a bug hits you)
  - Level of dificulty increase proportional to your score (up to 4 levels)
  - Speed and number of bugs increase with level
  - Game ends when you have no more lives