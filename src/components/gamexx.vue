<template>
  <div class="body">
    <header>
      <nav>
        <a href="/Home" class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          My<span>Game</span>
        </a>
        <div class="nav-links">
          <a href="/index">首页</a>
          <a href="/Home">商店</a>
          <a href="/MyGames">个人中心</a>
        </div>
        <div class="user-actions">
          <template v-if="!isLoggedIn">
            <button class="login-btn nav-links"><a href="/Login-2">登录</a></button>
            <button class="login-btn nav-links"><a href="/admin-login">管理员登录</a></button>
          </template>
          <template v-else>
            <div class="user-info" @click="openUserMenu">
              <img :src="avatar" alt="用户头像" class="avatar">
              <span>{{ username }}</span>
            </div>
            <button class="logout-btn nav-links" @click="logout">退出登录</button>
          </template>
        </div>
      </nav>
    </header>

    <div class="content-container">
      <!-- 左侧图片展示区域 -->
      <div class="image-section">
        <div class="main-image" id="mainImage">
          <div class="main-image-content">
            <video class="qwe" src="https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/video/1.mp4" alt="游戏封面" ref="mainImageRef" autoplay loop muted type="video/mp4"></video>
          </div>
        </div>

        <div class="thumbnail-buttons">
          <div
            v-for="(thumb, index) in thumbnails"
            :key="index"
            class="thumb-btn"
            :class="{ active: currentThumbnail === index }"
            :data-image="index + 1"
            @mouseenter="changeThumbnail(index)"
          >
            {{ thumb.title }}
          </div>
        </div>
      </div>

      <!-- 右侧信息区域 -->
      <div class="info-section">
        <h1 class="game-title">{{ gameInfo.game_name }}</h1>
        <div class="tags">
          <div class="tag" v-if="getCategoryLabel(gameInfo.category)">{{ getCategoryLabel(gameInfo.category) }}</div>
        </div>
        <div class="price-section">
          <div class="price">¥{{ gameInfo.price }}</div>
          <button id="buyNowBtn" class="cart-button" @click="openBuyModal(gameInfo)">
            <i class="fa fa-shopping-cart mr-2"></i>立即购买
          </button>
        </div>

        <div class="details-grid">
          <div class="detail-label">发行日期</div>
          <div class="detail-value">{{ new Date(gameInfo.release_date).toLocaleDateString() }}</div>
        </div>
        <div class="game-rating">
                    {{ '★'.repeat(Math.floor(gameInfo.score)) }}{{ '☆'.repeat(5 - Math.floor(gameInfo.score)) }}
                    <span>{{ gameInfo.score }}</span>
                  </div>
      </div>
    </div>
    <div class="game-description">
      <h2>游戏介绍</h2>
      <p>{{ gameInfo.description }}</p>
    </div>

    <!-- 购买确认模态框 -->
    <div v-if="isBuyModalOpen" class="modal-overlay" @click.self="closeBuyModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>确认购买</h3>
          <button class="close-btn" @click="closeBuyModal">×</button>
        </div>
        <div class="modal-body">
          <!-- 显示游戏详细信息 -->
          <p>确定要购买游戏 "{{ selectedGameToBuy.game_name }}" 吗？价格: ¥{{ selectedGameToBuy.price.toFixed(2) }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="cancel-btn" @click="closeBuyModal">取消购买</button>
          <button type="button" class="confirm-btn" @click="confirmBuyGame">确定购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const isLoggedIn = ref(localStorage.getItem('token') !== null);
const avatar = ref(localStorage.getItem('avater') || 'default-avatar.png');
const username = ref(localStorage.getItem('username') || '游客');
const game_id = ref(0);
const route = useRoute();
const gameInfo = ref({});
const filterTabs = [
  { category: 'all', label: '全部游戏' },
  { category: '1', label: '大型网游' },
  { category: '2', label: '单机' },
  { category: '3', label: '动作RPG' },
  { category: '4', label: '独立游戏' },
  { category: '5', label: '生存' },
  { category: '6', label: 'FPS' },
  { category: '7', label: '二刺螈' },
  { category: '8', label: '模拟经营' }
];
const thumbnails = ref([
  {
    title: '游戏视频',
    bg: '',
    text: '白天合法竞赛，夜晚地下狂飙，在 Palm City 的街头证明自己'
  },
  {
    title: '游戏截图1',
    bg: 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/CSGO.png',
    text: '体验高画质的开放世界，感受每一处细节的震撼'
  },
  {
    title: '游戏截图2',
    bg: '../images/3.png',
    text: '定制你的梦想座驾，从经典跑车到超级跑车应有尽有'
  },
  {
    title: '游戏截图3',
    bg: '../images/4.png',
    text: '在霓虹灯下的街道上躲避警车，赢取丰厚奖励'
  }
]);

// 购买游戏
const buyGame = async (username, gamename) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:3000/users/order/shopping`, {
      username: username,
      gamename: gamename,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data.msg);
    // 这里可以添加获取购买游戏列表和愿望单的逻辑
  } catch (error) {
    console.error('购买游戏失败:', error);
  }
};

const currentThumbnail = ref(0);
const mainImageRef = ref(null); // 创建 ref 引用

const changeThumbnail = (index) => {
  if (!mainImageRef.value) return; // 确保 ref 已绑定
  
  currentThumbnail.value = index;
  const image = thumbnails.value[index];
  mainImageRef.value.style.background = image.bg;
  const h2 = mainImageRef.value.querySelector('h2');
  const p = mainImageRef.value.querySelector('p');
  if (h2) h2.textContent = image.title.toUpperCase();
  if (p) p.textContent = image.text;
};

// 根据分类 ID 获取分类标签
const getCategoryLabel = (category_id) => {
  // 打印 category_id 进行调试
  console.log('当前分类 ID:', category_id);
  // 将 category_id 转换为字符串进行匹配
  const categoryIdStr = String(category_id);
  const tab = filterTabs.find(tab => String(tab.category) === categoryIdStr);
  return tab ? tab.label : '';
};

// 购买确认模态框相关变量
const isBuyModalOpen = ref(false);
const selectedGameToBuy = ref({});

// 打开购买确认模态框
const openBuyModal = (game) => {
  selectedGameToBuy.value = game;
  isBuyModalOpen.value = true;
};

// 关闭购买确认模态框
const closeBuyModal = () => {
  isBuyModalOpen.value = false;
};

// 确认购买游戏
const confirmBuyGame = () => {
  buyGame(username.value, selectedGameToBuy.value.game_name);
  closeBuyModal();
};

onMounted(async () => {
  const gameId = route.params.game_id;
  console.log('当前游戏ID:', gameId);

  try {
    const response = await axios.get(`http://localhost:3000/admin/gameInfo`);
    gameInfo.value = response.data.data[gameId - 1]; 
    console.log('获取到的游戏信息:', gameInfo.value);
  } catch (error) {
    console.error('获取游戏详情失败:', error);
  }
});
</script>

