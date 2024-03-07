import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";
let canvas = document.getElementById("screen");
let context = canvas.getContext("2d");
function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, x3, x4]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = x3; y < x4; y++) {
        sprites.drawTile(background["tile"], context, x, y);
      }
    }
  });
}
loadImage("/img/tiles.jpg").then((image) => {
  let sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0);
  sprites.define("sky", 3, 23);
  loadLevel("1-1").then((level) => {
    level["backgrounds"].forEach((background) => {
      drawBackground(background, context, sprites);
    });
  });

  for (let x = 0; x < 25; x++) {
    for (let y = 12; y < 14; y++) {
      sprites.drawTile("ground", context, x, y);
    }
  }
});
