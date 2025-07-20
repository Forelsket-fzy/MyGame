<template>
  <!-- 首屏GIF背景和下载按钮 -->
  <div :class="['landing-page', { hidden: isLandingPageHidden }]" id="landingPage">
    <div class="gif-background"></div>
    <h1 class="welcome-title1">欢迎来到</h1>
    <br>
    <h1 class="welcome-title2">MyGame</h1>
    <div class="scroll-indicator" @click="scrollToContent"><i class="fas fa-angle-down"></i></div>
  </div>

  <!-- 顶部导航栏 -->
  <header :class="['visible', { visible: isHeaderVisible }]">
    <div class="container">
      <nav>
        <a href="#" class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          My<span>Game</span>
        </a>

        <div class="nav-links">
          <a href="index.html" class="active">首页</a>
          <a href="hot-game.html" class="active">商城</a>
          <a href="game-home.html" class="active">个人中心</a>
        </div>
        <div class="user-actions">
          <button class="login-btn"><a href="login.html" style="color:inherit;text-decoration:none;">登录</a></button>
        </div>
      </nav>
    </div>
  </header>

  <!-- 动态模糊背景 -->
  <div :class="['blur-bg-container', { visible: isBlurBgVisible }]">
    <div class="blur-bg" id="blurBg">
      <!-- 这里将通过Vue动态生成图片行 -->
      <div v-for="(row, rowIndex) in blurRows" :key="rowIndex" class="blur-row">
        <div v-for="(col, colIndex) in row" :key="colIndex" class="blur-item">
          <img :src="col.src" alt="游戏图片" :data-index="col.index" :style="{ opacity: col.opacity }">
        </div>
      </div>
    </div>
  </div>

  <!-- new-login.html 内容 -->
  <div class="container new-login-container" :class="['visible', { visible: isNewLoginContainerVisible }]">
    <div class="new-login-header" :class="['visible', { visible: isNewLoginHeaderVisible }]">
      <h1 class="new-login-title">大作云集</h1>
      
    </div>

    <div class="new-login-wave-mask">
      <div class="new-login-carousel" :style="{ transform: `translateX(${-currentIndex * slideWidth}px)` }">
        <div v-for="(slide, index) in slides" :key="index" class="new-login-slide">
          <div class="new-login-slide-img">
            <img :src="slide.src" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="new-login-indicators" id="new-login-indicators">
      <div
        v-for="(_, index) in slides"
        :key="index"
        :class="['new-login-indicator', { active: index === currentIndex }]"
        @click="goToSlide(index)"
      ></div>
    </div>
    <div class="new-login-connection-animation" id="new-login-connectionAnimation">
      <div
        v-for="(line, index) in connectionLines"
        :key="index"
        class="new-login-connection-line"
        :style="line.style"
      ></div>
    </div>
  </div>

  <!-- 主内容 -->
  <div class="container">
    <!-- 主标题 -->
    <div class="main-title" :class="['visible', { visible: isMainTitleVisible }]">
      <div class="wegame-more" @click="gotoHome">MYGAME 游戏商城</div>
    </div>

    <!-- 内容区域 -->
    <div class="content-section" :class="['visible', { visible: isContentSectionVisible }]">
      <!-- 下载客户端 -->
      <div class="download-section">
        <h3 class="section-title">下载客户端</h3>
        <div class="download-option">
          <a href="#">Windows版</a>
        </div>
        <div class="download-option">
          <a href="#">Mac版<span class="version-tag">(测试版)</span></a>
        </div>
      </div>

      <!-- 官方渠道 -->
      <div class="official-section">
        <h3 class="section-title">官方渠道</h3>
        <div class="official-link">
          <a href="#">微信</a>
        </div>
        <div class="official-link">
          <a href="#">微博</a>
        </div>
        <div class="official-link">
          <a href="#">bilibili</a>
        </div>
      </div>

      <!-- 友情链接 -->
      <div class="links-section">
        <h3 class="section-title">友情链接</h3>
        <div class="friend-link">
          <a href="#">INDIE NOVA</a>
        </div>
      </div>
    </div>
  </div>

  <!-- 页脚 -->
  <footer :class="['visible', { visible: isFooterVisible }]">
    <div class="footer-links">
      <a href="#">关于MyGame</a>
      <a href="#">服务条款</a>
      <a href="#">软件许可及服务协议</a>
      <a href="#">隐私保护指引</a>
      <a href="#">儿童隐私保护指引</a>
      <a href="#">网络游戏行业防沉迷自律公约</a>
      <a href="#">侵权通知</a>
      <a href="#">广告服务</a>
      <a href="#">腾讯招聘</a>
      <a href="#">客服中心</a>
      <a href="#">联系我们</a>
      <a href="#">ICP备案号:粤B2-20090059-376</a>
      <a href="#">粤公网安备44030502008701号</a>
    </div>
    <div class="copyright">
      COPYRIGHT ©2023 TENCENT. ALL RIGHTS RESERVED.<br>
      aiit公司版权所有
    </div>
    <div class="wegame-logo">
      <span>MyGame</span>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';

