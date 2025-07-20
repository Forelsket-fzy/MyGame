<template>
  <div class="body1">
    <!-- 顶部导航栏 -->
    <header>
      <nav>
        <a href="#" class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          My<span>Game</span>
        </a>

        <div class="nav-links">
          <a href="./index">首页</a>
          <a href="./Home">商城</a>
          <a href="./MyGames">个人中心</a>
        </div>


        <div class="user-actions">
          <button v-if="!isLoggedIn" class="login-btn nav-links"><a href="Login-2">登录</a></button>
          <button v-else class="logout-btn nav-links" @click="logout">退出登录</button>
        </div>
      </nav>
    </header>

    <!-- 个人中心内容 -->
    <div class="container">
      <div class="profile-container">
        <!-- 左侧边栏 -->
        <div class="profile-sidebar">
          <div class="profile-card">
            <div class="profile-header">
              <div class="avatar-container">
                <img :src="userInfo.avater || 'https://picsum.photos/200/200?random=avatar'" alt="用户头像" class="avatar">
              </div>
              <h2 class="username">{{ userInfo.username || '未设置用户名' }}</h2>
              <p class="user-email">{{ userInfo.email || '未设置邮箱' }}</p>
            </div>
          </div>

          <div class="profile-card">
            <ul class="profile-menu">
              <li class="menu-item">
                <a href="#" class="menu-link" :class="{ active: currentSection === 'profile-section' }" @click="changeSection('profile-section')">
                  <span class="menu-icon">👤</span>
                  个人资料
                </a>
              </li>
              <li class="menu-item">
                <a href="#" class="menu-link" :class="{ active: currentSection === 'purchased-section' }" @click="changeSection('purchased-section')">
                  <span class="menu-icon">🎮</span>
                  我的游戏
                </a>
              </li>
              <li class="menu-item">
                <a href="#" class="menu-link" :class="{ active: currentSection === 'wishlist-section' }" @click="changeSection('wishlist-section')">
                  <span class="menu-icon">❤️</span>
                  愿望单
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右侧主内容区 -->
        <div class="profile-main">
          <!-- 个人资料部分 -->
          <div id="profile-section" class="profile-section" :class="{ hidden: currentSection !== 'profile-section' }">
            <h2 class="section-title">个人资料</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">用户名</div>
                <div class="info-value">{{ userInfo.username || '未设置用户名' }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">注册时间</div>
                <div class="info-value">{{ new Date(userInfo.create_time).toLocaleString() || '未知' }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">电子邮箱</div>
                <div class="info-value">{{ userInfo.email || '未设置邮箱' }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">账户余额</div>
                <div class="info-value">¥{{ userInfo.balance || '未设置余额' }}</div>
              </div>
            </div>
            <!-- 修改用户信息按钮 -->
            <button class="edit-btn" @click="openEditModal">修改用户信息</button>
          </div>

          <!-- 我的游戏部分 -->
          <div id="purchased-section" class="profile-section" :class="{ hidden: currentSection !== 'purchased-section' }">
            <h2 class="section-title">我的游戏</h2>
            <div class="game-list">
              <template v-if="purchasedGames.length > 0">
                <div v-for="game in purchasedGames" :key="game.id" class="game-card" @click="openOrderModal(game)">
                  <img :src="game.cover_image || 'https://via.placeholder.com/200x120/1e293b/94a3b8?text=游戏封面'" :alt="game.name" class="game-cover">
                  <div class="game-details">
                    <h3 class="game-name">{{ game.game_name }}</h3>
                    <p class="game-date">购买于 {{  new Date(game.release_date).toLocaleString() || new Date(game.release_date).toLocaleString() }}</p>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="empty-state">
                  <p>您还没有购买任何游戏</p>
                  <a href="Home" class="explore-btn">浏览游戏商城</a>
                </div>
              </template>
            </div>
          </div>

       <!-- 愿望单部分 -->
<div id="wishlist-section" class="profile-section" :class="{ hidden: currentSection !== 'wishlist-section' }">
  <h2 class="section-title">愿望单</h2>
  <div class="game-list">
    <template v-if="wishlistGames.length > 0">
      <div v-for="game in wishlistGames" :key="game.id" class="game-card">
        <div class="game-cover-container">
          <img :src="game.cover_image || 'https://via.placeholder.com/200x120/1e293b/94a3b8?text=游戏封面'" :alt="game.game_name" class="game-cover">
        </div>
        <div class="game-details">
          <h3 class="game-name">{{ game.game_name }}</h3>
          <div class="game-actions">
            <button class="remove-btn" @click="removeFromWishlist(game.game_id, game.game_name)">移除</button>
          <!-- 修改为传入整个 game 对象 -->
                  <button class="buy-btn" @click="openBuyModal(game)">购买</button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty-state">
        <p>您的愿望单是空的</p>
        <a href="Home" class="explore-btn">浏览游戏商城</a>
      </div>
    </template>
  </div>
</div>
        </div>
      </div>
    </div>



    <!-- 订单信息模态框 -->
    <div v-if="isOrderModalOpen" class="modal-overlay" @click.self="closeOrderModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>订单信息</h3>
          <button class="close-btn" @click="closeOrderModal">×</button>
        </div>
        <div class="modal-body">
          <form>
            <div class="info-item">
              <label for="order-id">订单号:</label>
              <input type="text" id="order-id" :value="selectedOrder.order_id" readonly>
            </div>
            <div class="info-item">
              <label for="game-name">游戏名称:</label>
              <input type="text" id="game-name" :value="selectedOrder.game_name" readonly>
            </div>
            <div class="info-item">
              <label for="order-date">下单时间:</label>
              <input type="text" id="order-date" :value="selectedOrder.release_date" readonly>
            </div>
            <div class="info-item">
              <label for="order-status">订单状态:</label>
              <input type="text" id="order-status" :value="orderStatusMap[selectedOrder.status] || '未知状态'" readonly>
            </div>
            <div class="info-item">
              <label for="order-price">订单价格:</label>
              <input type="text" id="order-price" :value="selectedOrder.displayPrice" readonly>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 修改用户信息模态框 -->
    <div v-if="isEditModalOpen" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>修改用户信息</h3>
          <button class="close-btn" @click="closeEditModal">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitUpdateUserInfo">
            <div class="info-item">
              <label for="edit-username">用户名:</label>
              <input type="text" id="edit-username" v-model="editUsername" required>
            </div>
            <div class="info-item">
              <label for="edit-email">邮箱:</label>
              <input type="email" id="edit-email" v-model="editEmail" required>
            </div>
            <div class="info-item">
              <label for="edit-avatar">头像:</label>
              <div class="avatar-preview">
                <img :src="previewAvatar || userInfo.avatar || 'https://picsum.photos/200/200?random=avatar'" alt="头像预览" class="preview-img">
              </div>
              <input type="file" id="edit-avatar" accept="image/*" @change="handleAvatarUpload">
            </div>
            <div class="info-item">
              <label for="edit-password">密码:</label>
              <input type="password" id="edit-password" v-model="editPassword" required>
            </div>
            <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
            <div class="modal-footer">
              <button type="button" class="cancel-btn" @click="closeEditModal">取消</button>
              <button type="submit" class="confirm-btn">确定</button>
            </div>
          </form>
        </div>
      </div>
    </div>

 <!-- 购买确认模态框 -->
    <div v-if="isBuyModalOpen" class="modal-overlay" @click.self="closeBuyModal"> <!-- 修改为 closeBuyModal -->
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
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// 状态变量
const isLoggedIn = ref(localStorage.getItem('token') !== null); // 用户是否登录
if (!isLoggedIn.value) {
  alert('请先登录');
  window.location.href = '/Login-2';
}

// 状态变量
const userInfo = ref({}); // 用户信息
const activeTab = ref('all'); // 当前选择的游戏分类标签页
const purchasedGames = ref([]); // 用户购买的游戏列表
const wishlistGames = ref([]); // 愿望单中的游戏
const currentSection = ref('profile-section'); // 当前显示的内容区域

// 编辑模态框相关变量
const isEditModalOpen = ref(false);
const editUsername = ref('');
const editEmail = ref('');
const editPassword = ref('');
const previewAvatar = ref('');
const selectedAvatarFile = ref(null);
const errorMessage = ref('');

// 订单信息模态框相关变量
const isOrderModalOpen = ref(false);
const selectedOrder = ref({});

// 购买确认模态框相关变量
const isBuyModalOpen = ref(false);
const selectedGameToBuy = ref({});

// 游戏类型映射
const gameTypeMap = {
  '1': '大型网游',
  '2': '单机',
  '3': '动作RPG',
  '4': '独立游戏',
  '5': '生存',
  '6': 'FPS',
  '7': '二刺螈',
  '8': '模拟经营'
};

// 订单状态映射
const orderStatusMap = {
  0: '已取消',
  1: '已支付',
  2: '已发货',
  3: '已完成'
};

// 获取用户信息
const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('请先登录');
      return;
    }

    const response = await axios.get('http://localhost:3000/users/getUserInfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('获取用户信息:', response.data);
    userInfo.value = response.data.data[0] || {};
    console.log('用户信息:', userInfo.value);
    localStorage.setItem('username', response.data.data[0].username);
    localStorage.setItem('avater', response.data.data[0].avater);
    localStorage.setItem('email', response.data.data[0].email);
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

// 获取购买的游戏
const getPurchasedGames = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('请先登录');
      return;
    }

    const response = await axios.get('http://localhost:3000/users/order', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    purchasedGames.value = response.data.data || [];
  } catch (error) {
    console.error('获取购买的游戏失败:', error);
  }
};

// 获取愿望单
const getWishlist = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('请先登录');
      return;
    }

    const response = await axios.get('http://localhost:3000/users/myGame', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    wishlistGames.value = response.data.data || [];
  } catch (error) {
    console.error('获取愿望单失败:', error);
  }
};

