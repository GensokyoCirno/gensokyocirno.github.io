/* ============================================
   罗马维基 · 主 JavaScript 文件
   ============================================ */

(function() {
  // ============================================
// 1. 侧边栏切换功能（桌面收缩 + 移动滑出）
// ============================================
function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const wikiGrid = document.querySelector('.wiki-grid');
  const overlay = document.getElementById('sidebarOverlay');

  if (!toggleBtn || !wikiGrid) return;

  const isMobile = () => window.innerWidth <= 780;

  // 初始化：桌面端根据偏好，移动端默认关闭
  if (isMobile()) {
    wikiGrid.classList.remove('sidebar-open');
  }

  // 切换侧边栏
  function toggleSidebar() {
    if (isMobile()) {
      // 移动端：切换 sidebar-open 类
      wikiGrid.classList.toggle('sidebar-open');
    } else {
      // 桌面端：切换 sidebar-collapsed 类（原有逻辑）
      wikiGrid.classList.toggle('sidebar-collapsed');
      const isCollapsed = wikiGrid.classList.contains('sidebar-collapsed');
      try {
        localStorage.setItem('sidebarCollapsed', isCollapsed);
      } catch (e) {}
    }
  }

  // 点击按钮
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleSidebar();
  });

  // 点击遮罩关闭（移动端）
  if (overlay) {
    overlay.addEventListener('click', function() {
      wikiGrid.classList.remove('sidebar-open');
    });
  }

  // 点击侧边栏外区域关闭（移动端）
  document.addEventListener('click', function(e) {
    if (isMobile() && wikiGrid.classList.contains('sidebar-open')) {
      const sidebar = document.querySelector('.sidebar');
      const toggle = document.getElementById('sidebarToggle');

      if (sidebar && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
        wikiGrid.classList.remove('sidebar-open');
      }
    }
  });

  // 窗口大小变化时重置状态
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const mobile = isMobile();

      if (!mobile) {
        // 切换到桌面时，关闭移动端的滑出状态
        wikiGrid.classList.remove('sidebar-open');

        // 恢复桌面端偏好
        try {
          const saved = localStorage.getItem('sidebarCollapsed');
          if (saved === 'true') {
            wikiGrid.classList.add('sidebar-collapsed');
          } else {
            wikiGrid.classList.remove('sidebar-collapsed');
          }
        } catch (e) {}
      } else {
        // 切换到移动端时，移除桌面的收起状态
        wikiGrid.classList.remove('sidebar-collapsed');
        wikiGrid.classList.remove('sidebar-open');
      }
    }, 200);
  });

  // 恢复桌面端用户偏好
  if (!isMobile()) {
    try {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState === 'true') {
        wikiGrid.classList.add('sidebar-collapsed');
      }
    } catch (e) {}
  }
}

// ============================================
// 2. 复制网址功能（按钮变色反馈）
// ============================================
function initCopyUrl() {
  const copyBtn = document.getElementById('copyUrlBtn');
  if (!copyBtn) return;

  let restoreTimer = null;

  // 复制函数（兼容 HTTP 和 HTTPS）
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      return new Promise(function(resolve, reject) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        try {
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          if (success) {
            resolve();
          } else {
            reject(new Error('复制失败'));
          }
        } catch (err) {
          document.body.removeChild(textarea);
          reject(err);
        }
      });
    }
  }

  // 保存原始内容
  const originalHTML = copyBtn.innerHTML;

  // 显示状态反馈
  function showStatus(type) {
    // 清除之前的定时器，防止重复叠加
    if (restoreTimer) {
      clearTimeout(restoreTimer);
    }

    // 移除旧的状态类
    copyBtn.classList.remove('copied', 'copy-failed');

    // 触发重绘，确保过渡动画生效
    void copyBtn.offsetWidth;

    if (type === 'success') {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<i>✅</i> <span class="copy-text">复制成功</span>';
    } else {
      copyBtn.classList.add('copy-failed');
      copyBtn.innerHTML = '<i>❌</i> <span class="copy-text">复制失败</span>';
    }

    // 1.8 秒后恢复原样
    restoreTimer = setTimeout(function() {
      copyBtn.classList.remove('copied', 'copy-failed');
      copyBtn.innerHTML = originalHTML;
    }, 1800);
  }

  // 点击事件
  copyBtn.addEventListener('click', function() {
    const currentUrl = window.location.href;

    copyToClipboard(currentUrl)
      .then(function() {
        showStatus('success');
      })
      .catch(function(err) {
        console.error('复制失败：', err);
        showStatus('error');
      });
  });
}

  // ============================================
  // 3. 页面加载完成后初始化
  // ============================================
  function init() {
    initSidebarToggle();
    initCopyUrl();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();