'use strict';

var React = require('react');

var randomNumBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};
var hexToRgb = function (hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return {
    r: r,
    g: g,
    b: b
  };
};

var Particle = /** @class */function () {
  function Particle(x, y, deg, colors, shapes, shapeSize, spread, launchSpeed, opacityDelta) {
    if (deg === void 0) {
      deg = 0;
    }
    if (shapes === void 0) {
      shapes = ['circle', 'square'];
    }
    if (shapeSize === void 0) {
      shapeSize = 12;
    }
    if (spread === void 0) {
      spread = 30;
    }
    if (launchSpeed === void 0) {
      launchSpeed = 1;
    }
    if (opacityDelta === void 0) {
      opacityDelta = 0.004;
    }
    var DPR = window.devicePixelRatio > 1 ? 2 : 1;
    this.x = x * window.innerWidth * DPR;
    this.y = y * window.innerHeight * DPR;
    this.width = shapeSize;
    this.height = shapeSize;
    this.theta = Math.PI / 180 * randomNumBetween(deg - spread, deg + spread);
    this.radius = randomNumBetween(20 * launchSpeed, 70 * launchSpeed);
    this.vx = this.radius * Math.cos(this.theta);
    this.vy = this.radius * Math.sin(this.theta);
    this.xFriction = 0.9;
    this.yFriction = 0.87;
    this.gravity = randomNumBetween(0.5, 0.6);
    this.opacity = 1;
    this.opacityDelta = opacityDelta;
    this.rotate = randomNumBetween(0, 360);
    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);
    this.rotateDelta = randomNumBetween(-1, 1);
    this.colors = colors;
    this.color = hexToRgb(this.colors[Math.floor(randomNumBetween(0, this.colors.length))]);
    this.shapes = shapes;
    this.shape = this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
    this.swingOffset = randomNumBetween(0, Math.PI * 2);
    this.swingSpeed = Math.random() * 0.05 + 0.01;
    this.swingAmplitude = randomNumBetween(0.1, 0.2);
  }
  Particle.prototype.update = function () {
    this.vx *= this.xFriction;
    this.vy *= this.yFriction;
    this.vy += this.gravity;
    this.vx += Math.sin(this.swingOffset) * this.swingAmplitude;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= this.opacityDelta;
    this.widthDelta += 2;
    this.heightDelta += 2;
    this.rotate += this.rotateDelta;
    this.swingOffset += this.swingSpeed;
  };
  Particle.prototype.drawSquare = function (ctx) {
    ctx.fillRect(this.x, this.y, this.width * Math.cos(Math.PI / 180 * this.widthDelta), this.height * Math.sin(Math.PI / 180 * this.heightDelta));
  };
  Particle.prototype.drawCircle = function (ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, Math.abs(this.width * Math.cos(Math.PI / 180 * this.widthDelta)) / 2, Math.abs(this.height * Math.sin(Math.PI / 180 * this.heightDelta)) / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };
  Particle.prototype.draw = function (ctx) {
    var translateXAlpha = this.width * 1.3;
    var translateYAlpha = this.height * 1.3;
    ctx.translate(this.x + translateXAlpha, this.y + translateYAlpha);
    ctx.rotate(Math.PI / 100 * this.rotate);
    ctx.translate(-(this.x + translateXAlpha), -(this.y + translateYAlpha));
    // eslint-disable-next-line no-param-reassign
    ctx.fillStyle = "rgba(".concat(this.color.r, ", ").concat(this.color.g, ", ").concat(this.color.b, ", ").concat(this.opacity, ")");
    if (this.shape === 'square') this.drawSquare(ctx);
    if (this.shape === 'circle') this.drawCircle(ctx);
    ctx.resetTransform();
  };
  return Particle;
}();

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".index-module_canvas__H2w7d {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n}";
var styles = {"canvas":"index-module_canvas__H2w7d"};
styleInject(css_248z);

