import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { randomNumBetween } from './libs/utils';
import Particle from './model/Particle';

const FPS = 60;
const INTERVAL = 1000 / FPS;

type Props =
  | {
      mode?: 'boom';
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
  | {
      mode: 'fall';
      particleCount?: number;
      shapeSize?: number;
      colors?: string[];
      fadeOutHeight?: number;
    };

function Confetti(props: Props): ReactElement {
  // common props
  const {
    mode = 'boom',
    particleCount = 30,
    shapeSize = 12,
    colors = ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'],
  } = props;

  // boom or common props
  const {
    x = 0.5,
    y = 0.5,
    deg = 270,
    spreadDeg = 30,
    effectInterval = 3000,
    effectCount = 1,
    launchSpeed = 1,
  } = props.mode === 'boom' || props.mode === undefined
    ? props
    : {
        effectInterval: 1,
        effectCount: Infinity,
      };

  // fall props (default: 80% of the screen height)
  const { fadeOutHeight = 0.8 } = props.mode === 'fall' ? props : {};

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
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }, []);

  const createConfetti = useCallback(() => {
    const isFallMode = mode === 'fall';
    const effectiveCount = isFallMode ? particleCount / 30 : particleCount;
    const effectiveX = isFallMode ? randomNumBetween(0, 1) : x;
    const effectiveY = isFallMode ? randomNumBetween(-0.1, -0.3) : y;
    const effectiveDeg = isFallMode ? 270 : deg;
    const effectiveSpreadDeg = isFallMode ? 0 : spreadDeg;
    const effectiveLaunchSpeed = isFallMode ? 0 : launchSpeed;

    // opacity delta
    const effectiveOpacityDelta = isFallMode
      ? 3.4 / fadeOutHeight / window.innerHeight
      : 0.004;

    for (let i = 0; i < effectiveCount; i += 1) {
      particlesRef.current.push(
        new Particle(
          effectiveX,
          effectiveY,
          effectiveDeg,
          colors,
          ['circle', 'square'],
          shapeSize,
          effectiveSpreadDeg,
          effectiveLaunchSpeed,
          effectiveOpacityDelta,
        ),
      );
    }
  }, [
    mode,
    x,
    y,
    deg,
    colors,
    shapeSize,
    spreadDeg,
    launchSpeed,
    particleCount,
    fadeOutHeight,
  ]);

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
export type { Props as ConfettiProps };
