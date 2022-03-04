import Phaser from "phaser";
import plane from "../assets/plane.png";
import bullet from "../assets/17.png";
import ship from "../assets/2.jpg";

export default class gameScreen extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("plane", plane);
    this.load.image("bullet", bullet);
    this.load.spritesheet("ship", ship, {
      frameWidth: 240,
      frameHeight: 270,
    });
  }

  create() {
    this.player = this.physics.add.sprite(500, 700, "plane");
    this.player
      .setCollideWorldBounds(true)
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);

    this.enemy = this.physics.add
      .sprite(240, 30, "ship")
      .setDisplaySize(45, 45)
      .setVelocityY(150);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("ship", { start: 0, end: 2 }),
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

    function test() {
      console.log("yest");
    }

    this.physics.add.overlap(this.player, this.enemy, test, null, this);
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
