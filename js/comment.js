import md5 from 'blueimp-md5';

(function (){

  const dom = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
  // 装评论模块的盒子
  const node = document.getElementById('gitalk_container');
  // script节点
  const jsNode = document.getElementById('comment_js_file');

  if (!node) {
    return;
  }

  if (!jsNode) {
    return;
  }
  // 获取配置信息
  const js = jsNode.getAttribute('data-js');
  const css = jsNode.getAttribute('data-css');
  const clientID = jsNode.getAttribute('data-clientID');
  const clientSecret = jsNode.getAttribute('data-clientSecret');
  const repo = jsNode.getAttribute('data-repo');
  const owner = jsNode.getAttribute('data-owner');
  let admin = jsNode.getAttribute('data-admin');
  const path = jsNode.getAttribute('data-path') || '';

  if (!js || !css || !clientID || !clientSecret || !repo || !owner || !admin || !path) {
    return;
  }

  // 用于 id 前缀，防止 md5 之后的值相同
  const date = jsNode.getAttribute('data-date') || '';
  const id = date + '-' + md5(path);

  // 用于处理配置的 admin 字段不是字符串，是数组情况
  try {
    admin = JSON.parse(admin)
  } catch (e) {}

  const talkJs = document.createElement('script');
  talkJs.addEventListener('load', function () {
    // 文件加载成功初始评论
    const gitalk = new Gitalk({
      clientID,
      clientSecret,
      repo,
      owner,
      admin,
      id,
      // distractionFreeMode: true,
    });
    gitalk.render('gitalk_container');
  });
  talkJs.async = true;
  talkJs.src = js;

  const talkCss = document.createElement('link');
  talkCss.setAttribute('rel', 'stylesheet');
  talkCss.setAttribute('href', css);

  dom.appendChild(talkJs);
  dom.appendChild(talkCss);
})();