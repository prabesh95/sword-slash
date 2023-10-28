export let coincount = 0;

export class AttackRelease {
  constructor(player, state) {
    this.player = player;
    this.x = this.player.x;
    this.y = this.player.y + this.player.width / 2 + this.player.width / 6;
    this.image = new Image();
    this.image.src = "../img/slash.png";
    this.speed = 10;
    this.spriteWidth = this.width = 82.67;
    this.spriteHeight = this.height = 63;
    this.frameY = 0;
    this.frameX = 2;
    this.markfordeletion = false;
    this.state = state;

    this.attackSound = new Audio();
    this.attackSound.src = "sound/10.wav";
    this.count = 0;
    this.health = 7;
    this.slashPower = 2;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight
    );
  }
  update(enemies) {
    if (this.count == 0) this.attackSound.play();
    this.count++;
    if (
      this.x + this.width >= this.player.game.gameWidth ||
      this.x + this.width < 0
    ) {
      this.markfordeletion = true;
    }
    if (this.state == 4) {
      this.x += this.speed;
    } else if (this.state == 5) {
      this.frameY = 1;
      this.frameX = 0;
      this.x -= this.speed;
    }

    enemies.forEach((enemies) => {
      if (
        !(
          this.x + this.width < enemies.x ||
          this.y + this.height < enemies.y ||
          this.y + this.height / 2 > enemies.y + enemies.height ||
          this.x + this.width > enemies.x + enemies.width
        )
      ) {
        enemies.health = enemies.health - this.slashPower;
        this.health = this.health - this.slashPower;
        if (enemies.health <= 0) {
          enemies.markforDeletion = true;

          this.player.game.score++;
        }
      }

      if (this.health <= 0) {
        this.markfordeletion = true;
      }
    });
  }
}
export class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = boom;
    this.frameX = 0;
    this.width = 200;
    this.height = 179;
    this.spriteWidth = 100;
    this.spriteHeight = 89.5;
    this.maxFrame = 4;
    this.explosionTimer = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.markforDeletion = false;
    this.sound = new Audio();
    this.sound.src = "sound/FRATATAK.ogg";
  }
  draw(ctx) {
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
  update(deltatime) {
    if (this.frameX == 0) {
      this.sound.play();
    }
    if (this.explosionTimer > this.frameInterval) {
      this.frameX++;

      this.explosionTimer = 0;
    } else {
      this.explosionTimer += deltatime;
    }
    if (this.frameX > this.maxFrame) {
      this.markforDeletion = true;
    }
  }
}
export class Coins {
  constructor(x, y) {
    this.x = x + (Math.floor(Math.random() * 50) - 5);
    this.y = y;
    this.image = coin;
    this.frameX = 0;
    this.width = 36.75;
    this.height = 44;
    this.spriteWidth = 36.75;
    this.spriteHeight = 44;
    this.maxframe = 7;
    this.coinTimer = 0;
    this.frameTimer = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.markforDeletion = false;
    this.sound = new Audio();
    this.sound.src = "sound/1_Coins.ogg";
    this.speed = 10;
  }
  draw(ctx) {
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
  update(deltaTime, playerX, playerY, playerheight, playerwidth, input) {
    if (
      (playerX + playerwidth > this.x &&
        this.x + this.width > playerX &&
        playerY + playerheight > this.x) ||
      this.coinTimer > 100
    ) {
      coincount++;
      this.sound.play();
      this.markforDeletion = true;
    }

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxframe) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      this.frameTimer = 0;
      this.coinTimer++;
    } else {
      this.frameTimer += deltaTime;
    }
    if (
      input.includes("ArrowRight") &&
      !(input.includes("ArrowRight") && input.includes("z"))
    ) {
      this.x -= this.speed;
    } else if (
      input.includes("ArrowLeft") &&
      !(input.includes("ArrowLeft") && input.includes("z"))
    ) {
      this.x += this.speed;
    }
  }
}
