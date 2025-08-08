<style scoped>
 .header-title {
  background: linear-gradient(to right, #e0f7fa, #00b4d8, #e0f7fa);
  padding: 30px 0;
  text-align: center;
  color: #000;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 0;
}

.navbar {
  background: green !important;
  padding: 15px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

.navbar-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
  width: 100%;
}

.nav-item {
  flex: 1;
  text-align: center;
}

.nav-link {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: white !important;
  text-decoration: none;
  padding: 12px 5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  border-radius: 5px;
  margin: 0 2px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.nav-link[to='/logout'] {
  background-color: #e74c3c;
}

.nav-link[to='/logout']:hover {
  background-color: #c0392b;
}

@media (max-width: 992px) {
  .nav-link {
    font-size: 14px;
    padding: 12px 3px;
  }
}

@media (max-width: 768px) {
  .navbar-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
  }
  
  .nav-item {
    flex: none;
    min-width: 120px;
  }
  
  .header-title {
    font-size: 28px;
  }
}

@media (max-width: 576px) {
  .nav-link {
    font-size: 13px;
    padding: 10px 2px;
    min-width: 90px;
  }
}
  
</style>

<script>
export default {
  computed: {
    userRole() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/logindocgia');
    }
  }
};
</script>

<template>
  <div>
    <div class="header-title">Quản Lý Mượn Sách</div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang chủ</router-link>
            </li>

            <template v-if="userRole === 'docgia'">
              <li class="nav-item">
                <router-link class="nav-link" to="/muonsach">Mượn Sách</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/lichsumuon">Lịch Sử Mượn</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/taikhoan">Tài Khoản</router-link>
              </li>
            </template>

            <template v-else-if="userRole === 'quanly'">
              <li class="nav-item">
                <router-link class="nav-link" to="/quanlysach">Quản Lý Sách</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/quanlytaikhoan">Quản Lý Tài Khoản</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/theodoimuon">Theo Dõi Mượn</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/taikhoan">Tài Khoản</router-link>
              </li>
            </template>

            <template v-else-if="userRole === 'nhanvien'">
              <li class="nav-item">
                <router-link class="nav-link" to="/theodoimuon">Theo Dõi Mượn</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/taikhoan">Tài Khoản</router-link>
              </li>
            </template>

            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/logindocgia">Đăng nhập</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Đăng ký</router-link>
              </li>
            </template>

            <li class="nav-item" v-if="userRole">
              <router-link class="nav-link" to="/logout" @click="handleLogout">Đăng Xuất</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>