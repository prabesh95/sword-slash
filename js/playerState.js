export let gameSwitchOptions = [];
const states = {
  idle_right: 0,
  idle_left: 1,
  run_right: 2,
  run_left: 3,
  attack_right: 4,
  attack_left: 5,
  jump_right: 6,
  jump_left: 7,
  fall_right: 8,
  fall_left: 9,
  dizzy_left: 10,
  dizzy_right: 11,
  die_left: 12,
  die_right: 13,
};

class State {
  constructor(state) {
    this.state = state;
    this.speed = 5;
    this.velocityY = 18;
    this.jumpAudio = new Audio();
    this.jumpAudio.src = "sound/jumppp11.ogg";
    this.landAudio = new Audio();
    this.landAudio.src = "sound/45_Landing_01.wav";
    this.running = new Audio();
    this.running.src = "sound/steps in wood floor.wav";
    this.last;
  }
}

export class IdleRight extends State {
  constructor(player) {
    super("Idle Right");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 5;
    this.player.frameY = 0;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_right);
    }
    if (input.includes("ArrowLeft")) {
      this.player.setState(states.idle_left);
    } else if (input.includes("ArrowRight") && !this.player.playermotion()) {
      this.player.setState(states.run_right);
      this.player.speed = this.speed;
    } else if (input.includes("ArrowRight") && this.player.playermotion()) {
      this.player.speed = 0;
      this.player.setState(states.run_right);
    } else if (input.includes("ArrowUp") || input.includes("ArrowUp")) {
      this.player.velocityY = -this.velocityY;
      this.player.setState(states.jump_right);
    } else if (input.includes("z")) {
      this.player.setState(states.attack_right);
    } else if (input.indexOf("ArrowRight") == -1) {
      this.player.speed = 0;
    }
    if (health <= 0) {
      this.player.setState(states.die_right);
    }
  }
}

export class IdleLeft extends State {
  constructor(player) {
    super("Idle Left");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 5;
    this.player.frameY = 10;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_left);
    }
    if (input.includes("ArrowRight")) {
      this.player.setState(states.idle_right);
    } else if (input.includes("ArrowLeft") && !this.player.playermotion()) {
      this.player.setState(states.run_left);
      this.player.speed = -this.speed;
    } else if (input.includes("ArrowLeft") && this.player.playermotion()) {
      this.player.speed = 0;
      this.player.setState(states.run_left);
    } else if (input.includes("ArrowUp")) {
      this.player.velocityY = -this.velocityY;
      this.player.setState(states.jump_left);
    } else if (input.includes("z")) {
      this.player.setState(states.attack_left);
    } else if (input.indexOf("ArrowLeft") == -1) {
      this.player.speed = 0;
    }
    if (health <= 0) {
      this.player.setState(states.die_left);
    }
  }
}
export class RunningRight extends State {
  constructor(player) {
    super("Runnng Right");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 4;
    this.player.frameY = 2;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_right);
    }
    if (input.indexOf("ArrowRight") == -1) {
      this.player.speed = 0;
      this.player.setState(states.idle_right);
    } else if (this.player.playermotion()) {
      this.player.speed = 0;
    }
    if (input.includes("ArrowLeft")) {
      this.player.setState(states.idle_left);
    }
    if (input.includes("ArrowUp")) {
      this.player.setState(states.jump_right);
      this.player.velocityY = -this.velocityY;
    }
    if (input.includes("z")) {
      this.player.setState(states.attack_right);
    }
    if (health <= 0) {
      this.player.setState(states.die_right);
    }
  }
}
export class RunningLeft extends State {
  constructor(player) {
    super("Running Left");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 4;
    this.player.frameY = 12;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_left);
    }
    if (input.indexOf("ArrowLeft") == -1) {
      this.player.speed = 0;
      this.player.setState(states.idle_left);
    } else if (
      input.includes("ArrowLeft") &&
      !this.player.playermotion() &&
      !this.player.leftboundry()
    ) {
      this.player.setState(states.run_left);
      this.player.speed = -this.speed;
    } else if (this.player.leftboundry()) {
      this.player.speed = 0;
    } else if (input.includes("ArrowLeft") && this.player.playermotion()) {
      this.player.setState(states.run_left);
      this.player.speed = 0;
    }
    if (input.includes("ArrowUp")) {
      this.player.setState(states.jump_left);
      this.player.velocityY = -this.velocityY;
    }
    if (input.includes("z")) {
      this.player.setState(states.attack_left);
    }
    if (health <= 0) {
      this.player.setState(states.die_left);
    }
  }
}
export class JumpRight extends State {
  constructor(player) {
    super("jump Right");
    this.player = player;
  }
  enter() {
    this.jumpAudio.play();
    this.player.maxframe = 0;
    this.player.frameY = 3;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_right);
    }
    if (this.player.velocityY > 0) {
      this.player.setState(states.fall_right);
    } else if (input.includes("ArrowLeft")) {
      this.player.setState(states.jump_left);
    } else if (input.includes("z")) {
      this.player.setState(states.attack_right);
    }
    if (health <= 0) {
      this.player.setState(states.die_right);
    }
  }
}
export class FallRight extends State {
  constructor(player) {
    super("fall Right");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 0;
    this.player.frameY = 8;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_right);
    }
    if (this.player.onGround()) {
      this.landAudio.play();
      this.player.setState(states.idle_right);
    } else if (input.includes("z")) {
      this.player.setState(states.attack_right);
    }
    if (health <= 0) {
      this.player.setState(states.die_right);
    }
  }
}
export class JumpLeft extends State {
  constructor(player) {
    super("jump Left");
    this.player = player;
  }
  enter() {
    this.jumpAudio.play();
    this.player.maxframe = 0;
    this.player.frameY = 13;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_left);
    }
    if (this.player.velocityY > 0) {
      this.player.setState(states.fall_left);
    }
    if (input.includes("ArrowRight")) {
      this.player.setState(states.jump_right);
    } else if (input.includes("z")) {
      this.player.setState(states.attack_left);
    }
    if (health <= 0) {
      this.player.setState(states.die_left);
    }
  }
}
export class FallLeft extends State {
  constructor(player) {
    super("fall Left");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 0;
    this.player.frameY = 18;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_left);
    }
    if (this.player.onGround()) {
      this.landAudio.play();
      this.player.setState(states.idle_left);
    } else if (input.includes("z")) {
      this.player.setState(states.attack_left);
    }
    if (health <= 0) {
      this.player.setState(states.die_left);
    }
  }
}
export class AttackLeft extends State {
  constructor(player) {
    super("Attack Left");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 3;
    this.player.frameY = 11;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_left);
    }
    if (input.indexOf("z") == -1) {
      this.player.setState(states.idle_left);
    }
    if (!this.player.onGround() && input.indexOf("z") == -1) {
      this.player.setState(states.jump_left);
    }
    if (health <= 0) {
      this.player.setState(states.die_left);
    }
  }
}

