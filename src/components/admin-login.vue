<template>
  <div class="body">
      <div class="container">
          <div class="login-container">
              <!-- 左侧装饰区域 -->
              <div class="login-left">
                  <div class="login-left-content">
                      <h1 class="login-title">欢迎回来</h1>
                      <p class="login-subtitle">登录您的MyGame管理员账户，管理MyGame相关内容</p>
                      <ul class="features">
                          <li class="feature">
                              <div class="feature-icon">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                      <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                                      <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                                      <circle cx="12" cy="20" r="1"></circle>
                                  </svg>
                              </div>
                              <div class="feature-text">
                                  <h3>云存档同步</h3>
                                  <p>随时随地继续您的进度</p>
                              </div>
                          </li>
                          <li class="feature">
                              <div class="feature-icon">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line x1="12" y1="8" x2="12" y2="12"></line>
                                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                  </svg>
                              </div>
                              <div class="feature-text">
                                  <h3>专属操作</h3>
                                  <p>管理员进行操作，管理游戏内容</p>
                              </div>
                          </li>
                          <li class="feature">
                              <div class="feature-icon">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                  </svg>
                              </div>
                              <div class="feature-text">
                                  <h3>更新用户</h3>
                                  <p>更新用户信息</p>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>

              <!-- 右侧登录表单 -->
              <div class="login-right">
                  <div class="login-header">
                      <div class="login-logo">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                          </svg>
                          My<span>Game</span>
                      </div>
                      <h2 class="welcome-text">登录您的管理员账户</h2>
                      <p class="login-instruction">请填写以下信息以继续</p>
                  </div>

                  <form class="login-form" @submit.prevent="handleLogin">
                      <div class="form-group">
                          <label for="adminNickname" class="form-label">管理员昵称/邮箱</label>
                          <div class="input-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                          </div>
                          <input
                              type="text"
                              id="adminNickname"
                              class="form-input"
                              v-model="username"
                              placeholder="请输入您的管理员昵称/邮箱"
                              @blur="validateUsernameOnBlur('login')"
                              required
                          >
                          <span v-if="loginErrors.username" class="error-message">{{ loginErrors.username }}</span>
                      </div>

                      <div class="form-group">
                          <label for="password" class="form-label">密码</label>
                          <div class="input-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                          </div>
                          <input
                              type="password"
                              id="password"
                              class="form-input"
                              v-model="password"
                              placeholder="请输入您的密码"
                              @blur="validatePasswordOnBlur('login')"
                              required
                          >
                          <span v-if="loginErrors.password" class="error-message">{{ loginErrors.password }}</span>
                      </div>

                      <div class="form-options">
                          <label class="remember-me">
                              <input type="checkbox" v-model="rememberMe">
                              记住我
                          </label>
                          <a href="#" class="forgot-password">忘记密码?</a>
                      </div>
                      <div style="display: flex; gap: 10px;">
                          <button type="submit" class="login-btn" :disabled="isLoading">
                              {{ isLoading ? '登录中...' : '登录' }}
                          </button>
                          <button type="button" class="login-btn" @click="cancelLogin">取消登录</button>
                      </div>
                      <span v-if="loginError" class="error-message">{{ loginError }}</span>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

// 定义响应式数据
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const loginErrors = reactive({
  username: '',
  password: ''
});
const loginError = ref('');
const isLoading = ref(false);

// 验证用户名
const validateUsername = () => {
  if (!username.value.trim()) {
      return '用户名不能为空';
  }
  return '';
};

// 验证密码
const validatePassword = () => {
  if (!password.value.trim()) {
      return '密码不能为空';
  } else if (password.value.length < 6) {
      return '密码长度不能少于6位';
  }
  return '';
};

// 用户名失去焦点验证
const validateUsernameOnBlur = (formType) => {
  if (username.value.trim()) {
      if (formType === 'login') {
          loginErrors.username = validateUsername();
      }
  }
};

