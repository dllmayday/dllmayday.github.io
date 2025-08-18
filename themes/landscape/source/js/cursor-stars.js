// 鼠标移动彩色星星动画
(function(){
  var colors = ['#ff5252','#ffb142','#fffa65','#32ff7e','#18dcff','#7d5fff','#e84393','#f3a683','#f7d794','#778beb','#e77f67','#cf6a87'];
  function createStar(x, y) {
    var star = document.createElement('div');
    var size = Math.random() * 4 + 4;
    star.style.position = 'fixed';
    star.style.left = (x - size/2) + 'px';
    star.style.top = (y - size/2) + 'px';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = 9999;
    star.style.borderRadius = '50%';
    star.style.background = colors[Math.floor(Math.random()*colors.length)];
    star.style.boxShadow = '0 0 8px 2px ' + star.style.background;
    star.style.opacity = 1;
    document.body.appendChild(star);
    var dist = Math.random() * 80 + 60;
    var angle = Math.random() * Math.PI * 2;
    var dx = Math.cos(angle) * 10;
    var dy = dist;
    var start = null;
    function animate(ts) {
      if (!start) start = ts;
      var progress = (ts - start) / 600;
      if (progress > 1) progress = 1;
      star.style.transform = 'translate(' + (dx * progress) + 'px, ' + (dy * progress) + 'px) scale(' + (1 - progress*0.5) + ')';
      star.style.opacity = 1 - progress;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        star.remove();
      }
    }
    requestAnimationFrame(animate);
  }
  document.addEventListener('mousemove', function(e){
    createStar(e.clientX, e.clientY);
  });
})();
