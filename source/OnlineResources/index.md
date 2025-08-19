---
title: 在线资料
date: 2025-08-19 14:40:00
---

<div style="display: flex;">
  <!-- 左侧分类栏 -->
  <div style="width: 200px; border-right: 1px solid #ddd; padding-right: 10px;">
    <label class="tab-label">
      <input type="radio" name="tab" checked onclick="showTab('cat1')">
      Qt
    </label><br>
    <label class="tab-label">
      <input type="radio" name="tab" onclick="showTab('cat2')">
      ROS
    </label><br>
    <label class="tab-label">
      <input type="radio" name="tab" onclick="showTab('cat3')">
      CAN
    </label><br>
    <label class="tab-label">
      <input type="radio" name="tab" onclick="showTab('cat4')">
      Matlab
    </label><br>
    <label class="tab-label">
      <input type="radio" name="tab" onclick="showTab('cat5')">
      面试题
    </label>
  </div>
  <!-- 右侧内容区 -->
  <div style="flex: 1; padding-left: 20px;">
    <div id="cat1" class="tab-content">
      <h2>Qt</h2>
      <ul>
        <li><a href="/static/pdf-viewer.html?file=/docs/Qt/霍亚飞 - Qt Creator 快速入门（第三版）-北京航空航天大学出版社 (2017).pdf">霍亚飞 - Qt Creator 快速入门（第三版）-北京航空航天大学出版社 (2017)</a></li>
        <li><a href="/static/pdf-viewer.html?file=/docs/Qt/QmlBook 中文版 (Z-lib.io).epub">QmlBook 中文版 (Z-lib.io).epub</a></li>
      </ul>
    </div>
    <div id="cat2" class="tab-content" style="display:none;">
      <h2>ROS</h2>
      <ul>
        <li><a href="/static/pdf-viewer.html?file=/docs/ROS/ROS_ABC_Guide.pdf">ROS入门教程</a></li>
        <li><a href="/static/pdf-viewer.html?file=/docs/ROS/Mastering ROS for Robotics Programming.pdf">Mastering ROS for Robotics Programming</a></li>
        <li><a href="/static/pdf-viewer.html?file=/docs/ROS/Programming Robots with ROS.pdf">Programming Robots with ROS</a></li>
        <li><a href="/static/pdf-viewer.html?file=/docs/ROS/第1讲：认识ROS_课件.pdf">第1讲：认识ROS_课件</a></li>
        <li><a href="/static/pdf-viewer.html?file=/docs/ROS/ROS_introduction.pptx">ROS介绍.pptx</a></li>
      </ul>
    </div>
    <div id="cat3" class="tab-content" style="display:none;">
      <h2>CAN</h2>
      <ul>
       <li><a href="/static/pdf-viewer.html?file=/docs/CAN/CANoe_learndoc_2020.pdf" target="_blank">CANoe 培训文档 2020</a></li>
      </ul>
    </div>
    <div id="cat4" class="tab-content" style="display:none;">
      <h2>Matlab</h2>
      <ul>
       <li><a href="/static/pdf-viewer.html?file=/docs/Matlab/matlab教程.pdf" target="_blank">matlab教程</a></li>
      </ul>
    </div>
    <div id="cat5" class="tab-content" style="display:none;">
      <h2>面试题</h2>
      <ul>
       <li><a href="/static/txt-viewer.html?file=/docs/Interview/C_CPP_interview.txt" target="_blank">CC++面试题</a></li>
        <li><a href="/static/txt-viewer.html?file=/docs/Interview/Linux_interview.txt" target="_blank">Linux面试题</a></li>
        <li><a href="/static/txt-viewer.html?file=/docs/Interview/MySQL_interview.txt" target="_blank">MySQL面试题</a></li>
        <li><a href="/static/txt-viewer.html?file=/docs/Interview/Shell_interview.txt" target="_blank">Shell面试题</a></li>
        <li><a href="/static/txt-viewer.html?file=/docs/Interview/SQL_interview.txt" target="_blank">SQL面试题</a></li>
      </ul>
    </div>
  </div>
</div>
<script>
function showTab(tabId) {
  // 隐藏所有内容
  document.querySelectorAll('.tab-content').forEach(div => {
    div.style.display = 'none';
  });
  // 显示选中的分类内容
  document.getElementById(tabId).style.display = 'block';
}
</script>
<style>
/* 隐藏原生 radio */
.tab-label input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-right: 8px;
  width: 14px;
  height: 14px;
  border: 2px solid #aaa;
  border-radius: 4px;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
}
/* 选中时高亮 */
.tab-label input[type="radio"]:checked {
  border-color: #0078d7;
  background-color: #0078d7;
}
/* 鼠标悬停时轻微变化 */
.tab-label:hover {
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}
/* 整个选中的分类行高亮 */
.tab-label input[type="radio"]:checked + span,
.tab-label:has(input[type="radio"]:checked) {
  background: #e6f0ff;
  border-radius: 4px;
  pad
}

<hr />
