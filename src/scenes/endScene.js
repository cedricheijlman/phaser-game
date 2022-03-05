import Phaser from "phaser";

export default class endScene extends Phaser.Scene {
  init(data) {
    this.score = data.score;
  }
  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#95a5a6");
    const text = this.add.text(500, 150, "Score: " + this.score);
    text.setOrigin(0.5, 0.5);
    text.setFontSize(40);
    text.setFontFamily('"Press Start 2P"');

    var textEasy = this.add
      .text(0, 0, "Go to homepage")
      .setInteractive()
      .setOrigin(0.5, 3)
      .setFontSize(33);

    var container = this.add.container(500, 400, [textEasy]);
    textEasy.on("pointerup", this.goNext.bind(this));
  }
  goNext() {
    this.scene.start("homeScreen");
  }
}
