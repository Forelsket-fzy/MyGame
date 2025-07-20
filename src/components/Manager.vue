<template>
  <div class="body">
    <!-- 顶部导航栏 -->
    <header>
      <div class="container">
        <nav>
          <a href="#" class="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            My<span>Game</span>
          </a>
          <div class="nav-links ">
            <a href="#" @click="changeSection('user-management')">用户管理</a>
            <a href="#" @click="changeSection('slideshow-management')">轮播图管理</a>
            <a href="#" @click="changeSection('game-management')">游戏管理</a>
          </div>
          <div class="user-actions">
            <button class="logout-btn nav-links" @click="logout">退出管理员系统</button>
          </div>
        </nav>
      </div>
    </header>

    <!-- 主内容区域 -->
    <div class="container main-content">
      <!-- 用户管理 -->
      <div v-if="currentSection === 'user-management'" class="profile-section table-style">
        <h2 class="section-title">用户管理</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>用户名</th>
                <th>邮箱</th>
                <th>注册时间</th>
                <th>用户状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ new Date(user.create_time).toLocaleString() }}</td>
                <td>{{ user.status === 0 ? '普通用户' : '管理员' }}</td>
                <td>
                  <button @click="deleteUser(user.username)" class="action-btn delete-btn">删除</button>
                  <button @click="banUser(user.user_id, user.status)" class="action-btn status-btn">
                    {{ user.status === 0 ? '设为管理员' : '设为普通用户' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="openAddUserModal" class="add-btn">增加用户</button>
        </div>
      </div>
<!-- 添加用户模态框 -->
<div v-if="isAddUserModalOpen" class="modal-overlay" @click.self="closeAddUserModal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>添加用户</h3>
      <button class="close-btn" @click="closeAddUserModal"></button>
    </div>
    <div class="modal-body">
      <form @submit.prevent="submitAddUser">
        <div class="info-item">
          <label for="add-user-username">用户名:</label>
          <input type="text" id="add-user-username" v-model="addUser.username" required>
        </div>
        <div class="info-item">
          <label for="add-user-email">邮箱:</label>
          <input type="email" id="add-user-email" v-model="addUser.email" required>
        </div>
        <div class="info-item">
          <label for="add-user-password">密码:</label>
          <input type="password" id="add-user-password" v-model="addUser.password" required>
        </div>
        <div class="info-item">
          <label for="add-user-status">用户状态:</label>
          <select id="add-user-status" v-model="addUser.status">
            <option value="0">普通用户</option>
            <option value="1">管理员</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="cancel-btn" @click="closeAddUserModal">取消</button>
          <button type="submit" class="confirm-btn" >确定</button>
        </div>
      </form>
    </div>
  </div>
</div>
      <!-- 轮播图管理 -->
      <div v-if="currentSection === 'slideshow-management'" class="profile-section slideshow-style">
        <h2 class="section-title">轮播图管理</h2>
        <div class="slides-container">
          <div v-for="(slide, index) in slides" :key="index" class="slide-item">
            <div class="slide-image-container">
              <img :src="slide.cover_image" alt="轮播图" class="slide-image">
            </div>
            <div class="slide-info-container">
              <button @click="updateSlideStatus(slide.game_id, slide.isshow)" class="slide-status-btn">
                {{ slide.isshow ? '已轮播' : '未轮播' }}
              </button>
            </div>
          </div>
        </div>
        <button @click="openAddSlideModal" class="add-btn">增加轮播图</button>
        <!-- 增加轮播图模态框 -->
        <div v-if="isAddSlideModalOpen" class="modal-overlay" @click.self="closeAddSlideModal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>增加轮播图</h3>
              <button class="close-btn" @click="closeAddSlideModal">×</button>
            </div>
            <div class="modal-body">
              <input type="file" @change="handleSlideUpload">
              <button @click="submitAddSlide">确定</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏管理 -->
      <div v-if="currentSection === 'game-management'" class="profile-section table-style">
        <h2 class="section-title">游戏管理</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>游戏名</th>
                <th>游戏介绍</th>
                <th>发行时间</th>
                <th>评分</th>
                <th>封面</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game, index) in games" :key="index">
                <td>{{ game.game_name }}</td>
                <td class="description-cell">{{ game.description.substring(0, 50) }}{{ game.description.length > 50 ? '...' : '' }}</td>
                <td>{{ new Date(game.release_date).toLocaleString() }}</td>
                <td>{{ game.score }}</td>
                <td><img :src="game.cover_image" alt="游戏封面" class="game-cover-thumb"></td>
                <td><button @click="deleteGame(game.game_id)" class="action-btn delete-btn">删除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button @click="openAddGameModal" class="add-btn">添加游戏</button>


        <!-- 添加游戏信息模态框 -->
        <div v-if="isAddGameModalOpen" class="modal-overlay" @click.self="closeAddGameModal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>添加游戏信息</h3>
              <button class="close-btn" @click="closeAddGameModal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitAddGame">
                <div class="info-item">
                  <label for="add-game-name">游戏名:</label>
                  <input type="text" id="add-game-name" v-model="addGame.gamename" required>
                </div>
                <div class="info-item">
                  <label for="add-game-category">游戏分类:</label>
                  <input type="text" id="add-game-category" v-model="addGame.game_category" required>
                </div>
                <div class="info-item">
                  <label for="add-game-price">游戏价格:</label>
                  <input type="number" id="add-game-price" v-model="addGame.price" required>
                </div>
                <div class="info-item">
                  <label for="add-game-rating">游戏评分:</label>
                  <input type="number" id="add-game-rating" v-model="addGame.score" required>
                </div>
                <div class="info-item">
                  <label for="add-game-cover">游戏图片:</label>
                  <input type="file" id="add-game-cover" accept="image/*" @change="handleAddGameCoverUpload">
                </div>
                <div class="info-item">
                  <label for="add-game-description">游戏介绍:</label>
                  <textarea id="add-game-description" v-model="addGame.description" required></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="cancel-btn" @click="closeAddGameModal">取消</button>
                  <button type="submit" class="confirm-btn">确定</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 状态变量
const currentSection = ref('user-management');
const users = ref([]);
const slides = ref([]);
const games = ref([]);
const isAddSlideModalOpen = ref(false);
const isAddGameModalOpen = ref(false);
const isAddUserModalOpen = ref(false); 
const addGame = ref({
  gamename: '',
  game_category: '',
  price: 0,
  score: 0,
  cover_image: null,
  description: ''
});
const addUser = ref({ // 新增添加用户对象
  username: '',
  email: '',
  password: '',
  status: 0
});
const selectedSlideFile = ref(null);
const selectedAddGameCoverFile = ref(null);


const deleteGame = async (game_id) => {
  try {
    await axios.get(`http://localhost:3000/admin/deleteGame?game_id=${game_id}`);
    await getGames(); // 刷新游戏列表
  } catch (error) {
    console.error('删除游戏失败:', error);
  }
};

// 打开添加用户模态框
const openAddUserModal = () => {
   console.log('当前section:', currentSection.value);
  isAddUserModalOpen.value = true;
  console.log('isAddUserModalOpen:', isAddUserModalOpen.value);
};

// 关闭添加用户模态框
const closeAddUserModal = () => {
  isAddUserModalOpen.value = false;
  addUser.value = {
    username: '',
    email: '',
    password: '',
    status: 0
  };
};

// 提交添加用户信息
const submitAddUser = async () => {
  try {
    await axios.post('http://localhost:3000/users/register', {
      username: addUser.value.username,
      email: addUser.value.email,
      password: addUser.value.password,
      status: addUser.value.status
    });
    closeAddUserModal();
    await getUsers();
  } catch (error) {
    console.error('添加用户失败:', error);
  }
};

// 删除用户
const deleteUser = async (username) => {
  try {
    await axios.get(`http://localhost:3000/admin/deleteUser?username=${username}`);
    await getUsers(); // 刷新用户列表
  } catch (error) {
    ElMessage.error('删除用户失败：' + error.message);
  }
};

// 更换用户状态
const banUser = async (user_id, currentStatus) => {
  try {
    await axios.post(`http://localhost:3000/admin/updateUserInfo`, {
      user_id: user_id,
      status: currentStatus
    });
    await getUsers(); // 刷新用户列表
  } catch (error) {
    ElMessage.error('更新用户状态失败：' + error.message);
  }
};

// 获取用户信息
const getUsers = async () => {
  try {
    console.log('获取用户信息');
    const response = await axios.get('http://localhost:3000/admin/getAllUser');
    console.log(response.data.data);
    users.value = response.data.data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

// 获取轮播图信息
const getSlides = async () => {
  try {
    const response = await axios.get('http://localhost:3000/admin/gameInfo');
    slides.value = response.data.data;
  } catch (error) {
    console.error('获取轮播图信息失败:', error);
  }
};

// 获取游戏信息
const getGames = async () => {
  try {
    const response = await axios.get('http://localhost:3000/admin/gameInfo');
    games.value = response.data.data;
  } catch (error) {
    console.error('获取游戏信息失败:', error);
  }
};

// 切换内容区域
const changeSection = (section) => {
  currentSection.value = section;
};

// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('status');
  window.location.href = '/admin-login';
};

// 打开增加轮播图模态框
const openAddSlideModal = () => {
  isAddSlideModalOpen.value = true;
};

// 关闭增加轮播图模态框
const closeAddSlideModal = () => {
  isAddSlideModalOpen.value = false;
  selectedSlideFile.value = null;
};

// 处理轮播图上传
const handleSlideUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedSlideFile.value = file;
  }
};

