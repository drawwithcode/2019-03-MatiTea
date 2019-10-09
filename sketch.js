let allStars = [];
let amountOfStars = 50;

let allFallingStars = [];
let amountOfFallingStars = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  generateFallingStars();
  generateStars();
}

function draw() {
  background(12, 26, 75);

  // stars
  animateFallingStars();
  pulseStars();

  // landscape
  landscape.draw();

  instructions();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  const size = 10;
  const seed = random() * 1000;

  const tempStar = new FallingStar(mouseX, mouseY, size, seed, false);

  allFallingStars.push(tempStar);
}

function instructions() {
  textAlign(CENTER, CENTER);
  textSize(18);
  text('Click to create new falling stars', windowWidth / 2, windowHeight - 60);
}

/**
 * Falling star
 */
function FallingStar(_x, _y, _size, _seed, _regenerate) {
  this.size = _size;
  this.x = _x;
  this.y = _y;
  this.speed = 3.5;
  this.seed = _seed;
  this.regenerate = _regenerate;
  this.color = {
    r: 246,
    g: 242,
    b: 151
  };

  let xIncrease = random() + 1;
  let yIncrease = random() + 1;

  // set random star X position
  this.setRandomX = function () {
    this.x = random() * windowWidth;
  }

  // set random star Y position
  this.setRandomY = function () {
    this.y = random() * windowHeight / 3;
  }

  // animate star
  this.move = function () {
    if (this.regenerate == true) {
      if (
        (this.x == -1 && this.y == -1) ||
        this.x > windowWidth * 2 ||
        this.y > windowHeight * 2
      ) {
        this.setRandomX();
        this.setRandomY();
      }
    }

    this.x += xIncrease * this.speed;
    this.y += yIncrease * this.speed;
  }

  // draw star
  this.display = function () {
    fill(this.color.r, this.color.g, this.color.b);
    noStroke();

    ellipse(this.x, this.y, this.size * noise(0.2 * (frameCount * this.seed)));
  }
}

function generateFallingStars() {
  for (var i = 0; i < amountOfFallingStars; i++) {
    const posX = random() * windowWidth;
    const posY = random() * windowHeight;
    const size = 10;
    const seed = random() * 1000;

    const tempStar = new FallingStar(posX, posY, size, seed, true);

    allFallingStars.push(tempStar);
  }
}

function animateFallingStars() {
  for (var i = 0; i < allFallingStars.length; i++) {
    const tempStar = allFallingStars[i];

    tempStar.move();
    tempStar.display();
  }
}

/**
 * Generic star
 */
function Star(_size, _seed) {
  this.size = _size;
  this.x = -1;
  this.y = -1;
  this.color = 'white';
  this.seed = _seed;

  // set random star X position
  this.setRandomX = function () {
    this.x = random() * windowWidth;
  }

  // set random star Y position
  this.setRandomY = function () {
    this.y = random() * (windowHeight / 3) * 2;
  }

  // initialize position
  this.initialize = function() {
    this.setRandomX();
    this.setRandomY();
  }

  // pulse star
  this.pulse = function () {
    fill(this.color);
    noStroke();

    ellipse(this.x, this.y, this.size * noise(0.1 * (frameCount + this.seed)));
  }
}

function generateStars() {
  const size = 5;
  for (var i = 0; i < amountOfStars; i++) {
    const seed = random() * 1000;
    const tempStar = new Star(size, seed);

    tempStar.initialize();

    allStars.push(tempStar);
  }
}

function pulseStars() {
  for (var i = 0; i < amountOfStars; i++) {
    const tempStar = allStars[i];

    tempStar.pulse();
  }
}

/**
 * Landscape
 */
let landscape = {
  color: {
    r: 7,
    g: 14,
    b: 29
  },
  height: (innerHeight / 4) * 3,
  draw: function() {
    for (let x = 0; x < width; x++) {
      const landscapeLineHeight = this.height + noise(x * 0.005) * 50;

      stroke(this.color.r, this.color.g, this.color.b);
      line(x, height, x, landscapeLineHeight);
    }
  }
}
