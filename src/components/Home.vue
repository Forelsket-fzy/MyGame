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
          <div class="nav-links">
            <a href="./index">首页</a>
            <a href="./Home" :class="{ active: $route.path === '/Home' }">商城</a>
            <!-- 登录状态判断 -->
            <a href="./MyGames" :class="{ active: $route.path === '/MyGames' }" @click="goToMyGames">个人中心</a>
          </div>
          <div class="search-bar">
            <input v-model="searchQuery" type="text" placeholder="搜索游戏...">
            <button @click="searchGames">🔍</button>
          </div>
          <div class="user-actions">
            <!-- 登录状态 -->
            <template v-if="!isLoggedIn">
              <button class="login-btn nav-links"><a href="/Login-2">登录</a></button>
              <button class="login-btn nav-links"><a href="/admin-login">管理员登录</a></button>
            </template>
            <template v-else >
              <div class="user-info" @click="openUserMenu">
                <img :src="avatar || 'https://picsum.photos/200/200?random=avatar'" alt="" class="avatar">
                <span class="username">{{ username }}</span>
              </div>
              <button class="logout-btn nav-links" @click="logout">退出登录</button>
            </template>
          </div>
        </nav>
      </div>
    </header>

       <!-- 轮播图区域 -->
    <div class="container">
      <div class="banner">
        <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(slide, index) in slides" :key="index" class="slide" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), url(${slide.cover_image})` }">

          </div>
        </div>
        <div class="slide-controls">
          <span v-for="(_, index) in slides" :key="index" :class="{ active: currentSlide === index }" @click="goToSlide(index)" class="slide-indicator"></span>
        </div>
        <button class="prev-btn" @click="prevSlide">&lt;</button>
        <button class="next-btn" @click="nextSlide">&gt;</button>
      </div>
    </div>


    <!-- 游戏筛选标签栏 -->
    <div class="container">
      <div class="filter-tabs" id="filterTabs">
        <div v-for="tab in filterTabs" :key="tab.category" :class="{ active: currentCategory === tab.category }" @click="filterGames(tab.category)" class="filter-tab" :data-category="tab.category">{{ tab.label }}</div>
      </div>
      <!-- 游戏展示区 -->
      <div class="container">
        <section class="games-section">
          <div class="section-header">
            <h2 class="section-title">精选游戏</h2>
            <a href="#" class="view-all">查看全部 ></a>
          </div>
          <div class="games-grid" id="gamesGrid">
            <div v-for="game in games" :key="game.id" class="game-card">
              <div class="game-hover-info">
                <p>{{ game.description }}</p>
              </div>
              <div class="game-image" :style="{ backgroundImage: `url(${game.cover_image})` }" @click="inGame(game.game_id)"></div>
              <div class="game-details">
                <h3 class="game-title">{{ game.game_name }}</h3>
                <p class="game-type">{{ game.category }}</p>
                <div class="game-meta">
                  <div class="game-price">¥{{ game.price }} {{ game.originalPrice ? `<span style="text-decoration: line-through; color: #94a3b8; font-size: 14px;">${game.originalPrice}</span>` : '' }}</div>
                  <div class="game-rating">
                    {{ '★'.repeat(Math.floor(game.score)) }}{{ '☆'.repeat(5 - Math.floor(game.score)) }}
                    <span>{{ game.score }}</span>
                  </div>
                </div>
                <button @click="addToMyGames(game.game_id)" class="add-to-cart">加入愿望单</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 游戏展示区
    <div class="container">
      <section class="games-section">
        <div class="section-header">
          <h2 class="section-title">精选游戏</h2>
          <a href="#" class="view-all">查看全部 ></a>
        </div>
        <div class="games-grid" id="gamesGrid">
          <div v-for="game in games" :key="game.id" class="game-card">
            <div class="game-image" :style="{ backgroundImage: `url(${game.cover_image})` }"></div>
            <div class="game-details">
              <h3 class="game-title">{{ game.game_name }}</h3>
              <p class="game-description">{{ game.description }}</p>
              <div class="game-meta">
                <div class="game-price">{{ game.price }} {{ game.originalPrice ? `<span style="text-decoration: line-through; color: #94a3b8; font-size: 14px;">${game.originalPrice}</span>` : '' }}</div>
                <div class="game-rating">
                  {{ '★'.repeat(Math.floor(game.score)) }}{{ '☆'.repeat(5 - Math.floor(game.score)) }}
                  <span>{{ game.score }}</span>
                </div>
              </div>
              <button  @click="addToMyGames(game.id)" class="add-to-cart">加入购物车</button>
            </div>
          </div>
        </div>
      </section>
    </div> -->

    <!-- 页脚 -->
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>关于我们</h3>
            <ul class="footer-links">
              <li><a href="#">公司简介</a></li>
              <li><a href="#">团队介绍</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">加入我们</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>客户服务</h3>
            <ul class="footer-links">
              <li><a href="#">常见问题</a></li>
              <li><a href="#">退款政策</a></li>
              <li><a href="#">账号安全</a></li>
              <li><a href="#">使用条款</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>游戏资源</h3>
            <ul class="footer-links">
              <li><a href="#">游戏论坛</a></li>
              <li><a href="#">游戏攻略</a></li>
              <li><a href="#">补丁下载</a></li>
              <li><a href="#">社区活动</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>关注我们</h3>
            <ul class="footer-links">
              <li><a href="#">微博</a></li>
              <li><a href="#">微信</a></li>
              <li><a href="#">B站</a></li>
              <li><a href="#">抖音</a></li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          © 2023 GameHub 游戏商城. 保留所有权利。
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
// 状态变量
const isLoggedIn = ref(localStorage.getItem('token') !== null);
const searchQuery = ref('');
const games = ref([]);
const slides = ref([]);
const currentCategory = ref('all');
// const email = ref(localStorage.getItem('email'));
const avatar = ref(localStorage.getItem('avater') || 'https://picsum.photos/200/200?random=avatar');
console.log('当前头像:', avatar.value);
const username = ref(localStorage.getItem('username') || '');


