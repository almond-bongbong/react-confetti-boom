'use strict';

var React = require('react');

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

var css_248z = ".index-module_canvas__H2w7d {\n  pointer-events: none;\n}";
var styles = {"canvas":"index-module_canvas__H2w7d"};
styleInject(css_248z);

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
  function Particle(x, y, deg, colors, shapes, spread) {
    if (deg === void 0) {
      deg = 0;
    }
    if (colors === void 0) {
      colors = ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'];
    }
    if (shapes === void 0) {
      shapes = ['circle', 'square'];
    }
    if (spread === void 0) {
      spread = 30;
    }
    this.x = x * window.innerWidth;
    this.y = y * window.innerHeight;
    this.width = 12;
    this.height = 12;
    this.theta = Math.PI / 180 * randomNumBetween(deg - spread, deg + spread);
    this.radius = randomNumBetween(30, 100);
    this.vx = this.radius * Math.cos(this.theta);
    this.vy = this.radius * Math.sin(this.theta);
    this.friction = 0.89;
    this.gravity = 0.5;
    this.opacity = 1;
    this.rotate = randomNumBetween(0, 360);
    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);
    this.rotateDelta = randomNumBetween(-1, 1);
    this.colors = colors;
    this.color = hexToRgb(this.colors[Math.floor(randomNumBetween(0, this.colors.length))]);
    this.shapes = shapes;
    this.shape = this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
  }
  Particle.prototype.update = function () {
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.005;
    this.widthDelta += 2;
    this.heightDelta += 2;
    this.rotate += this.rotateDelta;
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
    ctx.rotate(Math.PI / 180 * this.rotate);
    ctx.translate(-(this.x + translateXAlpha), -(this.y + translateYAlpha));
    ctx.fillStyle = "rgba(".concat(this.color.r, ", ").concat(this.color.g, ", ").concat(this.color.b, ", ").concat(this.opacity, ")");
    if (this.shape === 'square') this.drawSquare(ctx);
    if (this.shape === 'circle') this.drawCircle(ctx);
    ctx.resetTransform();
  };
  return Particle;
}();

var FPS = 60;
var INTERVAL = 1000 / FPS;
function Confetti() {
  var canvasRef = React.useRef(null);
  var ctxRef = React.useRef(null);
  var particles = [];
  var animationFrameRef = React.useRef(0);
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
  var createConfetti = React.useCallback(function (options) {
    for (var i = 0; i < options.count; i++) {
      particles.push(new Particle(options.x, options.y, options.deg, options.colors, options.shapes, options.spread));
    }
  }, []);
  var render = React.useCallback(function () {
    if (!ctxRef.current) return;
    var now;
    var delta;
    var then = Date.now();
    var frame = function () {
      if (!ctxRef.current) return;
      animationFrameRef.current = requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < INTERVAL) return;
      ctxRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
      createConfetti({
        x: 0,
        y: 0.5,
        count: 10,
        deg: -50
      });
      createConfetti({
        x: 1,
        y: 0.5,
        count: 10,
        deg: 230
      });
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.update();
        p.draw(ctxRef.current);
        if (p.opacity <= 0) particles.splice(particles.indexOf(p), 1);
        if (p.y > window.innerHeight) particles.splice(particles.indexOf(p), 1);
      }
      then = now - delta % INTERVAL;
    };
    animationFrameRef.current = requestAnimationFrame(frame);
  }, []);
  React.useEffect(function () {
    init();
    render();
    return function () {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  return React.createElement("canvas", {
    className: styles.canvas,
    ref: canvasRef
  });
}

exports.Confetti = Confetti;
//# sourceMappingURL=index.js.map