// 首屏逻辑
const isLandingPageHidden = ref(false);
const isHeaderVisible = ref(false);
const isBlurBgVisible = ref(false);
const isMainTitleVisible = ref(false);
const isNewLoginHeaderVisible = ref(false);
const isNewLoginContainerVisible = ref(false);
const isNewLoginInfoBarVisible = ref(false);
const isContentSectionVisible = ref(false);
const isFooterVisible = ref(false);

const gotoHome = () => {
  window.location.href = 'Home';
};

// 滚动监听，当用户滚动时显示内容，隐藏首屏
const handleScroll = () => {
  if (window.scrollY > 100) {
    isLandingPageHidden.value = true;
    isHeaderVisible.value = true;
    isBlurBgVisible.value = true;

    // 渐入动画
    setTimeout(() => {
      isMainTitleVisible.value = true;
    }, 200);

    setTimeout(() => {
      isNewLoginHeaderVisible.value = true;
    }, 400);

    setTimeout(() => {
      isNewLoginContainerVisible.value = true;
    }, 600);

    setTimeout(() => {
      isNewLoginInfoBarVisible.value = true;
    }, 800);

    setTimeout(() => {
      isContentSectionVisible.value = true;
    }, 1000);

    setTimeout(() => {
      isFooterVisible.value = true;
    }, 1200);
  }
};

// 点击下滑图标也触发滚动
const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  });
};

// text.html JavaScript 代码
const blurRows = ref([]);
const totalImages = 20; // 4行5列共20张图片
const totalImageOptions = 30; // 假设共有30张图片可供选择

// 工具函数 - 生成不重复的随机索引
const getUniqueRandomIndices = (count, max) => {
  const indices = [];
  while (indices.length < count) {
    const random = Math.floor(Math.random() * max) + 1;
    if (!indices.includes(random)) {
      indices.push(random);
    }
  }
  return indices;
};

// 工具函数 - 比较两个数组是否相同
const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

// 初始化图片 - 确保不重复
const initializeImages = () => {
  // 生成不重复的随机索引数组
  const usedIndices = getUniqueRandomIndices(totalImages, totalImageOptions);
  // 创建4行5列的图片结构
  const rows = [];
  let index = 0;
  for (let row = 0; row < 4; row++) {
    const rowData = [];
    for (let col = 0; col < 5; col++) {
      rowData.push({
        src: `https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/image/${usedIndices[index]}.png`,
        index: usedIndices[index],
        opacity: 1
      });
      index++;
    }
    rows.push(rowData);
  }
  blurRows.value = rows;
};

// 更换图片 - 确保不重复且有过渡效果
const changeBgImages = () => {
  // 先添加淡入淡出效果
  blurRows.value.forEach(row => {
    row.forEach(item => {
      item.opacity = 0;
    });
  });

  // 生成不重复的随机索引数组
  let usedIndices = getUniqueRandomIndices(totalImages, totalImageOptions);

  // 检查是否与当前图片完全相同，如果是则重新生成
  const currentIndices = blurRows.value.flatMap(row => row.map(item => parseInt(item.index)));
  if (arraysEqual(usedIndices, currentIndices)) {
    usedIndices = getUniqueRandomIndices(totalImages, totalImageOptions);
  }

  // 等待过渡效果完成后设置新图片
  setTimeout(() => {
    let index = 0;
    blurRows.value.forEach(row => {
      row.forEach(item => {
        item.src = `image/${usedIndices[index]}.png?t=${Date.now()}`;
        item.index = usedIndices[index];
        item.opacity = 1;
        index++;
      });
    });
  }, 500);
};