// 密码失去焦点验证
const validatePasswordOnBlur = (formType) => {
  if (password.value.trim()) {
      if (formType === 'login') {
          loginErrors.password = validatePassword();
      }
  }
};

// 登录表单整体验证
const validateLoginForm = () => {
  loginErrors.username = validateUsername();
  loginErrors.password = validatePassword();

  return !loginErrors.username && !loginErrors.password;
};

// 处理登录
const handleLogin = async () => {
  // 重置之前的登录错误
  loginError.value = '';

  // 进行表单验证
  if (!validateLoginForm()) {
      return;
  }

  isLoading.value = true;

  try {
      // 发送登录请求
      const response = await axios.post('http://localhost:3000/admin/Login', {
          username: username.value,
          password: password.value
      });

      if (response.data.code === 400) {
          loginError.value = '用户不存在';
      } else if (response.data.code === "200") {
          if (response.data.status === 1) {
              // 登录成功且为管理员
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('username', response.data.username);
              localStorage.setItem('status', response.data.status);

              localStorage.setItem('avatar', response.data.avatar);

              // 跳转到管理员界面
              window.location.href = '/Manager';
          } else {
              // 不是管理员
              loginError.value = '您不是管理员';
              setTimeout(() => {
                  window.location.href = '/Login-2';
              }, 2000);
          }
      } else {
          loginError.value = '登录失败，请检查用户名和密码';
      }
  } catch (error) {
      // 登录失败
      console.error('登录失败:', error);
      loginError.value = error.response?.data?.message || '登录失败，请检查用户名和密码';
  } finally {
      isLoading.value = false;
  }
};

// 取消登录
const cancelLogin = () => {
  window.location.href = '/Home';
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

/* 基础样式 */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 可选：隐藏滚动条 */
}

.body {
  /* 2. 铺满页面的核心样式 */
  position: fixed; /* 固定定位，相对于视口 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0f172a, #152032);
  color: #e2e8f0;
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box; /* 内边距包含在尺寸内 */
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: center;
}

/* 登录卡片样式 */
.login-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: rgba(30, 41, 59, 0.85);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 130, 255, 0.2);
}

/* 左侧装饰区域 */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(244, 114, 182, 0.15)),
  url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9));
}

.login-left-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.login-title {
  font-size: 36px;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #60a5fa, #f472b6);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-subtitle {
  font-size: 18px;
  color: #cbd5e1;
  margin-bottom: 30px;
  max-width: 400px;
}

.features {
  list-style: none;
  text-align: left;
  margin-top: 40px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #f472b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.feature-text h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #f8fafc;
}

.feature-text p {
  font-size: 14px;
  color: #94a3b8;
}

/* 右侧表单区域 */
.login-right {
  flex: 1;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #60a5fa;
  margin-bottom: 20px;
}

.login-logo span {
  color: #f472b6;
}

.welcome-text {
  font-size: 24px;
  margin-bottom: 10px;
  color: #f8fafc;
}

.login-instruction {
  color: #94a3b8;
  font-size: 16px;
}

/* 表单样式 */
.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
  position: relative;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #cbd5e1;
  font-size: 14px;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 40px;
  color: #94a3b8;
}

.form-input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(100, 130, 255, 0.2);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 16px;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
}

.remember-me input {
  accent-color: #60a5fa;
}

.forgot-password {
  color: #60a5fa;
  text-decoration: none;
  transition: all 0.3s;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  padding: 10px 20px;
  background-color: #60a5fa;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #3b82f6;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
      flex-direction: column;
  }

  .login-left {
      padding: 40px 20px;
      display: none; /* 在移动设备上隐藏左侧区域 */
  }

  .login-right {
      padding: 40px 30px;
  }
}

@media (max-width: 480px) {
  .form-options {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
  }

  .social-login {
      flex-direction: column;
  }
}
</style>