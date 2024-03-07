export function loadImage(url) {
  return new Promise((resolve) => {
    let image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
export function loadLevel(name) {
  return fetch(`/levels/${name}.json`).then((r) => r.json());
}