// 从愿望单移除
const removeFromWishlist = async (game_id, gameName) => {
  if (!confirm(`确定要从愿望单中移除 "${gameName}" 吗？`)) {
    return;
  }
  console.log(`尝试从愿望单中移除游戏 ID: ${game_id}, 名称: ${gameName}`);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/users/myGame/deleteGame?game_id=${game_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data.msg);
    await getWishlist();
  } catch (error) {
    console.error('从愿望单移除失败:', error);
  }
};

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
    await getPurchasedGames();
    await getWishlist();
  } catch (error) {
    console.error('购买游戏失败:', error);
  }
};

// 切换内容区域
const changeSection = (section) => {
  currentSection.value = section;
};

// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('avatar');
  localStorage.removeItem('isAdmin');
  isLoggedIn.value = false;
  window.location.href = 'Home';
};

// 打开编辑模态框
const openEditModal = () => {
  editUsername.value = userInfo.value.username || '';
  editEmail.value = userInfo.value.email || '';
  editPassword.value = '';
  previewAvatar.value = '';
  selectedAvatarFile.value = null;
  errorMessage.value = '';
  isEditModalOpen.value = true;
};

// 关闭编辑模态框
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// 处理头像上传
const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedAvatarFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewAvatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 提交修改用户信息
const submitUpdateUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', editUsername.value);
    formData.append('email', editEmail.value);
    formData.append('password', editPassword.value);
    if (selectedAvatarFile.value) {
      formData.append('avatar', selectedAvatarFile.value);
    }

    const response = await axios.post('http://localhost:3000/users/updateUserInfo', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.code === 1) {
      await getUserInfo();
      closeEditModal();
      alert('用户信息修改成功');
    } else {
      errorMessage.value = response.data.msg || '修改失败，请重试';
    }
  } catch (error) {
    console.error('修改用户信息失败:', error);
    errorMessage.value = '网络错误，请重试';
  }
};

