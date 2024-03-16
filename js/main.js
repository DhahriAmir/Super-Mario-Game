function createImage(imgSrc) {
  const img = new Image();
  img.src = imgSrc;
  return img;
}
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

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

    this.width = 30;
    this.height = 30;
  }
  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

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
let player = new Player();
let platforms = [
  new Platform({
    x: -1,
    y: 470,
    image: createImage("../sprites/platform.png"),
  }),
  new Platform({
    x: createImage("../sprites/platform.png").width - 3,
    y: 470,
    image: createImage("../sprites/platform.png"),
  }),
  new Platform({
    x: createImage("../sprites/platform.png").width * 2 + 100,
    y: 470,
    image: createImage("../sprites/platform.png"),
  }),
];
let GenericObjects = [
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
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let scrollOffset = 0;
function init() {
  player = new Player();
  platforms = [
    new Platform({
      x: -1,
      y: 470,
      image: createImage("../sprites/platform.png"),
    }),
    new Platform({
      x: createImage("../sprites/platform.png").width - 3,
      y: 470,
      image: createImage("../sprites/platform.png"),
    }),
    new Platform({
      x: createImage("../sprites/platform.png").width * 2 + 100,
      y: 470,
      image: createImage("../sprites/platform.png"),
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
  if (keys.right.pressed && player.position.x < 400) player.velocity.x = 5;
  else if (keys.left.pressed && player.position.x > 100) player.velocity.x = -5;
  else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      GenericObjects.forEach(
        (genericObject) => (genericObject.position.x -= 3)
      );

      platforms.forEach((platform) => {
        scrollOffset += 5;
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      GenericObjects.forEach(
        (genericObject) => (genericObject.position.x += 3)
      );

      platforms.forEach((platform) => {
        scrollOffset -= 5;
        platform.position.x += 5;
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
  if (scrollOffset > 2000) {
    console.log("You win !!!!");
  }
  //   lose condition
  if (player.position.y > canvas.height) init();
}
animate();

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 90:
      player.velocity.y = -20;
      break;
    case 68:
      keys.right.pressed = true;
      break;
    case 83:
      //player.velocity.y += 20;
      break;
    case 81:
      keys.left.pressed = true;
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
      break;
    case 83:
      break;
    case 81:
      keys.left.pressed = false;
      break;
  }
});
