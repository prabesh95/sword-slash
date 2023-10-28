class Enemies {
  constructor(game) {
    this.game = game;
    this.image = enemies;
    this.width = 224;
    this.height = 224;
    this.sprite_width = this.width;
    this.sprite_height = this.height;
    this.y =
      this.game.gameHeight - this.sprite_height - this.game.groundDeficit;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.speed;

    this.markforDeletion = false;
    this.x = this.game.gameWidth + this.sprite_width + this.width;
    this.y =
      this.game.gameHeight - this.sprite_height - this.game.groundDeficit;
    this.frameX = 0;
    this.deflectionCheck = Math.floor(Math.random() * 3) <= 1 ? false : true;
    this.audio = new Audio();
    this.audio.src = "sound/swamp.ogg";

    this.deflationRight = 50;
    this.deflationLeft = 20;

    //
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
      this.sprite_width,
      this.sprite_height
    );
  }
  update(deltaTime, keys) {
    //this.audio.play();

    this.condition =
      (keys.includes("ArrowRight") && keys.includes("z")) ||
      (keys.includes("ArrowLeft") && keys.includes("z"));

    if (!this.condition && !this.game.hit) {
      if (keys.includes("ArrowRight")) {
        this.speed = -10;
      } else if (keys.includes("ArrowLeft")) {
        this.speed = 10;
      } else {
        this.speed = 0;
      }
    } else {
      this.speed = 0;
    }
    this.x += this.speedX + this.speed;
    this.y += this.speedY;

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxframe) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.deflectionCheck) {
      // moving in different direction of enemies
      if (this.x < 0 && this.frameY == this.leftframe) {
        this.frameY = this.rightframe;
        this.speedX = this.speedX * -1;
      } else if (
        this.x + this.sprite_width > this.game.gameWidth &&
        this.frameY == this.rightframe
      ) {
        this.frameY = this.leftframe;
        this.speedX = this.speedX * -1;
      }
    }

    if (this.x + this.width + this.game.gameWidth / 4 < 0) {
      this.markforDeletion = true;
    }
  }
}
export class Minipops extends Enemies {
  constructor(game) {
    super(game);
    this.maxframe = 8;
    this.speedX = -(4 + Math.random() * 6);
    this.speedY = 0;
    this.heightDeflationtop = this.height / 2;
    this.leftframe = 2;
    this.rightframe = 7;
    this.frameY = this.leftframe;
    this.health = 1;
  }
  update(deltaTime, keys) {
    super.update(deltaTime, keys);
  }
}
export class Demielephant extends Enemies {
  constructor(game) {
    super(game);
    this.maxframe = 8;
    this.speedX = -(1 + Math.random() * 3);
    this.speedY = 0;
    this.leftframe = 0;
    this.rightframe = 5;
    this.frameY = this.leftframe;
    this.health = 3;
    this.heightDeflationtop = this.height / 4 + 10;
  }
  update(deltaTime, keys) {
    super.update(deltaTime, keys);
  }
}
export class SquareEye extends Enemies {
  constructor(game) {
    super(game);
    this.maxframe = 8;
    this.speedX = -(1 + Math.random() * 3);
    this.speedY = 0;
    this.leftframe = 1;
    this.rightframe = 6;
    this.frameY = this.leftframe;
    this.health = 2;
    this.heightDeflationtop = this.height / 2;
  }
  update(deltaTime, keys) {
    super.update(deltaTime, keys);
  }
}
class Flying extends Enemies {
  constructor(game) {
    super(game);
    this.angleSpeed = Math.random() * 0.2;
    this.angle = 0;
    this.curve = Math.random() * 5;
    this.y = Math.random() * (this.game.gameHeight - this.sprite_height);
    this.maxframe = 4;
  }
  draw(ctx) {
    super.draw(ctx);
  }

  update(deltaTime, keys) {
    this.condition =
      (keys.includes("ArrowRight") && keys.includes("z")) ||
      (keys.includes("ArrowLeft") && keys.includes("z"));

    if (!this.condition && !this.game.hit) {
      if (keys.includes("ArrowRight")) {
        this.speed = -10;
      } else if (keys.includes("ArrowLeft")) {
        this.speed = 10;
      } else {
        this.speed = 0;
      }
    } else {
      this.speed = 0;
    }

    this.x += this.speedX + this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxframe) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.deflectionCheck) {
      // moving in different direction of enemies
      if (this.x < 0 && this.frameY == this.leftframe) {
        this.frameY = this.rightframe;
        this.speedX = this.speedX * -1;
      } else if (
        this.x + this.sprite_width > this.game.gameWidth &&
        this.frameY == this.rightframe
      ) {
        this.frameY = this.leftframe;
        this.speedX = this.speedX * -1;
      }
    }

    if (this.x + this.width + this.game.gameWidth / 4 < 0) {
      this.markforDeletion = true;
    }
  }
}
export class NormalFish extends Flying {
  constructor(game) {
    super(game);
    this.leftframe = 3;
    this.rightframe = 8;
    this.frameY = this.leftframe;
    this.heightDeflationtop = this.height / 2 + 20;
    this.speedX = -(2 + Math.random() * 4);
    this.sprite_width = this.width * 0.8;
    this.sprite_height = this.height * 0.8;
    this.health = 1;
  }
}
export class HornFish extends Flying {
  constructor(game) {
    super(game);
    this.leftframe = 4;
    this.rightframe = 9;
    this.frameY = this.leftframe;
    this.heightDeflationtop = this.height / 2;
    this.speedX = -(4 + Math.random() * 6);
    this.sprite_width = this.width * 0.8;
    this.sprite_height = this.height * 0.8;
    this.health = 2;
  }
}