// 打开订单信息模态框
const openOrderModal = async (game) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/users/order/${game.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    selectedOrder.value = response.data.data[0] || {};
    if (typeof selectedOrder.value.price === 'number') {
      selectedOrder.value.displayPrice = selectedOrder.value.price.toFixed(2);
    } else {
      selectedOrder.value.displayPrice = 'N/A';
    }
    isOrderModalOpen.value = true;
  } catch (error) {
    console.error('获取订单信息失败:', error);
  }
};

// 关闭订单信息模态框
const closeOrderModal = () => {
  isOrderModalOpen.value = false;
};
// 打开购买确认模态框
const openBuyModal = (game) => {
  // 修改为赋值整个 game 对象
  selectedGameToBuy.value = game;
  isBuyModalOpen.value = true;
};

// 关闭购买确认模态框
const closeBuyModal = () => {
  isBuyModalOpen.value = false;
};

// 确认购买游戏
const confirmBuyGame = () => {
  buyGame(userInfo.value.username, selectedGameToBuy.value.game_name, selectedGameToBuy.value.price);
  closeBuyModal();
};

onMounted(async () => {
  if (isLoggedIn.value) {
    await getUserInfo();
    await getPurchasedGames();
    await getWishlist();
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
body {
            margin: 0; /* 去除body元素默认的外边距 */
            padding: 0;
        }

.body1 {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: #e2e8f0;
  line-height: 1.6;
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
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

.logout-btn {
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: #0f172a;
  border: none;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}

/* 个人中心内容样式 */
.profile-container {
  display: flex;
  gap: 30px;
  margin-top: 40px;
}

/* 左侧边栏 */
.profile-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.profile-card {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  border: 1px solid rgba(100, 130, 255, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.avatar-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 3px solid rgba(96, 165, 250, 0.5);
  background-color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-bottom: 15px;
  color: #f8fafc;
}

.user-email {
  font-size: 14px;
  color: #94a3b8;
}

.profile-menu {
  list-style: none;
}

.menu-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(100, 130, 255, 0.1);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
}

.menu-link:hover {
  color: #60a5fa;
}

.menu-link.active {
  color: #60a5fa;
  font-weight: 600;
}

.menu-icon {
  font-size: 20px;
}

/* 右侧主内容区 */
.buy-btn {
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}
.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}
.remove-btn {
  background: transparent;
  border: 1px solid #f472b6;
  color: #f472b6;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.remove-btn:hover {
  background: rgba(244, 114, 182, 0.1);
}
.profile-main {
  flex: 1;
}

.profile-section {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(100, 130, 255, 0.2);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #f8fafc;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  border-radius: 3px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  margin-bottom: 20px;
}

.info-label {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.info-value {
  font-size: 16px;
  color: #f8fafc;
  font-weight: 500;
}

.edit-btn {
  background: transparent;
  border: 1px solid #60a5fa;
  color: #60a5fa;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.edit-btn:hover {
  background: rgba(96, 165, 250, 0.1);
}

.game-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.game-card {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid rgba(100, 130, 255, 0.1);
  cursor: pointer;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-color: rgba(96, 165, 250, 0.3);
}

.game-cover {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.game-details {
  padding: 15px;
}

.game-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #f8fafc;
}

.game-date {
  font-size: 12px;
  color: #94a3b8;
}

.wishlist-content {
  text-align: center;
  padding: 40px 0;
}

.wishlist-content p {
  font-size: 18px;
  margin-bottom: 20px;
  color: #cbd5e1;
}

.wishlist-btn {
  display: inline-block;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.wishlist-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .search-bar {
    width: 200px;
  }

  .profile-container {
    flex-direction: column;
  }

  .profile-sidebar {
    width: 100%;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .search-bar {
    display: none;
  }

  .user-actions {
    display: none;
  }
}

/* 隐藏不需要的区块 */
.hidden {
  display: none;
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