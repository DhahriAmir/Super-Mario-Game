function createImage(imgSrc) {
  const img = new Image();
  img.src = imgSrc;
  return img;
}
console.log(createImage("../sprites/background.png"));
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    context.fillStyle = "red";
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    context.fillStyle = "red";
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
let player;
let platforms = [];
let GenericObjects = [];
let keys = {};
let scrollOffset = 0;
let platformImg;
let platformSmallTallImg;
let spriteRunLeft;
let spriteRunRight;
let spriteStandLeft;
let spriteStandRight;
let playerImg;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 10;
    this.width = 66;
    this.height = 150;
    this.frames = 0;
    this.sprites = {
      stand: {
        right: spriteStandRight,
        left: spriteStandLeft,
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: spriteRunRight,
        left: spriteRunLeft,
        cropWidth: 340,
        width: 127.875,
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = this.sprites.stand.cropWidth;
  }
  draw() {
    context.fillStyle = "red";
    context.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.frames++;
    if (
      this.frames > 59 &&
      (this.currentSprite == this.sprites.stand.right ||
        this.currentSprite == this.sprites.stand.left)
    ) {
      this.frames = 0;
    }
    if (
      this.frames > 29 &&
      (this.currentSprite == this.sprites.run.right ||
        this.currentSprite == this.sprites.run.left)
    ) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}
let winWindow;
function init() {
  platformImg = createImage("../sprites/platform.png");
  platformSmallTallImg = createImage("../sprites/platformSmallTall.png");
  spriteRunLeft = createImage("../sprites/spriteRunLeft.png");
  spriteRunRight = createImage("../sprites/spriteRunRight.png");
  spriteStandLeft = createImage("../sprites/spriteStandLeft.png");
  spriteStandRight = createImage("../sprites/spriteStandRight.png");
  player = new Player();
  winWindow = document.getElementsByClassName("win-window")[0];
  winWindow.classList.remove("visible");
  winWindow.classList.add("hidden");
  platforms = [
    new Platform({
      x: platformImg.width * 5 + 600,
      y: 470 - platformSmallTallImg.height,
      image: platformSmallTallImg,
    }),
    new Platform({
      x: platformImg.width * 5 + 800,
      y: 470 - 2 * platformSmallTallImg.height,
      image: platformSmallTallImg,
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImg,
    }),
    new Platform({
      x: platformImg.width - 3,
      y: 470,
      image: platformImg,
    }),
    new Platform({
      x: platformImg.width * 2 + 100,
      y: 470,
      image: platformImg,
    }),
    new Platform({
      x: platformImg.width * 3 + 300,
      y: 470,
      image: platformImg,
    }),
    new Platform({
      x: platformImg.width * 4 + 600,
      y: 470,
      image: platformImg,
    }),
  ];
  GenericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage("../sprites/background.png"),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage("../sprites/hills.png"),
    }),
  ];
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
  scrollOffset = 0;
}
function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  GenericObjects.forEach((genericObject) => {
    genericObject.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();
  if (keys.right.pressed && player.position.x < 400)
    player.velocity.x = player.speed;
  else if (keys.left.pressed && player.position.x > 100)
    player.velocity.x = -player.speed;
  else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      GenericObjects.forEach(
        (genericObject) => (genericObject.position.x -= player.speed * 0.66)
      );
      platforms.forEach((platform) => {
        scrollOffset += player.speed;
        platform.position.x -= player.speed;
      });
    } else if (keys.left.pressed) {
      GenericObjects.forEach(
        (genericObject) => (genericObject.position.x += player.speed * 0.66)
      );

      platforms.forEach((platform) => {
        scrollOffset -= player.speed;
        platform.position.x += player.speed;
      });
    }
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    )
      player.velocity.y = 0;
  });
  //   win condition
  if (scrollOffset > 24000) {
    winWindow.classList.add("visible");
    winWindow.classList.remove("hidden");
  }
  //   lose condition
  if (player.position.y > canvas.height) init();
}
init();
animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 90:
      player.velocity.y = -15;
      break;
    case 68:
      keys.right.pressed = true;
      player.currentSprite = player.sprites.run.right;
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;
    case 83:
      //player.velocity.y += 20;
      break;
    case 81:
      keys.left.pressed = true;
      player.currentSprite = player.sprites.run.left;
      player.currentCropWidth = player.sprites.run.cropWidth;
      player.width = player.sprites.run.width;
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 90:
      player.velocity.up = 0;
      break;
    case 68:
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;
      break;
    case 83:
      break;
    case 81:
      player.currentSprite = player.sprites.stand.left;
      player.currentCropWidth = player.sprites.stand.cropWidth;
      player.width = player.sprites.stand.width;
      keys.left.pressed = false;
      break;
  }
});
module.exports = createImage