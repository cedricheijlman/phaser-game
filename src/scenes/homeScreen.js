import Phaser from "phaser";

export default class homeScreen extends Phaser.Scene {
  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#95a5a6");
    const text = this.add.text(500, 150, "Game Title");
    text.setOrigin(0.5, 0.5);
    text.setFontSize(40);
    text.setFontFamily('"Press Start 2P"');

    var textEasy = this.add
      .text(0, 0, "Play")
      .setInteractive()
      .setOrigin(0.5, 3)
      .setFontSize(33);

    var container = this.add.container(500, 400, [textEasy]);

    textEasy.on("pointerup", this.goNext.bind(this));
  }
  goNext() {
    this.scene.start("gameScreen");
  }
}