// new-login.html JavaScript 代码
const slides = ref([
  { src: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/wm.png' },
  { src: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/kdss.png' },
  { src: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/wm.png' },
  { src: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/yjwj.png' },
  { src: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/%E8%8D%92%E9%87%8E%E5%A4%A7%E9%95%96%E5%AE%A22.png' },
  { src: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/%E8%B5%9B%E5%8D%9A%E6%9C%8B%E5%85%8B%202077.png' }
]);
const currentIndex = ref(0);
const slideWidth = ref(slides.value[0].offsetWidth + 30);
let autoSlideInterval;

// 跳转到指定索引的幻灯片的函数
const goToSlide = (index) => {
  currentIndex.value = index;
  resetAutoSlide();
};

// 切换到下一张幻灯片的函数
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

// 启动自动轮播的函数
const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000);
};

// 重置自动轮播定时器的函数
const resetAutoSlide = () => {
  clearInterval(autoSlideInterval);
  startAutoSlide();
};

// 创建连接动画线条的函数
const connectionLines = ref([]);
const createConnectionLines = () => {
  const lines = [];
  for (let i = 0; i < 15; i++) {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    lines.push({
      style: {
        width: `${length}%`,
        height: '2px',
        top: `${startY}%`,
        left: `${startX}%`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        animation: `pulse ${2 + Math.random() * 3}s infinite`,
        animationDelay: `${Math.random() * 2}s`
      }
    });
  }
  connectionLines.value = lines;
};

onMounted(() => {
  // 滚动监听
  window.addEventListener('scroll', handleScroll);

  // 初始化图片
  initializeImages();
  setInterval(changeBgImages, 300000); // 每300秒更换一次背景图片

  // 启动自动轮播
  startAutoSlide();
  // 创建连接动画线条
  createConnectionLines();
});

watchEffect(() => {
  slideWidth.value = slides.value[0].offsetWidth + 30;
  createConnectionLines();
});
</script>

<style scoped>
/* 这里可以将原有的 CSS 样式复制过来 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #e2e8f0;
  line-height: 1.6;
  min-height: 100vh;
  padding-bottom: 60px;
  position: relative;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

/* 导航栏样式 */
header {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(100, 130, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s ease-out;
}

header.visible {
  transform: translateY(0);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #60a5fa;
  text-decoration: none;
}

.logo span {
  color: #f472b6;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #60a5fa;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 9999px;
  padding: 8px 16px;
  border: 1px solid rgba(100, 130, 255, 0.2);
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: #e2e8f0;
  width: 180px;
}

.search-bar button {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.3s;
}

.search-bar button:hover {
  color: #60a5fa;
}

.login-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  background: transparent;
  color: #60a5fa;
  border: 1px solid #60a5fa;
}

.login-btn:hover {
  background: rgba(96, 165, 250, 0.1);
}

/* 动态模糊背景容器 */
.blur-bg-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  opacity: 0;
  transition: opacity 1s ease-out;
}

.blur-bg-container.visible {
  opacity: 1;
}

.blur-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300%;
  display: flex;
  flex-direction: column;
  animation: scrollBg 30s linear infinite;
}

.blur-row {
  display: flex;
  width: 100%;
  height: 33.33%;
}

.blur-item {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.blur-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 保持图片比例并填充容器 */
  transition: filter 0.5s ease;
}

/* 从上到下逐渐增加模糊度 */
.blur-row:nth-child(1) .blur-item img {
  filter: blur(0px) brightness(0.7);
}

.blur-row:nth-child(2) .blur-item img {
  filter: blur(2px) brightness(0.6);
}

.blur-row:nth-child(3) .blur-item img {
  filter: blur(5px) brightness(0.5);
}

/* 主标题区域 */
.main-title {
  text-align: center;
  padding: 80px 0 120px;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.main-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.wegame-more {
  font-size: 72px;
  font-weight: bold;
  letter-spacing: 5px;
  background: linear-gradient(90deg, #fff, #aaa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* 内容区域 */
.content-section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 100px;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.content-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.download-section,
.official-section,
.links-section {
  flex: 1;
  padding: 0 20px;
}

.section-title {
  font-size: 18px;
  color: #ccc;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}

.download-option,
.official-link,
.friend-link {
  margin-bottom: 15px;
}

.download-option a,
.official-link a,
.friend-link a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.download-option a:hover,
.official-link a:hover,
.friend-link a:hover {
  color: #3a8ee6;
}

.version-tag {
  font-size: 12px;
  color: #999;
  margin-left: 5px;
}

/* 页脚 */
footer {
  background-color: rgba(17, 17, 17, 0.8);
  padding: 30px 0;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(5px);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

footer.visible {
  opacity: 1;
  transform: translateY(0);
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0;
}

.footer-links a {
  color: #999;
  text-decoration: none;
  margin: 0 10px;
  font-size: 12px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #3a8ee6;
}

.copyright {
  text-align: center;
  color: #666;
  font-size: 12px;
  line-height: 1.6;
}

.wegame-logo {
  text-align: center;
  margin-top: 20px;
}

.wegame-logo span {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1px;
}

/* 动画 */
@keyframes scrollBg {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-66.66%);
  }
}

/* new-login.html 样式 */
.new-login-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.new-login-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.new-login-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
}



.new-login-container {
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 5;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.new-login-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.new-login-wave-mask {
  width: 100%;
  height: 500px;
  -webkit-mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDE0NDAgNTAwIiBpZD0iaiI+CiAgPHBhdGggZmlsbD0icmdiKDIwMCwyMDAsMjAwKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwczI3NS4wNCAxMDAgNzIwIDEwMFMxNDQwIDAgMTQ0MCAwdjUwMHMtMjc1LjA0LTEwMC03MjAtMTAwUzAgNTAwIDAgNTAwVjB6Ii8+Cjwvc3ZnPgo=');
  mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDE0NDAgNTAwIiBpZD0iaiI+CiAgPHBhdGggZmlsbD0icmdiKDIwMCwyMDAsMjAwKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwczI3NS4wNCAxMDAgNzIwIDEwMFMxNDQwIDAgMTQ0MCAwdjUwMHMtMjc1LjA0LTEwMC03MjAtMTAwUzAgNTAwIDAgNTAwVjB6Ii8+Cjwvc3ZnPgo=');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.2);
}

.new-login-carousel {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.33, 1, 0.68, 1);
}

.new-login-slide {
  min-width: 400px;
  height: 100%;
  margin: 0 15px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.new-login-slide:hover {
  transform: scale(1.03);
}

.new-login-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.new-login-slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
}

.new-login-slide-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: #fff;
}

.new-login-slide-text {
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 90%;
}

.new-login-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
  z-index: 10;
}

.new-login-indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-login-indicator.active {
  background: #ff7e5f;
  transform: scale(1.3);
  box-shadow: 0 0 10px #ff7e5f;
}

.new-login-info-bar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  margin-top: 40px;
  max-width: 800px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.new-login-info-bar.visible {
  opacity: 1;
  transform: translateY(0);
}

.new-login-info-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #ffb47b;
}

.new-login-features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
}

