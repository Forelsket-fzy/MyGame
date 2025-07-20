<template>
    <div class="body">
      <div class="container">
        <div class="form-box">
          <!-- 注册表单 -->
          <div class="register-box hidden">
            <h1>创建账户</h1>
            
            <div class="input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" class="input-icon">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input type="text" placeholder="用户名" v-model="username" @blur="validateUsernameOnBlur('register')">
              <!-- 用户名错误提示 -->
              <div v-if="registerErrors.username" class="error-message">
                {{ registerErrors.username }}
              </div>
            </div>
            
            <div class="input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" class="input-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input type="email" placeholder="邮箱" v-model="email" @blur="validateEmailOnBlur">
              <!-- 邮箱错误提示 -->
              <div v-if="registerErrors.email" class="error-message">
                {{ registerErrors.email }}
              </div>
            </div>
            
            <div class="input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" class="input-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input type="password" placeholder="密码" v-model="password" @blur="validatePasswordOnBlur('register')">
              <!-- 密码错误提示 -->
              <div v-if="registerErrors.password" class="error-message">
                {{ registerErrors.password }}
              </div>
            </div>
            
            <div class="input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" class="input-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input type="password" placeholder="确认密码" v-model="confirmPassword" @blur="validateConfirmPasswordOnBlur">
              <!-- 确认密码错误提示 -->
              <div v-if="registerErrors.confirmPassword" class="error-message">
                {{ registerErrors.confirmPassword }}
              </div>
            </div>
            
            <button @click="handleRegister">立即注册</button>
            <button type="button" @click="resetRegisterForm" class="reset-btn">重置</button>
          </div>
          
          <!-- 登录表单 -->
          <div class="login-box">
            <h1>欢迎回来</h1>
            
            <div class="input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" class="input-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9h2v2h-2zm0-4h2v2h-2zm0 8h2v2h-2z"></path>
              </svg>
              <input type="text" placeholder="用户名/邮箱" v-model="username" @blur="validateUsernameOnBlur('login')">
              <!-- 用户名错误提示 -->
              <div v-if="loginErrors.username" class="error-message">
                {{ loginErrors.username }}
              </div>
            </div>
            
            <div class="input-group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" class="input-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input type="password" placeholder="密码" v-model="password" @blur="validatePasswordOnBlur('login')">
              <!-- 密码错误提示 -->
              <div v-if="loginErrors.password" class="error-message">
                {{ loginErrors.password }}
              </div>
            </div>
            
            <button @click="handleLogin">登录账户</button>
            <button type="button" @click="resetLoginForm" class="reset-btn">重置</button>
            <button type="button" @click="cancelLogin">取消登录</button>
          </div>
        </div>
        
        <!-- 左侧内容 -->
        <div class="con-box left">
          <h2>欢迎来到<span>MyGame</span></h2>
          <p>探索数千款游戏，开启您的<span>游戏之旅</span></p>
          
          <div class="game-features">
            <div class="feature">
              <i class="fa-solid fa-tags"></i>
              <p>独家折扣</p>
            </div>
            <div class="feature">
              <i class="fa-solid fa-gift"></i>
              <p>免费游戏</p>
            </div>
            <div class="feature">
              <i class="fa-solid fa-download"></i>
              <p>一键下载</p>
            </div>
            <div class="feature">
              <i class="fa-solid fa-trophy"></i>
              <p>成就系统</p>
            </div>
          </div>
          
          <p>已有账号？立即登录</p>
          <button id="login" @click="goToLogin">登录账户</button>
        </div>
        
        <!-- 右侧内容 -->
        <div class="con-box right">
          <h2>欢迎加入<span>MyGame</span></h2>
          <p>注册账户，获取<span>专属福利</span></p>
          
          <div class="game-features">
            <div class="feature">
              <i class="fa-solid fa-coins"></i>
              <p>注册奖励</p>
            </div>
            <div class="feature">
              <i class="fa-solid fa-calendar-check"></i>
              <p>每日签到</p>
            </div>
            <div class="feature">
              <i class="fa-solid fa-users"></i>
              <p>社区活动</p>
            </div>
            <div class="feature">
              <i class="fa-solid fa-bell"></i>
              <p>独家通知</p>
            </div>
          </div>
          
          <p>还没有账号？立即加入</p>
          <button id="register" @click="goToRegister">注册账户</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        loginErrors: {
          username: '',
          password: ''
        },
        registerErrors: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        loginError: ''
      };
    },
    methods: {
      // 验证用户名
      validateUsername() {
        if (!this.username.trim()) {
          return '用户名不能为空';
        }
        return '';
      },
      
      // 验证密码
      validatePassword() {
        if (!this.password.trim()) {
          return '密码不能为空';
        } else if (this.password.length < 6) {
          return '密码长度不能少于6位';
        }
        return '';
      },
      
      // 验证邮箱
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.email.trim()) {
          return '邮箱不能为空';
        } else if (!emailRegex.test(this.email)) {
          return '请输入有效的邮箱地址';
        }
        return '';
      },
      
      // 验证确认密码
      validateConfirmPassword() {
        if (this.password !== this.confirmPassword) {
          return '两次输入的密码不一致';
        }
        return '';
      },
      
      // 用户名失去焦点验证
      validateUsernameOnBlur(formType) {
        if (this.username.trim()) {
          if (formType === 'login') {
            this.loginErrors.username = this.validateUsername();
          } else {
            this.registerErrors.username = this.validateUsername();
          }
        }
      },
      
      // 邮箱失去焦点验证
      validateEmailOnBlur() {
        if (this.email.trim()) {
          this.registerErrors.email = this.validateEmail();
        }
      },
      
      // 密码失去焦点验证
      validatePasswordOnBlur(formType) {
        if (this.password.trim()) {
          if (formType === 'login') {
            this.loginErrors.password = this.validatePassword();
          } else {
            this.registerErrors.password = this.validatePassword();
          }
        }
      },
      
      // 确认密码失去焦点验证
      validateConfirmPasswordOnBlur() {
        if (this.confirmPassword.trim()) {
          this.registerErrors.confirmPassword = this.validateConfirmPassword();
        }
      },
      
      // 登录表单整体验证
      validateLoginForm() {
        this.loginErrors.username = this.validateUsername();
        this.loginErrors.password = this.validatePassword();
        
        return !this.loginErrors.username && !this.loginErrors.password;
      },
      
      // 注册表单整体验证
      validateRegisterForm() {
        this.registerErrors.username = this.validateUsername();
        this.registerErrors.email = this.validateEmail();
        this.registerErrors.password = this.validatePassword();
        this.registerErrors.confirmPassword = this.validateConfirmPassword();
        
        return !this.registerErrors.username && !this.registerErrors.email && !this.registerErrors.password && !this.registerErrors.confirmPassword;
      },
      
      // 处理登录
      async handleLogin() {
        // 重置之前的登录错误
        this.loginError = '';
        
        // 进行表单验证
        if (!this.validateLoginForm()) {
          return;
        }
        
        try {
          // 显示加载状态
          const response = await axios.post('http://localhost:3000/users/login', {
            username: this.username,
            password: this.password
          });
           // 登录成功
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', this.username);
          localStorage.setItem('avater', response.data.avater || 'https://picsum.photos/200/200?random=avatar');
          window.location.href = '/Home';
          // 登录成功
        
      } catch (error) {
        console.error('登录失败:', error);
    console.error('错误信息:', error.message);
    console.error('错误响应:', error.response);
        // 登录失败
        console.error('登录失败:', error);
        this.loginError = error.response?.data?.message || '登录失败，请检查用户名和密码';
      }
    },
  
      // 处理注册
      async handleRegister() {
        // 进行表单验证
        if (!this.validateRegisterForm()) {
          return;
        }
        
        try {
          const response = await axios.post('http://localhost:3000/users/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/Home');
        } catch (error) {
          console.error('注册失败:', error.response.data.message);
        }
      },
      
      // 重置登录表单
      resetLoginForm() {
        this.username = '';
        this.password = '';
        this.rememberMe = false;
        this.loginErrors = {
          username: '',
          password: ''
        };
        this.loginError = '';
      },
      
      // 重置注册表单
      resetRegisterForm() {
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.registerErrors = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      },
  
      // 去注册
      goToRegister() {
        const formBox = document.querySelector('.form-box');
        const loginBox = document.querySelector('.login-box');
        const registerBox = document.querySelector('.register-box');
        formBox.style.transform = 'translateX(80%)';
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
      },
  
      // 去登录
      goToLogin() {
        const formBox = document.querySelector('.form-box');
        const loginBox = document.querySelector('.login-box');
        const registerBox = document.querySelector('.register-box');
        formBox.style.transform = 'translateX(0%)';
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
      },

      cancelLogin() {
            window.location.href = '/Home';
        }
    },
    mounted() {
      // 添加输入框焦点效果
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
          input.parentElement.style.transform = 'scale(1)';
        });
      });
    }
  };
  </script>
  
  <style scoped>
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
  /* 游戏主题装饰元素 */
  .game-bg-element {
            position: absolute;
            z-index: 0;
            opacity: 0.1;
        }
        
        .controller-1 {
            top: 10%;
            left: 5%;
            font-size: 200px;
            transform: rotate(15deg);
            color: #818cf8;
        }
        
        .controller-2 {
            bottom: 15%;
            right: 8%;
            font-size: 180px;
            transform: rotate(-20deg);
            color: #ec4899;
        }
        
        .game-icon {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 400px;
            color: rgba(129, 140, 248, 0.05);
        }
        
        .container {
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            width: 850px;
            height: 550px;
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            position: relative;
            z-index: 10;
            border: 1px solid rgba(148, 163, 184, 0.2);
            overflow: hidden;
        }
        
        .form-box {
            position: absolute;
            top: -10%;
            left: 5%;
            background: linear-gradient(145deg, #1e293b, #0f172a);
            width: 420px;
            height: 650px;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(2, 8, 20, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
            transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            border: 1px solid rgba(129, 140, 248, 0.3);
            overflow: hidden;
        }
        
        .form-box::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.15), transparent);
            animation: rotate 8s linear infinite;
            z-index: -1;
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .register-box, .login-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 0px;
            z-index: 2;
        }
        
        .hidden {
            display: none;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 45px;
            text-transform: uppercase;
            color: #f1f5f9;
            letter-spacing: 4px;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 2px 8px rgba(99, 102, 241, 0.5);
        }
        
        .input-group {
            width: 80%;
            margin-right: 70px;
            position: relative;
            margin-bottom: 10px;
        }
        
        input {
            background: rgba(30, 41, 59, 0.9);
            width: 100%;
            color: #f1f5f9;
            border: 2px solid rgba(129, 140, 248, 0.3);
            border-radius: 10px;
            padding: 16px 20px 16px 50px;
            font-size: 18px;
            letter-spacing: 1px;
            transition: all 0.3s ease;
        }
        
        input:focus {
            outline: none;
            border-color: #818cf8;
            box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.3);
        }
        
        input::placeholder {
            color: #94a3b8;
        }
        
        .input-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #818cf8;
            font-size: 20px;
        }
        
        .form-box button {
            width: 80%;
            margin-top: 35px;
            background: linear-gradient(to right, #6366f1, #8b5cf6);
            border: none;
            border-radius: 10px;
            padding: 18px;
            color: #f8fafc;
            letter-spacing: 2px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        
        .form-box button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
            background: linear-gradient(to right, #818cf8, #a78bfa);
        }
        
        .con-box {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            padding: 40px;
            z-index: 1;
        }
        
        .con-box.left {
            left: -5%;
        }
        
        .con-box.right {
            right: -4%;
        }
        
        .con-box h2 {
            color: #e2e8f0;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .con-box span {
            color: #818cf8;
            background: linear-gradient(to right, #818cf8, #c084fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
        }
        
        .con-box p {
            font-size: 16px;
            color: #94a3b8;
            margin-bottom: 8px;
            line-height: 1.8;
        }
        
        .game-features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 25px 0;
        }
        
        .feature{
            background: rgba(30, 41, 59, 0.7);
            border-radius: 10px;
            padding: 15px;
            margin: 0px;
            margin:8px;
            width: 120px;
            text-align: center;
            border: 1px solid rgba(129, 140, 248, 0.2);
            transition: all 0.3s ease;
        }

        
        .feature :hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(129, 140, 248, 0.3);
            border-color: #818cf8;
        }
        
        .feature  i {
            font-size: 28px;
            color: #818cf8;
            margin-bottom: 10px;
        }
        
        .feature  p {
            font-size: 14px;
            color: #cbd5e1;
            margin: 0;
        }
        
        .con-box button {
            margin-top: 25px;
            background: transparent;
            color: #cbd5e1;
            border: 2px solid rgba(129, 140, 248, 0.4);
            padding: 14px 32px;
            border-radius: 30px;
            letter-spacing: 1px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .con-box button:hover {
            background: rgba(129, 140, 248, 0.15);
            border-color: #818cf8;
            color: #e0e7ff;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
        }
        
        .toggle-info {
            position: absolute;
            bottom: 30px;
            left: 0;
            right: 0;
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
            letter-spacing: 0.5px;
        }
        
        .game-logo {
            position: absolute;
            top: 30px;
            left: 30px;
            display: flex;
            align-items: center;
            z-index: 20;
        }
        
        .game-logo i {
            font-size: 32px;
            color: #818cf8;
            margin-right: 12px;
        }
        
        .game-logo h3 {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(to right, #818cf8, #c084fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1px;
        }
        
        @media (max-width: 900px) {
            .container {
                width: 95%;
                height: auto;
                min-height: 90vh;
            }
            
            .form-box {
                position: relative;
                width: 90%;
                height: auto;
                left: 5%;
                top: 30px;
                margin-bottom: 60px;
            }
            
            .con-box {
                position: relative;
                width: 100%;
                top: 0;
                transform: none;
                padding: 30px 20px;
            }
            
            .con-box.left, .con-box.right {
                left: 0;
                right: 0;
            }
        }
        .error-message {
          color: rgb(225, 0, 255);
          font-size: 12px;
          margin-top: 5px;
        }
        .reset-btn {
          margin-top: 5px;
          margin-bottom: 10px;
        }
  </style>