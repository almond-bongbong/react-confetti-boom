# React Confetti Boom

React Confetti Boom is a lightweight, customizable confetti animation component for React applications. Add a fun and engaging confetti effect to your app with just a few lines of code.

## Installation

```bash
npm install react-confetti-boom
```

## Usage

Import the Confetti component and add it to your JSX.

```jsx
import React from 'react';
import Confetti from 'react-confetti-boom';

function MyApp() {
  return (
    <div>
      <h1>My React App</h1>
      <Confetti />
    </div>
  );
}

export default MyApp;
```

## Props

| Name           | Type     | Default                                      | Description                                                                  |
| -------------- | -------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| x              | number   | 0.5                                          | Horizontal starting position of confetti as a ratio of canvas width (0 to 1) |
| y              | number   | 0.5                                          | Vertical starting position of confetti as a ratio of canvas height (0 to 1)  |
| particleCount  | number   | 30                                           | Number of confetti particles to generate                                     |
| deg            | number   | 270                                          | Initial angle (in degrees) at which particles are emitted                    |
| shapeSize      | number   | 12                                           | Size of confetti particles                                                   |
| spreadDeg      | number   | 30                                           | Angle (in degrees) that particles can deviate from the initial angle (deg)   |
| effectInterval | number   | 3000                                         | Interval (in ms) between consecutive confetti bursts                         |
| effectCount    | number   | 1                                            | Number of confetti bursts to render                                          |
| colors         | string[] | ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'] | Array of colors for confetti particles, in hex format                        |

## Example

```jsx
import React from 'react';
import Confetti from 'react-confetti-boom';

function Celebration() {
  return (
    <div>
      <h1>Congratulations!</h1>
      <Confetti
        x={0.5}
        y={0.1}
        particleCount={50}
        deg={270}
        shapeSize={8}
        spreadDeg={45}
        effectInterval={2000}
        effectCount={3}
        colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#3498db']}
      />
    </div>
  );
}

export default Celebration;
```

This example will render a confetti animation with 50 particles starting at 10% from the top of the canvas. The particles will be emitted at a 270-degree angle, with a 45-degree spread. The confetti bursts will occur every 2 seconds, for a total of 3 bursts. The confetti particles will use the provided array of colors.

## License

MIT