// 提交增加轮播图
const submitAddSlide = async () => {
  if (selectedSlideFile.value) {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', selectedSlideFile.value);
      await axios.post('http://localhost:3000/game/slideshow/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      closeAddSlideModal();
      await getSlides();
    } catch (error) {
      console.error('增加轮播图失败:', error);
    }
  }
};

// 更新轮播图状态
const updateSlideStatus = async (game_id, isshow) => {
  try {
    await axios.post(`http://localhost:3000/admin/UpdateSlide`, {
      game_id: game_id,
      isshow: isshow
    });
    await getSlides();
  } catch (error) {
    console.error('更新轮播图状态失败:', error);
  }
};
// 打开添加游戏信息模态框
const openAddGameModal = () => {
  isAddGameModalOpen.value = true;
};

// 关闭添加游戏信息模态框
const closeAddGameModal = () => {
  isAddGameModalOpen.value = false;
  selectedAddGameCoverFile.value = null;
  addGame.value = {
    gamename: '',
    game_category: '',
    price: 0,
    score: 0,
    cover_image: null,
    description: ''
  };
};

// 处理添加游戏封面上传
const handleAddGameCoverUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedAddGameCoverFile.value = file;
  }
};

// 提交添加游戏信息
const submitAddGame = async () => {
  try {
    const formData = new FormData();
    formData.append('gamename', addGame.value.gamename);
    formData.append('game_category', addGame.value.game_category);
    formData.append('price', addGame.value.price);
    formData.append('score', addGame.value.score);
    formData.append('description', addGame.value.description);
    if (selectedAddGameCoverFile.value) {
      formData.append('cover_image', selectedAddGameCoverFile.value);
    }
    console.log('提交的表单数据:', formData);
    await axios.post('http://localhost:3000/admin/addGame', formData, {

    });
    closeAddGameModal();
    await getGames();
  } catch (error) {
    console.error('添加游戏信息失败:', error);
  }
};

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('请先登录');
    window.location.href = '/admin-login';
  }
  await getUsers();
  await getSlides();
  await getGames();
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
  display: flex;
  flex-direction: column;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.main-content {
  display: flex;
  gap: 20px;
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
  margin-top: 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #60a5fa;
}

