import React, { useCallback, useEffect, useRef } from 'react';
import Particle from './js/Particle';
import styles from './index.module.scss';

const FPS = 60;
const INTERVAL = 1000 / FPS;

interface Props {
  x?: number;
  y?: number;
  particleCount?: number;
  deg?: number;
  shapeSize?: number;
  spreadDeg?: number;
  effectInterval?: number;
  effectCount?: number;
  colors?: string[];
  launchSpeed?: number;
}

function Confetti({
  x = 0.5,
  y = 0.5,
  particleCount = 30,
  deg = 270,
  shapeSize = 12,
  spreadDeg = 30,
  effectInterval = 3000,
  effectCount = 1,
  colors = ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'],
  launchSpeed = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef(0);
  const effectCountRef = useRef(0);

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

  const createConfetti = useCallback(() => {
    for (let i = 0; i < particleCount; i += 1) {
      particlesRef.current.push(
        new Particle(
          x,
          y,
          deg,
          colors,
          ['circle', 'square'],
          shapeSize,
          spreadDeg,
          launchSpeed,
        ),
      );
    }
  }, [x, y, deg, colors, shapeSize, spreadDeg, launchSpeed, particleCount]);

  const render = useCallback(() => {
    if (!ctxRef.current) return;

    let now;
    let delta;
    let then = Date.now();
    let effectDelta;
    let effectThen = Date.now() - effectInterval;

    const frame = () => {
      const canvas = canvasRef.current;
      if (!ctxRef.current) return;
      if (!canvas) return;

      animationFrameRef.current = requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      effectDelta = now - effectThen;
      if (delta < INTERVAL) return;

      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

      if (
        effectDelta > effectInterval &&
        effectCountRef.current < effectCount
      ) {
        createConfetti();
        effectThen = now - (effectDelta % effectInterval);
        effectCountRef.current += 1;
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.update();
        p.draw(ctxRef.current);

        const canvasHeight = canvas?.height || 0;
        if (p.opacity <= 0 || p.y > canvasHeight)
          particles.splice(particles.indexOf(p), 1);
      }

      then = now - (delta % INTERVAL);

      if (effectCountRef.current >= effectCount && particles.length === 0) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    animationFrameRef.current = requestAnimationFrame(frame);
  }, [effectInterval, effectCount, createConfetti]);

  useEffect(() => {
    init();
    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [init, render]);

  useEffect(() => {
    effectCountRef.current = 0;
  }, [effectCount]);

  return <canvas className={styles.canvas} ref={canvasRef} />;
}

export default Confetti;
