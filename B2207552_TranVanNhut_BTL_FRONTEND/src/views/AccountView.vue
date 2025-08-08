<style scoped>
.account-view {
    max-width: 550px;
    min-width: 340px;
    margin: 50px auto;
    padding: 25px;
    background: white;
    border-radius: 16px;
    backdrop-filter: blur(10px);
    text-align: center;
    border: 2px solid black;
    transition: all 0.3s ease-in-out;
}

.account-view.editing {
    border-color: black;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
    font-size: 24pt;
    color: black;
    margin-bottom: 20px;
    font-weight: bold;
    text-transform: uppercase;
}

p {
    font-size: 16px;
    color: #222;
    background: white;
    padding: 14px;
    border-radius: 8px;
    text-align: left;
    margin: 10px 0;
    font-weight: 500;
}

p strong {
    color: black;
}

button {
    background: green;
    color: white;
    border: none;
    padding: 14px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
    margin-top: 20px;
}

button:hover {
    background:red;
    transform: scale(1.08);
  }

button:active {
    background: #2E3192;
    transform: scale(0.96);
}

@media (max-width: 600px) {
    .account-view {
        width: 92%;
        padding: 20px;
    }

    h1 {
        font-size: 20pt;
    }

    p {
        font-size: 14px;
        padding: 12px;
    }

    button {
        font-size: 14px;
        padding: 12px 18px;
    }
}
</style>

<template>
  <div class="account-view">
    <h1>Thông tin tài Khoản</h1>

    <AccountForm
      v-if="isEditing"
      :user="userInfo"
      :role="userRole"
      :userId="userInfo._id"
      @update="fetchUser"
      @cancel="isEditing = false"
    />

    <div v-if="userInfo">
      <p>
        <strong>Số điện thoại:</strong>
        {{ userInfo.sdt }}
      </p>
      <p>
        <strong>Họ và Tên:</strong>
        {{ userInfo.hoten }}
      </p>
      <p v-if="userRole === 'docgia'">
        <strong>Giới tính:</strong>
        {{ userInfo.gioitinh }}
      </p>
      <p v-if="userRole === 'docgia'">
        <strong>Ngày sinh:</strong>
        {{ formatDate(userInfo.ngaysinh) }}
      </p>
      <p>
        <strong>Quyền hạn:</strong>
        {{ userInfo.chucvu }}
      </p>
      <p>
        <strong>Địa chỉ:</strong>
        {{ userInfo.diachi }}
      </p>
      <button @click="isEditing = true">Chỉnh sửa</button>
    </div>

    <p v-else>Đang tải thông tin...</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/services/accService'
  import AccountForm from '@/components/AccountForm.vue'

  export default {
    components: { AccountForm },
    data() {
      return {
        userInfo: null,
        isEditing: false
      }
    },
    computed: {
      ...mapState({
        userRole() {
          return this.$store.state.user.role
        },
        userID() {
          return this.$store.state.user._id
        }
      })
    },
    methods: {
      async fetchUser() {
        if (!this.userID) {
          console.error('Không tìm tài khoản!')
          return
        }
        try {
          const userData = await getUserInfo(this.userID, this.userRole)
          this.userInfo = {
            _id: userData._id,
            sdt: this.userRole === 'docgia'
                ? userData.dienthoaiDG || ''
                : userData.dienthoaiNV || '',
            hoten: this.userRole === 'docgia'
                ? userData.tenDG || ''
                : userData.hotenNV || '',
            diachi: userData.diachi || 'Chưa cập nhật',
            role: this.userRole,
            gioitinh: userData.gioitinh || '',
            chucvu:
              this.userRole === 'docgia'
                ? 'Độc giả'
                : userData.chucvu === 'quanly'
                ? 'Quản lý'
                : 'Nhân viên',
            ngaysinh:
              this.userRole === 'docgia' && userData?.ngaysinh
                ? userData.ngaysinh.split('T')[0]
                : ''
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin tài khoản:', error)
        }
      },
      formatDate(dateString) {
        if (!dateString) return 'Chưa cập nhật'
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
      }
    },
    mounted() {
      this.fetchUser()
    }
  }
</script>
