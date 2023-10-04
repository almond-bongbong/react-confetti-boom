declare class Particle {
    x: number;
    y: number;
    width: number;
    height: number;
    theta: number;
    radius: number;
    vx: number;
    vy: number;
    xFriction: number;
    yFriction: number;
    gravity: number;
    opacity: number;
    opacityDelta: number;
    rotate: number;
    widthDelta: number;
    heightDelta: number;
    rotateDelta: number;
    colors: string[];
    color: {
        r: number;
        g: number;
        b: number;
    };
    shapes: readonly ['circle', 'square'];
    shape: string;
    swingOffset: number;
    swingSpeed: number;
    swingAmplitude: number;
    constructor(x: number, y: number, deg: number | undefined, colors: string[], shapes?: readonly ["circle", "square"], shapeSize?: number, spread?: number, launchSpeed?: number, opacityDelta?: number);
    update(): void;
    drawSquare(ctx: CanvasRenderingContext2D): void;
    drawCircle(ctx: CanvasRenderingContext2D): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
export default Particle;