const currentSlide = ref(0);
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


const inGame= (game_id) => {
  router.push({ name: 'gamexx', params: { game_id: game_id } });
};

const goToMyGames = () => {
  if (!isLoggedIn.value) {
    alert('请先登录');
    window.location.href = '/Login-2';
  } else {
    window.location.href = '/MyGames';
  }
};


// 搜索游戏
const searchGames = async () => {
  console.log('搜索游戏:', searchQuery.value);
  if (searchQuery.value) {
    try {
      const response = await axios.get(`http://localhost:3000/game/searchGame?gamename=${searchQuery.value}`);
      games.value = response.data.data;
    } catch (error) {
      console.error('搜索游戏失败:', error);
    }
  } else {
    await getGames();
  }
};

// 获取轮播图信息
const getSlideshow = async () => {
  try {
    const response = await axios.get('http://localhost:3000/game/slideshow?isshow=1');
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

// 通过游戏类型的不同筛选
const filterGames = async (category) => {
  currentCategory.value = category;
  if (category === 'all') {
    await getGames();
  } else {
    try {
      const response = await axios.get(`http://localhost:3000/game/gameCategory?category_id=${category}`);
      console.log('筛选游戏:', response.data);
      games.value = response.data.data;
    } catch (error) {
      console.error('筛选游戏失败:', error);
    }
  }
};

// 添加游戏到我的游戏列表
const addToMyGames = (game_id) => {
  if (!isLoggedIn.value) {
    alert('请先登录');
    window.location.href = '/Login-2';
  }
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) {
    axios.get(`http://localhost:3000/users/myGame/addGame?game_id=${game_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        alert(`添加到愿望单列表成功`);
        console.log(response.data.msg);
      })
      .catch(error => {
        console.error('添加游戏到我的游戏列表失败:', error);
      });
  } else {
    console.log('请先登录');
  }
};

// 购买游戏
const purchaseGame = (gameName) => {
  const token = localStorage.getItem('token');
  if (token) {
    const username = localStorage.getItem('username');
    axios.post('http://localhost:3000/users/order/shopping', {
      username,
      gamename: gameName
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data.msg);
      })
      .catch(error => {
        console.error('购买游戏失败:', error);
      });
  } else {
    console.log('请先登录');
  }
};

// 切换到指定幻灯片
const goToSlide = (index) => {
  currentSlide.value = index;
};

// 上一张幻灯片
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

// 下一张幻灯片
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

// 自动轮播
const autoSlide = () => {
  setInterval(() => {
    nextSlide();
  }, 5000);
};

onMounted(async () => {
  await getSlideshow();
  await getGames();
  autoSlide();
});

// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('isAdmin');
  isLoggedIn.value = false;
};

// 跳转到登录页
const goToLogin = () => {
  window.location.href = '/Login-2';
};

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
            margin-top: 0;
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
        
        .search-bar {
            display: flex;
            align-items: center;
            background: rgba(30, 41, 59, 0.7);
            border-radius: 30px;
            padding: 8px 15px;
            width: 300px;
            border: 1px solid rgba(100, 130, 255, 0.2);
        }
        
        .search-bar input {
            background: transparent;
            border: none;
            color: #e2e8f0;
            width: 100%;
            outline: none;
            font-size: 16px;
        }
        
        .search-bar button {
            background: transparent;
            border: none;
            color: #60a5fa;
            cursor: pointer;
            font-size: 18px;
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
            .avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
        }
        
        .login-btn {
            background: transparent;
            color: #60a5fa;
            border-color: #60a5fa;
        }
        
        .login-btn:hover {
            background: rgba(96, 165, 250, 0.1);
        }
        
        .signup-btn {
            background: linear-gradient(90deg, #60a5fa, #f472b6);
            color: #0f172a;
            border: none;
        }
        
        .signup-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
        }
        
        /* 轮播图样式 */
       .banner {
  margin: 20px 0 40px;
  position: relative;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.slides {
  height: 100%;
  display: flex;
  transition: transform 1s ease-in-out;
}

.slide {
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 80px;
}



.slide-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.slide-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}

.slide-indicator.active {
  background: #60a5fa;
  transform: scale(1.2);
}

.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}
        /* 标签筛选栏 */
        .filter-tabs {
            display: flex;
            gap: 15px;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        
        .filter-tab {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(100, 130, 255, 0.2);
            color: #94a3b8;
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .filter-tab.active, .filter-tab:hover {
            background: linear-gradient(90deg, #60a5fa, #f472b6);
            color: #0f172a;
            border-color: transparent;
        }
        
 /* 游戏展示区 */
.games-section {
    margin: 30px 0 60px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.section-title {
    font-size: 28px;
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

.view-all {
    color: #60a5fa;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.3s;
}

.view-all:hover {
    text-decoration: underline;
}

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
}

.game-card {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s;
    border: 1px solid rgba(100, 130, 255, 0.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    position: relative;
    isolation: isolate; /* 建立堆叠上下文，防止样式穿透 */
}

.game-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(96, 165, 250, 0.3);
}

.game-image {
    height: 180px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.game-details {
    padding: 20px;
}

.game-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #f8fafc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.game-type {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 15px;
}

.game-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.game-price {
    font-size: 20px;
    font-weight: 700;
    color: #60a5fa;
}

.game-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fbbf24;
}

.add-to-cart {
    width: 100%;
    padding: 10px;
    background: rgba(96, 165, 250, 0.1);
    color: #60a5fa;
    border: 1px solid #60a5fa;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0s;
    position: relative; /* 确保按钮可以进行定位调整 */
    z-index: 1; /* 初始层级 */
}

.add-to-cart:hover {
    background: linear-gradient(90deg, #60a5fa, #f472b6);
    color: #0f172a;
    border-color: transparent;
}

.game-hover-info {
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 70%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px;
    opacity: 0;
    transition: all 0.3s;
    overflow-y: auto;
    z-index: 0; /* 确保介绍信息在按钮下方 */
}

.game-image:hover .add-to-cart.game-hover-info {
    bottom: 0;
    opacity: 1;
}

.game-image.add-to-cart .game-title,
.game-card:hover .game-type {
    display: none;
}

.game-image:hover .add-to-cart {
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  width: 70%;
    position: absolute;
    top: 10px; /* 调整按钮到框体最上面 */
    left: 50px;
    right: 20px;
    z-index: 2; /* 提高按钮层级，使其在介绍信息之上 */
}
/* 页脚样式 */
footer {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(10px);
    padding: 60px 0 30px;
            margin-top: 60px;
            border-top: 1px solid rgba(100, 130, 255, 0.2);
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
        }
        
        .footer-column h3 {
            font-size: 18px;
            margin-bottom: 20px;
            color: #f8fafc;
            position: relative;
            padding-bottom: 10px;
        }
        
        .footer-column h3::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background: #60a5fa;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 12px;
        }
        
        .footer-links a {
            color: #94a3b8;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: #60a5fa;
        }
        
        .copyright {
            text-align: center;
            padding-top: 30px;
            color: #94a3b8;
            font-size: 14px;
            border-top: 1px solid rgba(100, 130, 255, 0.1);
            margin-top: 30px;
        }
        
        /* 响应式设计 */
        @media (max-width: 900px) {
            .nav-links {
                display: none;
            }
            
            .search-bar {
                width: 200px;
            }
            
            .slide {
                padding: 0 30px;
            }
            
            .slide-content {
                max-width: 100%;
            }
        }
        
        @media (max-width: 600px) {
            .search-bar {
                display: none;
            }
            
            .user-actions {
                display: none;
            }
            
            .banner {
                height: 400px;
            }
            
            .slide-title {
                font-size: 32px;
            }
            
            .slide-subtitle {
                font-size: 16px;
            }
            
            .games-grid {
                grid-template-columns: 1fr;
            }
        }

</style>
