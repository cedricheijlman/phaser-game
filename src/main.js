import Phaser from "phaser";
import homeScreen from "./scenes/homeScreen";
import gameScreen from "./scenes/gameScreen";
import endScene from "./scenes/endScene";

const config = {
  width: 1000,
  height: 800,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("homeScreen", homeScreen);

game.scene.add("gameScreen", gameScreen);
game.scene.add("endScene", endScene);

// game.scene.start("homeScreen");

game.scene.start("homeScreen");
