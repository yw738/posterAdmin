<template>
  <div class="box_sec">
    <div class="container">
      <div class="login-card">
        <div class="logo">
          <i class="fas fa-user-circle"></i>
          <h1>欢迎登录</h1>
        </div>

        <form>
          <div class="input-group">
            <label for="username">用户名</label>
            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="username"
                class="input-field"
                placeholder="请输入用户名"
                required
                v-model="username"
              />
            </div>
          </div>

          <div class="input-group">
            <label for="password">密码</label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                class="input-field"
                placeholder="请输入密码"
                required
              />
            </div>
          </div>

          <button class="btn" @click="submit">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

let username = ref()
let submit = () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  if (username.trim() === '') {
    ElMessage.error('请输入用户名')
    return
  }

  if (password.length < 6) {
    ElMessage.error('密码长度不能少于6位')
    return
  }

  // 模拟登录成功
  // alert('登录成功！')
  router.replace('/manage')
}
</script>
<style scoped>
.box_sec {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 420px;
}

.login-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.8s ease;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo i {
  font-size: 48px;
  color: #4a90e2;
  margin-bottom: 10px;
}

.logo h1 {
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 14px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.input-field:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  outline: none;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.input-icon .input-field {
  padding-left: 45px;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.remember {
  display: flex;
  align-items: center;
}

.remember input {
  margin-right: 8px;
}

.forgot-link {
  color: #4a90e2;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #357abd;
  text-decoration: underline;
}

.btn {
  width: 100%;
  padding: 14px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #357abd;
}

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #555;
}

.register-link a {
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #357abd;
  text-decoration: underline;
}

.divider {
  margin: 25px 0;
  height: 1px;
  background: #ddd;
  position: relative;
}

.divider span {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0 15px;
  color: #777;
  font-size: 14px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.social-btn:hover {
  transform: translateY(-3px);
}

.facebook {
  background: #3b5999;
}

.google {
  background: #dd4b39;
}

.twitter {
  background: #55acee;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .remember-forgot {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
