import Phaser from "phaser";
import plane from "../assets/plane.png";
import bullet from "../assets/17.png";
import enemySpriteSheet from "../assets/2.jpg";

export default class gameScreen extends Phaser.Scene {
  constructor() {
    super();
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
      .setCollideWorldBounds(true)
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);

    this.enemy = this.physics.add
      .sprite(240, 30, "enemy")
      .setCollideWorldBounds(true)
      .setDisplaySize(45, 45)
      .setVelocityY(150);

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
    this.bullet = this.physics.add
      .image(this.player.x, this.player.y - 30, "bullet")
      .setDisplaySize(30, 50)
      .setBodySize(60, 90)
      .setVelocityY(-330).rotation += -190;
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