var FPS = 60;
var INTERVAL = 1000 / FPS;
function Confetti(props) {
  // common props
  var _a = props.mode,
    mode = _a === void 0 ? 'boom' : _a,
    _b = props.particleCount,
    particleCount = _b === void 0 ? 30 : _b,
    _c = props.shapeSize,
    shapeSize = _c === void 0 ? 12 : _c,
    _d = props.colors,
    colors = _d === void 0 ? ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'] : _d;
  // boom props
  var _e = props.mode === 'boom' ? props : {
      effectInterval: 1,
      effectCount: Infinity
    },
    _f = _e.x,
    x = _f === void 0 ? 0.5 : _f,
    _g = _e.y,
    y = _g === void 0 ? 0.5 : _g,
    _h = _e.deg,
    deg = _h === void 0 ? 270 : _h,
    _j = _e.spreadDeg,
    spreadDeg = _j === void 0 ? 30 : _j,
    _k = _e.effectInterval,
    effectInterval = _k === void 0 ? 3000 : _k,
    _l = _e.effectCount,
    effectCount = _l === void 0 ? 1 : _l,
    _m = _e.launchSpeed,
    launchSpeed = _m === void 0 ? 1 : _m;
  var canvasRef = React.useRef(null);
  var ctxRef = React.useRef();
  var particlesRef = React.useRef([]);
  var animationFrameRef = React.useRef(0);
  var effectCountRef = React.useRef(0);
  var init = React.useCallback(function () {
    var canvas = canvasRef.current;
    var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    if (!canvas || !ctx) return;
    ctxRef.current = ctx;
    var DPR = window.devicePixelRatio > 1 ? 2 : 1;
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    canvas.style.width = "".concat(canvasWidth, "px");
    canvas.style.height = "".concat(canvasHeight, "px");
    canvas.width = canvasWidth * DPR;
    canvas.height = canvasHeight * DPR;
    ctx.scale(DPR, DPR);
  }, []);
  var createConfetti = React.useCallback(function () {
    var isFallMode = mode === 'fall';
    var effectiveCount = isFallMode ? particleCount / 30 : particleCount;
    var effectiveX = isFallMode ? randomNumBetween(0, 1) : x;
    var effectiveY = isFallMode ? randomNumBetween(-0.1, -0.3) : y;
    var effectiveDeg = isFallMode ? 270 : deg;
    var effectiveSpreadDeg = isFallMode ? 0 : spreadDeg;
    var effectiveLaunchSpeed = isFallMode ? 0 : launchSpeed;
    var effectiveOpacityDelta = isFallMode ? 5 / window.innerHeight : 0.004;
    for (var i = 0; i < effectiveCount; i += 1) {
      particlesRef.current.push(new Particle(effectiveX, effectiveY, effectiveDeg, colors, ['circle', 'square'], shapeSize, effectiveSpreadDeg, effectiveLaunchSpeed, effectiveOpacityDelta));
    }
  }, [mode, x, y, deg, colors, shapeSize, spreadDeg, launchSpeed, particleCount]);
  var render = React.useCallback(function () {
    if (!ctxRef.current) return;
    var now;
    var delta;
    var then = Date.now();
    var effectDelta;
    var effectThen = Date.now() - effectInterval;
    var frame = function () {
      var canvas = canvasRef.current;
      if (!ctxRef.current) return;
      if (!canvas) return;
      animationFrameRef.current = requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      effectDelta = now - effectThen;
      if (delta < INTERVAL) return;
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      if (effectDelta > effectInterval && effectCountRef.current < effectCount) {
        createConfetti();
        effectThen = now - effectDelta % effectInterval;
        effectCountRef.current += 1;
      }
      var particles = particlesRef.current;
      for (var i = particles.length - 1; i >= 0; i -= 1) {
        var p = particles[i];
        p.update();
        p.draw(ctxRef.current);
        var canvasHeight = (canvas === null || canvas === void 0 ? void 0 : canvas.height) || 0;
        if (p.opacity <= 0 || p.y > canvasHeight) particles.splice(particles.indexOf(p), 1);
      }
      then = now - delta % INTERVAL;
      if (effectCountRef.current >= effectCount && particles.length === 0) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    animationFrameRef.current = requestAnimationFrame(frame);
  }, [effectInterval, effectCount, createConfetti]);
  React.useEffect(function () {
    init();
    render();
    return function () {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [init, render]);
  React.useEffect(function () {
    effectCountRef.current = 0;
  }, [effectCount]);
  return React.createElement("canvas", {
    className: styles.canvas,
    ref: canvasRef
  });
}

module.exports = Confetti;
//# sourceMappingURL=index.js.map
