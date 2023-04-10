import React, { useCallback, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import Particle from './js/Particle';

const FPS = 60;
const INTERVAL = 1000 / FPS;

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particles: Particle[] = [];
  const animationFrameRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    ctxRef.current = ctx;
    const DPR = window.devicePixelRatio > 1 ? 2 : 1;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.width = canvasWidth * DPR;
    canvas.height = canvasHeight * DPR;
    ctx.scale(DPR, DPR);
  }, []);

  const createConfetti = useCallback(
    (options: {
      x: number;
      y: number;
      count: number;
      deg?: number;
      colors?: string[];
      shapes?: ('circle' | 'square')[];
      spread?: number;
    }) => {
      for (let i = 0; i < options.count; i++) {
        particles.push(
          new Particle(
            options.x,
            options.y,
            options.deg,
            options.colors,
            options.shapes,
            options.spread,
          ),
        );
      }
    },
    [],
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!ctxRef.current || !canvas) return;

    let now;
    let delta;
    let then = Date.now();

    const frame = () => {
      if (!ctxRef.current) return;

      animationFrameRef.current = requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < INTERVAL) return;

      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

      createConfetti({
        x: 0, // 0 ~ 1
        y: 0.5, // 0 ~ 1
        count: 10,
        deg: -50,
      });
      createConfetti({
        x: 1, // 0 ~ 1
        y: 0.5, // 0 ~ 1
        count: 10,
        deg: 230,
      });

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctxRef.current);
        if (p.opacity <= 0) particles.splice(particles.indexOf(p), 1);
        if (p.y > window.innerHeight) particles.splice(particles.indexOf(p), 1);
      }

      then = now - (delta % INTERVAL);
    };

    animationFrameRef.current = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    init();
    render();

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return <canvas className={styles.canvas} ref={canvasRef} />;
}

export { Confetti };
