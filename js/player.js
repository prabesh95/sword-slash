import {
  IdleRight,
  IdleLeft,
  RunningRight,
  RunningLeft,
  AttackRight,
  AttackLeft,
  JumpRight,
  JumpLeft,
  FallRight,
  FallLeft,
  DIzzyLeft,
  DIzzyRight,
  DieLeft,
  DieRight,
} from "./playerState.js";
import { AttackRelease } from "./attackState.js";
import { Explosion, Coins } from "./attackState.js";
export let collisionTimer = 3000;
export default class Player {
  constructor(game) {
    this.states = [
      new IdleRight(this),
      new IdleLeft(this),
      new RunningRight(this),
      new RunningLeft(this),
      new AttackRight(this),
      new AttackLeft(this),
      new JumpRight(this),
      new JumpLeft(this),
      new FallRight(this),
      new FallLeft(this),
      new DIzzyLeft(this),
      new DIzzyRight(this),
      new DieLeft(this),
      new DieRight(this),
    ];

    this.game = game;
    this.currentState = this.states[0];
    this.frameX = 0;
    this.frameY = 0;
    this.image = player;
    this.width = 224;
    this.height = 224;
    this.numberOfCoins = Math.floor(Math.random() * 5);
    this.spriteWidth = this.width;
    this.spriteHeight = this.height;
    this.x = 0;
    this.y = this.game.gameHeight - this.spriteHeight - this.game.groundDeficit;
    this.deficitX;
    this.deficitY;
    this.speed = 0;
    this.velocityY = 0;
    this.gravity = 0.5;
    this.maxframe = 5;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.slashArray = [];
    this.screemSound = new Audio();
    this.screemSound.src = "sound/slightscream-14.flac";
    this.coins = [];
    this.explosion = [];
    this.squeeze = new Audio();
    this.squeeze.src = "sound/gravel.ogg";
  }
  draw(ctx) {
    this.slashArray.forEach((slash) => {
      slash.draw(ctx);
    });
    //coin
    this.coins = this.coins.filter((coin) => !coin.markforDeletion);
    this.coins.forEach((coin) => {
      coin.draw(ctx);
    });
    //explosion
    this.explosion = this.explosion.filter((exp) => !exp.markforDeletion);
    this.explosion.forEach((object) => {
      object.draw(ctx);
    });

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
  update(deltatime, input, enemies) {
    this.currentState.handleInput(input, collisionTimer, this.game.health);
    this.x += this.speed;
    this.y += this.velocityY;

    if (this.onGround()) {
      this.velocityY = 0;
    } else {
      this.velocityY += this.gravity;
    }
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxframe) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltatime;
    }
    //slash
    this.slashArray = this.slashArray.filter((slash) => !slash.markfordeletion);
    this.slashArray.forEach((slash) => {
      slash.update(enemies, this.currentState);
    });
    //Time interval after collision
    collisionTimer += deltatime;

    //collision
    enemies.forEach((enemies) => {
      if (
        this.x + this.width > enemies.x &&
        enemies.x + enemies.width > this.x &&
        this.y + this.height > enemies.y + enemies.heightDeflationtop &&
        this.y / 2 < enemies.y + enemies.height &&
        collisionTimer > 3000
      ) {
        console.log();
        if (
          (this.currentState == this.states[0] ||
            this.currentState == this.states[2] ||
            this.currentState == this.states[4] ||
            this.currentState == this.states[6] ||
            this.currentState == this.states[8]) &&
          input.includes("z") &&
          this.x + this.width > enemies.x
        ) {
          enemies.x += 2;
          enemies.health -= 2;
        }
        if (
          (this.currentState == this.states[1] ||
            this.currentState == this.states[3] ||
            this.currentState == this.states[5] ||
            this.currentState == this.states[7] ||
            this.currentState == this.states[9]) &&
          input.includes("z") &&
          enemies.x + enemies.width - enemies.deflationRight > this.x
        ) {
          enemies.x -= 2;
          enemies.health -= 2;
        }

        if (
          this.y + this.height < enemies.y + enemies.heightDeflationtop + 30 &&
          this.x + this.width / 3 > enemies.x + enemies.deflationLeft &&
          this.x + (this.width * 2) / 3 <
            enemies.x + enemies.width - enemies.deflationRight
        ) {
          this.velocityY = -8;
          enemies.health -= 1;
          this.squeeze.play();
        }
        if (
          this.x + this.width / 3 > enemies.x + enemies.deflationLeft &&
          this.x + (this.width * 2) / 3 <
            enemies.x + enemies.width - enemies.deflationRight &&
          !(
            this.y + this.height <
            enemies.y + enemies.heightDeflationtop + 30
          ) &&
          this.y + this.height / 2 < enemies.y + enemies.height
        ) {
          this.game.health--;
          collisionTimer = 0;
          this.game.hit = true;
          this.screemSound.play();
        }

        if (enemies.health <= 0) {
          enemies.markforDeletion = true;
          for (let j = 0; j < this.numberOfCoins; j++) {
            this.coins.push(
              new Coins(
                enemies.x + enemies.width / 2,
                enemies.y + enemies.y / 2
              )
            );
          }
          this.explosion.push(
            new Explosion(
              enemies.x + enemies.width / 2,
              enemies.y + enemies.y / 2
            )
          );
          this.game.score++;
        }
      }
    });

    //coin
    this.coins.forEach((coin) =>
      coin.update(deltatime, this.x, this.y, this.height, this.width, input)
    );
    //explosion
    this.explosion.forEach((exp) => {
      exp.update(deltatime);
    });
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();

    if ((state == 4 || state == 5) && this.game.slashState) {
      if (this.currentState == this.states[4]) {
        this.#slash(state);
      } else if (this.currentState == this.states[5]) {
        this.#slash(state);
      }
      this.game.slashState = false;
    }
  }
  onGround() {
    return this.y + this.spriteHeight >=
      this.game.gameHeight - this.game.groundDeficit - 5
      ? true
      : false;
  }
  playermotion() {
    return this.x > this.game.gameWidth / 2 - 224;
  }
  leftboundry() {
    return this.x < -5;
  }
  #slash(state) {
    this.slashArray.push(new AttackRelease(this, state));
  }
}