.logo span {
  color: #f472b6;
}

/* 修改导航链接样式 */
.nav-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap; /* 允许链接换行 */
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-links a:hover {
  color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.1);
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

.logout-btn {
  background: transparent;
  color: #60a5fa;
  border-color: #60a5fa;
}

.logout-btn:hover {
  background: rgba(96, 165, 250, 0.1);
}

/* 主内容区域样式 */
.profile-section {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 15px;
  padding: 30px;
  margin-top: 40px;
  flex: 1;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #f8fafc;
}

/* 表格样式 */
.table-style .table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid rgba(100, 130, 255, 0.2);
}

.data-table th {
  background-color: rgba(15, 23, 42, 0.5);
  font-weight: 600;
}

.data-table tr:hover {
  background-color: rgba(96, 165, 250, 0.05);
}

.action-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 8px;
  border: none;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.delete-btn:hover {
  background-color: #dc2626;
}

.status-btn {
  background-color: #60a5fa;
  color: #0f172a;
}

.status-btn:hover {
  background-color: #3b82f6;
}

.edit-btn {
  background-color: #f59e0b;
  color: #0f172a;
}

.edit-btn:hover {
  background-color: #d97706;
}

.description-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-cover-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

/* 轮播图样式 */
.slideshow-style .slides-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.slide-item {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  transition: all 0.3s;
}

.slide-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.slide-image-container {
  flex: 2;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-info-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.slide-status-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: #0f172a;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.slide-status-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}

.add-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  color: #0f172a;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgba(30, 41, 59, 0.85);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 130, 255, 0.2);
  padding: 30px;
  width: 90%;
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 22px;
  font-weight: 600;
  color: #f8fafc;
}

.close-btn {
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 15px;
}

.info-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #cbd5e1;
  font-size: 14px;
}

.info-item input,
.info-item textarea {
  width: 100%;
  padding: 10px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(100, 130, 255, 0.2);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 16px;
  transition: all 0.3s;
}

.info-item input:focus,
.info-item textarea:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.cancel-btn,
.confirm-btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background: transparent;
  color: #60a5fa;
  border-color: #60a5fa;
}

.cancel-btn:hover {
  background: rgba(96, 165, 250, 0.1);
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
</style>