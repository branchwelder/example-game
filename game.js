// Declare some color constants
const rainbow = {
  red: "#BF616A",
  orange: "#D08770",
  yellow: "#EBCB8B",
  green: "#A3BE8C",
  blue: "#5E81AC",
  purple: "#B48EAD",
};

const base = { background: "#2E3440", foreground: "#ECEFF4" };

// Declare sprite variables
let walls;
let player;
let enemies;

// Initialize some params
let startingMass = 2;
let numEnemies = 10;
let drag = 0.1;
let impulse = 0.2;
let massSizeMultiplier = 20;

function setup() {
  new Canvas(windowWidth, windowHeight);
  noStroke();
  setupBounds();
  setupPlayer();
  setupEnemies();
  setupCollisions();
}

function draw() {
  background(base.background);

  handlePlayerMove();
}

function handlePlayerMove() {
  player.speed -= drag;

  if (kb.pressing("up") || kb.pressing("w")) {
    player.vel.y -= impulse;
  } else if (kb.pressing("down") || kb.pressing("s")) {
    player.vel.y += impulse;
  } else if (kb.pressing("left") || kb.pressing("a")) {
    player.vel.x -= impulse;
  } else if (kb.pressing("right") || kb.pressing("d")) {
    player.vel.x += impulse;
  }
}

function setupBounds() {
  walls = new Sprite(
    [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
      [0, 1],
    ],
    "static"
  );

  walls.color = base.background;
}

function setupPlayer() {
  // Creating the player sprite
  player = new Sprite();
  player.color = rainbow.yellow;
  player.mass = startingMass;
  player.diameter = player.mass * massSizeMultiplier;
  player.bounciness = 1;
}

function setupEnemies() {
  // Make enemies
  enemies = new Group();
  enemies.amount = numEnemies;
  enemies.color = rainbow.red;
  enemies.mass = () => random(1, 5);
  enemies.diameter = (index) => enemies[index].mass * massSizeMultiplier;
  enemies.x = (index) => random(0, width - enemies[index].diameter);
  enemies.y = (index) => random(0, height - enemies[index].diameter);
  enemies.bounciness = 1;
}

function setupCollisions() {
  // Set up collision callbacks
  enemies.collides(enemies, enemyEat);
  player.collides(enemies, checkSize);
}

function enemyEat(enemy, enemy2) {
  if (enemy.mass > enemy2.mass) {
    enemy.mass += enemy2.mass;
    // Update diameter to reflect new mass
    enemy.diameter = enemy.mass * massSizeMultiplier;
    // Remove the eaten enemy
    enemy2.remove();
  }
}

function checkSize(player, enemy) {
  if (player.mass > enemy.mass) {
    player.mass += enemy.mass;
    // Update diameter to reflect new mass
    player.diameter = player.mass * massSizeMultiplier;
    // Remove the eaten enemy
    enemy.remove();
    console.log("nom nom nom");
  } else {
    console.log("GAME OVER! YOU GOT EATEN!");
  }
}
