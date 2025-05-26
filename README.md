# React Confetti Boom 🎉 - Celebrate With Style!

> 🚀 Bring Joy and Celebration to Your React App! Dive into a world of vibrant animations with React Confetti Boom, the ultimate confetti component for React developers.

![NPM](https://img.shields.io/npm/v/react-confetti-boom.svg)
![NPM Downloads](https://img.shields.io/npm/dt/react-confetti-boom.svg)
![License](https://img.shields.io/npm/l/react-confetti-boom)
![Size](https://img.shields.io/bundlephobia/min/react-confetti-boom)

| ![boom](https://github.com/almond-bongbong/react-confetti-boom/raw/main/docs/preview_boom.gif) | ![fall](https://github.com/almond-bongbong/react-confetti-boom/raw/main/docs/preview_fall.gif) |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |

## 🌈 Why React Confetti Boom?

React Confetti Boom offers a lightweight, flexible, and easy-to-use solution to add a touch of celebration to your application. Whether it's celebrating a user achievement, a special event, or adding fun interactions, our confetti animation component will bring your React application to life.

## 🎨 Key Features

- **Two Animation Modes**: Choose between 'boom' for an explosive celebration or 'fall' for a gentle rain of joy.
- **Highly Customizable**: Control every aspect of the confetti, from count to colors, to perfectly match your app's theme.
- **Performance Optimized**: Designed for efficiency, it adds a magical touch without compromising your app's performance.

## 💻 Quick Start

```bash
npm install react-confetti-boom
```

## 🛠 How to Use

Just a few lines to create an unforgettable moment:

```jsx
import Confetti from 'react-confetti-boom';

function MyApp() {
  return <Confetti />;
}
```

## 🌍 Live Demo

Experience the magic firsthand and customize the confetti to your liking: [Live Demo](https://almond-bongbong.github.io/react-confetti-boom/)

## 🔧 Props Guide

Fine-tune the celebration with our comprehensive props:

- **mode**: 'boom' or 'fall' - the style of your celebration.
- **colors**: Array of hex values to paint your confetti.
- **particleCount**: How much confetti to burst into the scene.

| Name                   | Type             | Default                                      | Description                                                                                 |
| ---------------------- | ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| mode                   | 'boom' \| 'fall' | 'boom'                                       | Mode for confetti animation. 'boom' for explosion-like, 'fall' for rain-like effect         |
| x                      | number           | 0.5                                          | Horizontal starting position of confetti as a ratio of canvas width (0 to 1)                |
| y                      | number           | 0.5                                          | Vertical starting position of confetti as a ratio of canvas height (0 to 1)                 |
| particleCount          | number           | 30                                           | Number of confetti particles to generate                                                    |
| deg                    | number           | 270                                          | Initial angle (in degrees) at which particles are emitted                                   |
| shapeSize              | number           | 12                                           | Size of confetti particles                                                                  |
| spreadDeg              | number           | 30                                           | Angle (in degrees) that particles can deviate from the initial angle (deg)                  |
| effectInterval         | number           | 3000                                         | Interval (in ms) between consecutive confetti bursts                                        |
| effectCount            | number           | 1                                            | Number of confetti bursts to render                                                         |
| colors                 | string[]         | ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'] | Array of colors for confetti particles, in hex format                                       |
| launchSpeed            | number           | 1                                            | Initial speed at which particles are launched                                               |
| fadeOutHeight          | number           | 0.8                                          | Height ratio (0 to 1) where particles completely disappear in 'fall' mode (added in v1.1.0) |
| opacityDeltaMultiplier | number           | 1                                            | Multiplier for particle opacity fade speed in 'boom' mode (added in v2.0.0)                 |

## 🎉 Example Usage

```jsx
<Confetti mode="boom" particleCount={50} colors={['#ff577f', '#ff884b']} />
```

Celebrate achievements with a burst of color!

## ⭐ Support React Confetti Boom

Loving React Confetti Boom? Here's how you can help us make the project even better!

- **Give it a star**: If you find React Confetti Boom useful, consider giving it a star on GitHub. Your star is more than just a kudos—it's a huge boost of motivation for us, and it helps more developers discover our project.
- **Spread the word**: Share React Confetti Boom with your friends and colleagues. The more, the merrier!
- **Join the community**: Feedback, ideas, or looking to contribute? Join us on GitHub and let's make React Confetti Boom even more awesome together.

Let's celebrate coding, one confetti burst at a time! 🎉

## 📜 License

Proudly open-sourced under the MIT License.
