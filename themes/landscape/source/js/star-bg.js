// 星空动画背景
// 参考 https://codepen.io/P3R0/pen/pyBNzX
var canvas = document.createElement('canvas');
canvas.id = 'star-canvas';
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-2';
document.getElementById('banner').appendChild(canvas);

var ctx = canvas.getContext('2d');
var w, h;
function resize() {
  w = canvas.width = document.getElementById('banner').offsetWidth;
  h = canvas.height = document.getElementById('banner').offsetHeight;
}
window.addEventListener('resize', resize);
resize();

var numStars = 120;
var stars = [];
for (var i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.5,
    d: Math.random() * 0.5 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = '#fff';
  for (var i = 0; i < numStars; i++) {
    var s = stars[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

function animate() {
  for (var i = 0; i < numStars; i++) {
    var s = stars[i];
    s.x += Math.sin(i) * 0.05;
    s.y += s.d;
    if (s.y > h) {
      s.x = Math.random() * w;
      s.y = 0;
    }
  }
  draw();
  requestAnimationFrame(animate);
}
animate();
