import Phaser from "phaser";
import plane from "../assets/plane.png";
import bullet from "../assets/17.png";
import enemySpriteSheet from "../assets/2.jpg";

class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet").setDisplaySize(30, 30);
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);
    this.setDisplaySize(30, 50);
    this.setBodySize(60, 90);
    this.setVelocityY(-230).rotation += -190;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Laser,
      frameQuantity: 10,
      active: false,
      visible: false,
      key: "bullet",
    });
  }

  fireLaser(x, y) {
    const laser = this.getFirstDead();

    if (laser) {
      laser.fire(x, y);
    }
  }
}

export default class gameScreen extends Phaser.Scene {
  constructor() {
    super();
    this.player;
    this.laserGroup;
  }

  preload() {
    this.load.image("plane", plane);
    this.load.image("bullet", bullet);
    this.load.spritesheet("enemy", enemySpriteSheet, {
      frameWidth: 230,
      frameHeight: 270,
    });
  }

  create() {
    this.player = this.physics.add.sprite(500, 700, "plane");
    this.player
      .setBodySize(500, 420)
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);

    this.enemy = this.physics.add
      .sprite(240, 30, "enemy")
      .setCollideWorldBounds(true)
      .setDisplaySize(45, 45)
      .setVelocityY(150);

    this.laserGroup = new LaserGroup(this);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1,
    });

    this.enemy.play("walk");

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keyup", (e) => {
      if (e.key == "ArrowUp") {
        this.shootBullet();
      }
    });
  }

  shootBullet() {
    this.laserGroup.fireLaser(this.player.x, this.player.y - 20);
  }

  update() {
    this.player.setVelocity(0, 0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(400);
    }
  }
}
