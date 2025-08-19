---
title: 博客日志
date: 2025-08-19
---

<ul id="post-log"></ul>
<script>
fetch('/content.json').then(r=>r.json()).then(data=>{
  let html = data.posts.map(p=>`<li><a href="${p.path}">${p.title}</a> - ${p.date.slice(0,10)}</li>`).join('');
  document.getElementById('post-log').innerHTML = html;
});
</script>
