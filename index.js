let spr;

window.setup = () => {
  createCanvas(windowWidth, windowHeight);
  spr = createSprite(width / 2, height / 2, 40, 40);
  spr.shapeColor = color(255);
};

window.draw = () => {
  background(50);
  spr.position.x = mouseX;
  spr.position.y = mouseY;
  drawSprites();
};