<style scoped>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.body {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #e2e8f0;
  line-height: 1.6;
  min-height: 100vh;
  padding-bottom: 60px;
}

.qwe{
  position: absolute;
left: -2px;
top:0;
}

.content-container {
  width: 90%;
  max-width: 1200px;
  margin: 40px auto 0;
  display: flex;
  gap: 30px;
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
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;
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

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  transition: width 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

.user-actions {
  display: flex;
  gap: 15px;
}

.user-actions button {
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.login-btn {
  background: transparent;
  color: #60a5fa;
  border-color: #60a5fa;
}

.login-btn:hover {
  background: rgba(96, 165, 250, 0.1);
}

/* 左侧图片展示区域 */
.image-section {
  flex: 7;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image {
  height: 500px;
  background: linear-gradient(135deg, #1e293b, #334155);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(100, 130, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.main-image-content {
  text-align: center;
  padding: 30px;
  max-width: 700px;
}

.main-image h2 {
  font-size: 3.2rem;
  margin-bottom: 20px;
  color: #ff2a00;
  text-shadow: 0 0 15px rgba(255, 42, 0, 0.6);
  letter-spacing: 1px;
}

.main-image p {
  font-size: 1.3rem;
  margin: 0 auto;
  color: #e2e8f0;
  line-height: 1.8;
}

.thumbnail-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.thumb-btn {
  flex: 1;
  max-width: 150px;
  height: 90px;
  background: rgba(30, 41, 59, 0.7);
  border: 2px solid rgba(100, 130, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #cbd5e1;
  font-size: 1.05rem;
}

.thumb-btn:hover {
  border-color: #ff2a00;
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(255, 42, 0, 0.4);
  color: #fff;
}

.thumb-btn.active {
  border-color: #ff2a00;
  background: rgba(255, 42, 0, 0.15);
  color: #ff2a00;
}

/* 右侧信息区域 */
.info-section {
  flex: 3;
  min-width: 300px;
  padding: 30px;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 10px;
  border: 1px solid rgba(100, 130, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  height: 500px;
  font-size: 90%;
}

.game-title {
  font-size: 2.2rem;
  margin-bottom: 5px;
  color: #fff;
  text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}

.edition {
  color: #f472b6;
  font-size: 1.3rem;
  margin-bottom: 25px;
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.tag {
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: #0f172a;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
}

.price-section {
  background: rgba(30, 41, 59, 0.7);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  border: 1px solid rgba(100, 130, 255, 0.2);
  text-align: center;
}

.price {
  font-size: 2.2rem;
  color: #ffcc00;
  margin-bottom: 10px;
  font-weight: 700;
}
.avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
        }
.discount-info {
  color: #ffcc00;
  font-size: 1rem;
  margin-top: 10px;
  font-style: italic;
}

.game-description {
  width:80%;
  margin: 0 auto;
  margin-bottom: 30px;
  margin-top: 30px;
  font-size: 1.05rem;
  color: #cbd5e1;
  line-height: 1.7;
  padding: 10px;
  background: rgba(30, 41, 59, 0.1);
  border-radius: 8px;
}

.details-grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 15px;
  font-size: 0.95rem;
  background: rgba(30, 41, 59, 0.4);
  padding: 15px;
  border-radius: 8px;
}

.detail-label {
  color: #94a3b8;
  font-weight: 600;
}

.detail-value {
  color: #e2e8f0;
}

/* 购物车按钮样式 */
.cart-button {
  display: block;
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: #0f172a;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  margin-top: 30px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.cart-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(96, 165, 250, 0.3);
}

.cart-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.2);
}

.cart-button.added {
  background: #10b981;
  color: white;
}

.cart-button.added::after {
  content: '加入成功';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
}
  .game-rating {
    padding-top: 10%;
    padding-left: 30%;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fbbf24;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal-content {
  background: rgba(30, 41, 59, 0.95);
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(100, 130, 255, 0.3);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid rgba(100, 130, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #f8fafc;
}

.close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #60a5fa;
}

.modal-body {
  padding: 20px;
}

.modal-body input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(100, 130, 255, 0.2);
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 16px;
  outline: none;
}

.modal-body input:focus {
  border-color: #60a5fa;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 2px solid rgba(96, 165, 250, 0.5);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn,
.confirm-btn {
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 10px;
  margin-right: 10px;
}

.cancel-btn {
  background: transparent;
  border: 1px solid rgba(100, 130, 255, 0.3);
  color: #94a3b8;
}

.cancel-btn:hover {
  background: rgba(100, 130, 255, 0.1);
}

.confirm-btn {
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: #0f172a;
  border: none;
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}

.error-message {
  color: #ef4444;
  margin-top: 10px;
  text-align: center;
}
</style>