import { randomNumBetween, hexToRgb } from './utils';

class Particle {
  x: number;
  y: number;
  width: number;
  height: number;
  theta: number;
  radius: number;
  vx: number;
  vy: number;
  friction: number;
  gravity: number;
  opacity: number;
  rotate: number;
  widthDelta: number;
  heightDelta: number;
  rotateDelta: number;
  colors: string[];
  color: { r: number; g: number; b: number };
  shapes: readonly ['circle', 'square'];
  shape: string;
  swingOffset: number;
  swingSpeed: number;
  swingAmplitude: number;

  constructor(
    x: number,
    y: number,
    deg = 0,
    colors: string[],
    shapes = ['circle', 'square'] as const,
    shapeSize = 12,
    spread = 30,
    launchSpeed = 1,
  ) {
    const DPR = window.devicePixelRatio > 1 ? 2 : 1;
    this.x = x * window.innerWidth * DPR;
    this.y = y * window.innerHeight * DPR;
    this.width = shapeSize;
    this.height = shapeSize;
    this.theta = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread);
    this.radius = randomNumBetween(20 * launchSpeed, 70 * launchSpeed);
    this.vx = this.radius * Math.cos(this.theta);
    this.vy = this.radius * Math.sin(this.theta);
    this.friction = 0.87;
    this.gravity = 0.55;
    this.opacity = 1;
    this.rotate = randomNumBetween(0, 360);
    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);
    this.rotateDelta = randomNumBetween(-1, 1);
    this.colors = colors;
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length))],
    );
    this.shapes = shapes;
    this.shape =
      this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
    this.swingOffset = randomNumBetween(0, Math.PI * 2);
    this.swingSpeed = Math.random() * 0.05 + 0.01;
    this.swingAmplitude = randomNumBetween(0, 0.4);
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    if (this.vy > 0)
      this.vx += Math.sin(this.swingOffset) * this.swingAmplitude;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.004;
    this.widthDelta += 2;
    this.heightDelta += 2;
    this.rotate += this.rotateDelta;
    this.swingOffset += this.swingSpeed;
  }

  drawSquare(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta),
    );
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2,
      Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2,
      0,
      0,
      2 * Math.PI,
    );
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx: CanvasRenderingContext2D) {
    const translateXAlpha = this.width * 1.3;
    const translateYAlpha = this.height * 1.3;
    ctx.translate(this.x + translateXAlpha, this.y + translateYAlpha);
    ctx.rotate((Math.PI / 180) * this.rotate);
    ctx.translate(-(this.x + translateXAlpha), -(this.y + translateYAlpha));
    // eslint-disable-next-line no-param-reassign
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

    if (this.shape === 'square') this.drawSquare(ctx);
    if (this.shape === 'circle') this.drawCircle(ctx);

    ctx.resetTransform();
  }
}

export default Particle;
