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
      disableBody: false,
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
    this.score = 0;
    this.scoreText;
    this.enemiesAlive = 10;
    this.round = 0;
    this.speed = 10;

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    this.speedText = this.add.text(16, 50, "speed: " + this.speed, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    this.player = this.physics.add.sprite(500, 700, "plane");
    this.player
      .setBodySize(500, 420)
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5)
      .setCollideWorldBounds(true);

    this.enemyGrunts = this.physics.add.group({
      key: "enemy",
      repeat: this.enemiesAlive - 1 + this.round,
      setXY: { x: 180, y: 0, stepX: 60 },
    });

    this.laserGroup = new LaserGroup(this);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1,
    });

    this.enemyGrunts.children.iterate((child) => {
      child.setVelocityY(this.speed).setDisplaySize(35, 35).play("walk");
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keyup", (e) => {
      if (e.key == "ArrowUp") {
        this.shootBullet();
      }
    });

    function hit(e, shot) {
      console.log("biem");
      this.score += 1;
      this.enemiesAlive--;
      this.speed += 1;

      this.scoreText.setText("Score: " + this.score);

      return shot.disableBody(true, true);
    }

    function endGame() {
      this.scene.start("homeScreen");
    }

    this.physics.add.overlap(
      this.laserGroup,
      this.enemyGrunts,
      hit,
      null,
      this
    );

    this.rect = this.add.rectangle(
      this.player.x,
      this.player.y + 110,
      1000,
      30,
      0xff0000
    );

    this.physics.add.existing(this.rect);

    this.physics.add.overlap(this.enemyGrunts, this.rect, endGame, null, this);
    this.physics.add.overlap(
      this.enemyGrunts,
      this.player,
      endGame,
      null,
      this
    );
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
    console.log(this.enemiesAlive);

    if (this.enemiesAlive == 0) {
      this.enemiesAlive = 10;
      this.speedText.setText("speed: " + this.speed);
      this.enemyGrunts.children.iterate((child) => {
        child
          .enableBody(true, child.x, 0, true, true)
          .setVelocityY(this.speed)
          .setDisplaySize(30, 30);
      });
    }
  }
}
