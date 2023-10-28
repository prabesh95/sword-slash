import { gameSwitchOptions } from "./playerState.js";
import {
  Minipops,
  Demielephant,
  SquareEye,
  NormalFish,
  HornFish,
} from "./enemies.js";
import InputHandler from "./inputHandler.js";
import Player from "./player.js";

import { Health } from "./util.js";
import { CoinObject } from "./util.js";
import { coincount } from "./attackState.js";
import { PowerSlash } from "./util.js";
import {
  Background,
  SnowMountains,
  Sea,
  Mountains,
  Bushes,
  Mushroom,
  Ground,
  FlyingGround,
} from "./background.js";
export default class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.hit = false;
    this.groundDeficit = 53;
    this.enemies = [
      "minipops",
      "squareEye",
      "demiElephant",
      "normalFish",
      "HornFish",
    ];
    this.enemy = [];
    this.timeInterval = 1000;
    this.enemyTimer = 0;
    this.slashState = true;
    this.input = new InputHandler();
    this.player = new Player(this);
    this.Background = new Background(this);
    this.SnowMountains = new SnowMountains(this);
    this.Sea = new Sea(this);
    this.Mountains = new Mountains(this);
    this.Bushes = new Bushes(this);
    this.Mushroom = new Mushroom(this);
    this.Ground = new Ground(this);
    this.FlyingGround = new FlyingGround(this);
    this.enemyStart = false;
    this.healthObject = new Health(this, 230, 13);
    this.PowerSlash = new PowerSlash(this, 20, 70);
    this.health = 5;
    this.score = 0;
    this.coinObject = new CoinObject(this, 500, 13);
    this.layers = [
      this.Background,
      this.SnowMountains,
      this.Sea,
      this.Mountains,
      this.Bushes,
      this.Mushroom,
      this.Ground,
    ];
    this.explosion;
    this.coin;
    this.count = 0;
    this.attackTimeLimit = 10000; // give value 1 if you want to it to attack nonstop

    this.hitTimer = 0;
    this.gameoverImage = gameinfo;
  }
  update(deltatime, gameaudio) {
    gameaudio.play();
    if (!gameSwitchOptions.includes("stop")) {
      //hit CHeck
      if (this.hit == true) {
        if (this.hitTimer < 500) {
          this.hitTimer += deltatime;
        } else {
          this.hitTimer = 0;
          this.hit = false;
        }
      }

      //Background
      this.layers.forEach((layers) => {
        layers.update(this.input.keys, this.player.x);
      });

      //enemy
      this.enemyStart = this.player.x > this.gameWidth / 2 - 224 ? true : false;
      if (this.enemyStart) {
        if (this.enemyTimer > this.timeInterval) {
          this.enemyTimer = 0;
          this.#addNewEnemy();
        } else {
          this.enemyTimer += deltatime;
        }
      }

      //console.log(this.enemy);
      this.enemy = this.enemy.filter((enemy) => !enemy.markforDeletion);
      this.enemy.forEach((enemy) => {
        enemy.update(deltatime, this.input.keys);
      });
      //player
      this.player.update(deltatime, this.input.keys, this.enemy);
    }
  }
  draw(ctx, deltatime) {
    //background
    this.layers.forEach((layers) => {
      layers.draw(ctx);
    });

    //enemy
    this.enemy.forEach((enemy) => {
      enemy.draw(ctx);
    });
    //player
    this.player.draw(ctx);
    //score

    ctx.fillText(`score: ${this.score} `, 20, 50);

    //coinCount
    this.coinObject.draw(ctx, coincount);
    //health
    for (let i = 0; i < this.health; i++) {
      this.healthObject.draw(ctx, i * 44);
    }
    //powerState
    if (this.slashState == false) {
      if (this.count < this.attackTimeLimit) {
        this.count += deltatime;
      } else {
        this.count = 0;
        this.slashState = true;
      }
    }
    this.PowerSlash.draw(ctx, this.slashState);
    //game over
    if (gameSwitchOptions.includes("stop")) {
      ctx.drawImage(
        this.gameoverImage,
        0,
        35.25 * 2,
        164,
        35.25,
        this.gameWidth / 2 - 82,
        this.gameHeight / 2 - 17,
        164,
        35.25
      );
    }
  }
  #addNewEnemy() {
    const randomEnemy =
      this.enemies[Math.floor(Math.random() * this.enemies.length)];
    if (randomEnemy == "minipops") {
      this.enemy.push(new Minipops(this));
    } else if (randomEnemy == "demiElephant") {
      this.enemy.push(new Demielephant(this));
    } else if (randomEnemy == "squareEye") {
      this.enemy.push(new SquareEye(this));
    } else if (randomEnemy == "normalFish") {
      this.enemy.push(new NormalFish(this));
    } else if (randomEnemy == "hornFish") {
      //this.enemy.push(new HornFish(this));
    }
  }
}
