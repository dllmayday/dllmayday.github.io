---
title: 付费解锁示例
date: 2025-08-21
---

<div id="paywall-container" style="max-width:720px;margin:auto;padding:20px;font-family:Arial,sans-serif;">

  <h1>付费解锁示例</h1>
  <p>以下是预览内容，完整内容需要支付后解锁。</p>

  <!-- 免费内容 -->
  <div style="margin:20px 0;padding:10px;border:1px solid #ddd;border-radius:8px;">
    <p>这是文章的免费部分。</p>
  </div>

  <!-- 付费墙 -->
  <div id="locked-content" style="position:relative;overflow:hidden;border:1px solid #ddd;border-radius:8px;padding:20px;min-height:200px;">
    <div id="locked-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.9);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <p style="margin-bottom:10px;font-weight:bold;">此内容已加密，请支付后解锁</p>
      <button onclick="showPayModal()" style="padding:10px 20px;border:none;border-radius:6px;background:#1AAD19;color:white;cursor:pointer;">💰 点击支付解锁</button>
    </div>

    <!-- 真正的付费内容 -->
    <div>
      <h2>解锁后的内容</h2>
      <p>这是付费后才能看到的完整文章内容。</p>
      <ul>
        <li>要点一</li>
        <li>要点二</li>
        <li>要点三</li>
      </ul>
    </div>
  </div>
</div>

<!-- 支付弹窗 -->
<div id="pay-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:999;align-items:center;justify-content:center;">
  <div style="background:white;padding:20px;border-radius:12px;max-width:320px;text-align:center;position:relative;">
    <span style="position:absolute;top:8px;right:12px;cursor:pointer;" onclick="closePayModal()">✖</span>
    <h3>请使用微信扫码支付</h3>
    <img src="/images/wechat-pay-qrcode.jpg" alt="微信收款码" style="width:260px;height:260px;margin:15px auto;border:1px solid #eee;border-radius:8px;" />
    <button onclick="unlockContent()" style="margin-top:15px;padding:8px 16px;border:none;border-radius:6px;background:#1AAD19;color:white;cursor:pointer;">我已支付，解锁内容</button>
  </div>
</div>

<script>
  function showPayModal() {
    document.getElementById("pay-modal").style.display = "flex";
  }
  function closePayModal() {
    document.getElementById("pay-modal").style.display = "none";
  }
  function unlockContent() {
    document.getElementById("locked-overlay").style.display = "none";
    closePayModal();
    alert("感谢支持，内容已解锁！");
  }
</script>