.new-login-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
}

.new-login-feature i {
  color: #ff7e5f;
  font-size: 1.8rem;
}

.new-login-footer {
  margin-top: 40px;
  text-align: center;
  font-size: 1rem;
  opacity: 0.8;
}

.new-login-connection-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.new-login-connection-line {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
}

.new-login-slide-img img {
  width: 1200px;
  height: 600px;
  object-fit: cover; /* 图片会覆盖整个容器，可能会裁剪部分内容 */
  /* object-fit: contain; 图片会完整显示在容器内，可能会有空白 */
}

/* 首屏GIF背景和下载按钮 */
.landing-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.landing-page.hidden {
  opacity: 0;
  transform: translateY(-100%);
}

.gif-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('./image2/index.gif'); /* 这里替换为你的GIF地址 */
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
  z-index: -1;
}

.download-button {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 15px 60px;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(255, 126, 95, 0.4);
  transition: all 0.3s ease;
  z-index: 10;
}

.download-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 126, 95, 0.5);
}

.scroll-indicator {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  animation: bounce 2s infinite;
  z-index: 10;
}

.welcome-title1 {
        font-size: 72px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        z-index: 10;
        letter-spacing: 5px;
        /* 修改为黄色渐变 */
        background: linear-gradient(90deg, #ffd700, #ffcc00);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); /* 调整文字阴影为黄色调 */
    }
        .welcome-title2 {
            font-size: 72px;
            font-weight: bold;
            color: white;
            text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
            margin-bottom: 20px;
            text-align: center;
            z-index: 10;
            letter-spacing: 5px;
            background: linear-gradient(90deg, #fff, #aaa);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}
</style>