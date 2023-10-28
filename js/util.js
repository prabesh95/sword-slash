export class Health {
  constructor(game, x, y) {
    this.game = game;
    this.image = health;
    this.width = 40;
    this.height = 44;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = x;
    this.y = y;
  }
  draw(ctx, space) {
    ctx.drawImage(
      this.image,
      this.x + space,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}
export class CoinObject {
  constructor(game, x, y) {
    this.game = game;
    this.image = coin;
    this.width = 36.75;
    this.height = 44;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = x;
    this.y = y;
  }
  draw(ctx, numberofCoins) {
    ctx.drawImage(
      this.image,
      this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
    ctx.fillText(`X ${numberofCoins}`, this.x + 50, this.y + 42);
  }
}
export class PowerSlash {
  constructor(game, x, y) {
    this.game = game;
    this.image = powerUp;
    this.width = 40.5;
    this.height = 40;
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = x;
    this.y = y;
    this.frameX = 1;
  }
  draw(ctx, powerState) {
    if (powerState == true) {
      this.frameX = 1;
    } else {
      this.frameX = 0;
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}
