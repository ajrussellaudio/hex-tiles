let tiles, bigRadius, smallRadius;

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("#sketch");
  bigRadius = 50;
  smallRadius = sqrt(pow(bigRadius, 2) - pow(bigRadius / 2, 2));
  tiles = [];

  for (let j = 0; j < height / bigRadius; j++) {
    tiles[j] = [];
    for (let i = 0; i < width / bigRadius; i++) {
      tiles[j].push(new Tile(bigRadius));
    }
  }
}

function draw() {
  background(color("#333333"));
  tiles.forEach((row, i) => {
    push();
    const offset = smallRadius * (i % 2);
    translate(offset, bigRadius * 1.5 * i);
    row.forEach((tile, i) => {
      push();
      translate(smallRadius * 2 * i, 0);
      tile.draw();
      pop();
    });
    pop();
  });
}

function mousePressed() {
  tiles.forEach(row => {
    row.forEach(tile => {
      tile.randomiseRotation();
    });
  });
}

class Tile {
  constructor(radius) {
    this.randomiseRotation();
    this.diamonds = [];
    for (let i = 0; i < 3; i++) {
      this.diamonds.push(new Diamond(i % 2 !== 0, radius));
    }
    this.colour = color("#FFFFFF");
  }

  draw() {
    stroke(this.colour);
    strokeWeight(2);
    push();
    rotate((PI / 3) * this.rotation);
    this.diamonds.forEach((diamond, i) => {
      rotate(PI / 1.5);
      diamond.draw();
    });
    pop();
  }

  randomiseRotation() {
    this.rotation = int(random(6));
  }
}

class Diamond {
  constructor(reversed, diagonal) {
    this.reversed = reversed;
    this.diagonal = diagonal;
    this.shorttDiagonal = sqrt(pow(diagonal, 2) - pow(diagonal / 2, 2));
    this.lines = 10;
  }

  draw() {
    for (let i = 0; i < this.lines; i++) {
      if (this.reversed) {
        const x = 0;
        const y = map(i, 0, this.lines - 1, 0, this.diagonal);
        push();
        translate(x, y);
        line(0, 0, this.shorttDiagonal, -this.diagonal / 2);
        pop();
      } else {
        const x = map(i, 0, this.lines - 1, 0, this.shorttDiagonal);
        const y = map(i, 0, this.lines - 1, 0, -this.diagonal / 2);
        push();
        translate(x, y);
        line(0, 0, 0, this.diagonal);
        pop();
      }
    }
  }
}
