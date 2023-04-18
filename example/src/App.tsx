import { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti-boom';
import * as dat from 'dat.gui';
import './style.css';

const DEFAULT_OPTIONS = {
  deg: 270,
  particleCount: 30,
  effectCount: Infinity,
  effectInterval: 3000,
  shapeSize: 12,
  spreadDeg: 30,
  x: 0.5,
  y: 0.5,
  colors: ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'],
  launchSpeed: 1,
};

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const handleChangeOption = useCallback((key: string, value: number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleColors = useCallback((index: number, value: string) => {
    setOptions((prev) => {
      const newColors = [...prev.colors];
      newColors[index] = value;
      return { ...prev, colors: newColors };
    });
  }, []);

  useEffect(() => {
    const target = { ...DEFAULT_OPTIONS };
    const gui = new dat.GUI();
    gui.width = 300;
    const confetti = gui.addFolder('Confetti');
    confetti.open();
    confetti
      .add(target, 'particleCount', 0, 500)
      .onChange((v) => handleChangeOption('particleCount', v));
    confetti
      .add(target, 'deg', 0, 360)
      .onChange((v) => handleChangeOption('deg', v));
    confetti
      .add(target, 'effectCount', 1, 100)
      .onChange((v) => handleChangeOption('effectCount', v));
    confetti
      .add(target, 'effectInterval', 1, 10000)
      .name('effectInterval (ms)')
      .onChange((v) => handleChangeOption('effectInterval', v));
    confetti
      .add(target, 'shapeSize', 1, 50)
      .onChange((v) => handleChangeOption('shapeSize', v));
    confetti
      .add(target, 'spreadDeg', 0, 100)
      .onChange((v) => handleChangeOption('spreadDeg', v));
    confetti.add(target, 'x', 0, 1).onChange((v) => handleChangeOption('x', v));
    confetti.add(target, 'y', 0, 1).onChange((v) => handleChangeOption('y', v));
    confetti
      .add(target, 'launchSpeed', 0, 3)
      .onChange((v) => handleChangeOption('launchSpeed', v));

    const colors = gui.addFolder('Colors');
    colors.open();

    DEFAULT_OPTIONS.colors.forEach((color, i) => {
      colors
        .addColor(target.colors, i.toString())
        .onChange((v) => handleColors(i, v));
    });

    return () => {
      gui.destroy();
    };
  }, [handleChangeOption, handleColors]);

  return (
    <div className="app">
      <Confetti
        particleCount={options.particleCount}
        deg={options.deg}
        effectCount={options.effectCount}
        effectInterval={options.effectInterval}
        shapeSize={options.shapeSize}
        spreadDeg={options.spreadDeg}
        x={options.x}
        y={options.y}
        colors={options.colors}
        launchSpeed={options.launchSpeed}
      />
    </div>
  );
}

export default App;
