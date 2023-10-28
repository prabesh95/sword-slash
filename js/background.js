class Layer {
  constructor(game) {
    this.game = game;
    this.gameSpeed = 10;
    this.width = this.game.gameWidth;
    this.height = this.game.gameHeight;
    this.x = 0;
    this.x2 = this.width;
    this.y = 0;
    this.y2 = 0;
    this.conditionForMotion = false;
    this.secondConditon = false;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y2, this.width, this.height);
  }
  update(input, playerX) {
    this.conditionForMotion =
      playerX > this.game.gameWidth / 2 - 224 ? true : false;
    if (
      input.includes("ArrowRight") &&
      this.conditionForMotion &&
      !(input.includes("ArrowRight") && input.includes("z")) &&
      !this.game.hit
    ) {
      if (this.x <= -this.width) {
        this.x = this.width + this.x2 - this.speed;
      }
      if (this.x2 <= -this.width) {
        this.x2 = this.width + this.x - this.speed;
      }
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }
    if (
      input.includes("ArrowLeft") &&
      this.conditionForMotion &&
      !(input.includes("ArrowLeft") && input.includes("z")) &&
      !this.game.hit
    ) {
      if (this.x >= this.width) {
        this.x = -this.width + this.x2 + this.speed;
      }
      if (this.x2 >= this.width) {
        this.x2 = -this.width + this.x + this.speed;
      }
      this.x = Math.floor(this.x + this.speed);
      this.x2 = Math.floor(this.x2 + this.speed);
    }
  }
}

export class Background extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer1.png";
    this.flowSpeed = 0;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class SnowMountains extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer7.png";
    this.flowSpeed = 0.2;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class Sea extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer6.png";
    this.flowSpeed = 0.4;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class Mountains extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer5.png";
    this.flowSpeed = 0.6;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class Bushes extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer4.png";
    this.flowSpeed = 0.8;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class Mushroom extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer3.png";
    this.flowSpeed = 1;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class Ground extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/layer2.png";
    this.flowSpeed = 1;
    this.speed = this.gameSpeed * this.flowSpeed;
  }
}
export class FlyingGround extends Layer {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = "../img/pathLayer.png";
    this.flowSpeed = 1;
    this.width = 213 * 0.9;
    this.height = 86 * 0.9;
    this.speed = this.gameSpeed * this.flowSpeed;
    this.x = this.game.gameWidth / 2;
    this.y = Math.random() * (this.game.gameHeight / 2 - this.height);
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update(input, playerX, playerY, playerWidth, playerHeight) {
    this.conditionForMotion =
      playerX > this.game.gameWidth / 2 - 224 ? true : false;
    this.secondConditon =
      playerX + (playerWidth * 2) / 3 < this.x ||
      playerY + playerHeight < this.y ||
      playerY + playerHeight / 2 > this.y + this.height ||
      playerX + (playerWidth * 2) / 3 > this.x + this.width
        ? true
        : false;

    if (
      input.includes("ArrowRight") &&
      this.conditionForMotion &&
      !(input.includes("ArrowRight") && input.includes("z"))
    ) {
      this.x -= this.speed;
    } else if (
      input.includes("ArrowLeft") &&
      this.conditionForMotion &&
      !(input.includes("ArrowLeft") && input.includes("z"))
    ) {
      this.x += this.speed;
    }
  }
}
