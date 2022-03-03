import Phaser from "phaser";
import plane from "../assets/plane.png";
import bullet from "../assets/17.png";

export default class gameScreen extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("plane", plane);
    this.load.image("bullet", bullet);
  }

  create() {
    this.player = this.physics.add.sprite(500, 700, "plane");
    this.player
      .setCollideWorldBounds(true)
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);

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
      .setDisplaySize(60, 60)
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