export class AttackRight extends State {
  constructor(player) {
    super("Attack Left");
    this.player = player;
  }
  enter() {
    this.player.maxframe = 3;
    this.player.frameY = 1;
  }
  handleInput(input, collisiontimer, health) {
    if (collisiontimer < 500) {
      this.player.setState(states.dizzy_right);
    }
    if (input.indexOf("z") == -1) {
      this.player.setState(states.idle_right);
    }
    if (!this.player.onGround() && input.indexOf("z") == -1) {
      this.player.setState(states.jump_right);
    }
    if (health <= 0) {
      this.player.setState(states.die_right);
    }
  }
}

export class DIzzyRight extends State {
  constructor(player) {
    super("DIzzy Right");
    this.player = player;
    this.move = false;
  }
  enter() {
    this.player.frameY = 4;
    this.player.maxframe = 1;
  }
  handleInput(input, colisiontimer) {
    if (colisiontimer > 500) {
      this.player.setState(states.idle_right);
    }
  }
}

export class DIzzyLeft extends State {
  constructor(player) {
    super("DIzzy Left");
    this.player = player;
    this.move = false;
  }
  enter() {
    this.player.frameY = 14;
    this.player.maxframe = 1;
  }
  handleInput(input, colisiontimer) {
    if (colisiontimer > 500) {
      this.player.setState(states.idle_left);
    }
  }
}

export class DieRight extends State {
  constructor(player) {
    super("Die Right");
    this.player = player;
  }
  enter() {
    this.player.frameY = 9;
    this.player.maxframe = 5;
  }
  handleInput(input) {
    this.player.velocityY -= 0.4;
    gameSwitchOptions.push("stop");
  }
}
export class DieLeft extends State {
  constructor(player) {
    super("Die Left");
    this.player = player;
  }
  enter() {
    this.player.frameY = 19;
    this.player.maxframe = 5;
  }
  handleInput(input) {
    this.player.velocityY -= 0.4;
    gameSwitchOptions.push("stop");
  }
}
