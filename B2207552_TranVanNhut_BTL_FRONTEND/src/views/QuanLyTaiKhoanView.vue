<style scoped>
.quanly-acc {
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 20px black;
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

h1 {
    font-size: 24pt;
    color: black;
    margin-bottom: 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-between; /* Căn đều các nút */
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-bottom: 20px;
  width: 100%; /* Chiếm toàn bộ chiều rộng */
}

button {
  color: blue;
  flex: 1; /* Các nút sẽ chiếm không gian bằng nhau */
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  min-width: 120px; /* Đảm bảo nút không quá nhỏ */
  text-align: center;
}
button:first-child {
  background: green;
  color: white;
}

button:first-child:hover {
  background: red;
}

button:nth-child(2) {
  background: green;
  color: white;
}

button:nth-child(2):hover {
  background: red;
}

button:nth-child(3) {
  background: green;
  color: white;
}

button:nth-child(3):hover {
  background: red;
}

@media (max-width: 480px) {
  .quanly-acc {
    padding: 20px;
  }

  button {
    width: 100%;
    padding: 14px;
  }
}
</style>
<template>
  <div class="quanly-acc">
    <h1>Quản lý tài khoản</h1>

    <div class="buttons">
      <button @click="activeTab = 'docgia'">Danh sách độc giả</button>
      <button @click="activeTab = 'nhanvien'">Danh sách nhân viên</button>
      <button @click="showNhanVienForm = true">Thêm nhân viên</button>
    </div>
    <NhanVienForm
      v-if="showNhanVienForm"
      @submit="addNhanVien"
      @cancel="showNhanVienForm = false"
    />
    <DocGiaList
      v-if="activeTab === 'docgia'"
      :docGias="docGias"
      @deleteDocGia="deleteDocGia"
    />
    <NhanVienList
      v-if="activeTab === 'nhanvien'"
      :nhanViens="nhanViens"
      @deleteNhanVien="deleteNhanVien"
    />
  </div>
</template>

<script>
  import axios from 'axios'
  import DocGiaList from '@/components/DocGiaList.vue'
  import NhanVienList from '@/components/NhanVienList.vue'
  import NhanVienForm from '@/components/NhanVienForm.vue'

  export default {
    components: { DocGiaList, NhanVienList, NhanVienForm },
    data() {
      return {
        activeTab: 'docgia',
        docGias: [],
        nhanViens: [],
        showNhanVienForm: false
      }
    },
    async created() {
      await this.fetchDocGias()
      await this.fetchNhanViens()
    },
    methods: {
      async fetchDocGias() {
        try {
          const response = await axios.get('http://localhost:3000/api/docgia')
          this.docGias = response.data.map(docGia => docGia._doc || docGia)
        } catch (error) {
          console.error('Lỗi khi tải danh sách độc giả:', error)
        }
      },
      async fetchNhanViens() {
        try {
          const response = await axios.get('http://localhost:3000/api/nhanvien')
          this.nhanViens = response.data.map(nhanVien => nhanVien._doc || nhanVien)
        } catch (error) {
          console.error('Lỗi khi tải danh sách nhân viên:', error)
        }
      },
      async deleteDocGia(id) {
        if (confirm('Bạn có chắc muốn xóa độc giả này?')) {
          try {
            await axios.delete(`http://localhost:3000/api/docgia/${id}`)
            this.docGias = this.docGias.filter(docgia => docgia._id !== id)
            alert('Xóa độc giả thành công!')
          } catch (error) {
            console.error('Lỗi khi xóa độc giả:', error)
          }
        }
      },
      async deleteNhanVien(id) {
        if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
          try {
            await axios.delete(`http://localhost:3000/api/nhanvien/${id}`)
            this.nhanViens = this.nhanViens.filter(nhanvien => nhanvien._id !== id)
            alert('Xóa nhân viên thành công!')
          } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error)
          }
        }
      },
      async addNhanVien(nhanvien, event) {
        if (event) event.preventDefault();
        
        try {
          await axios.post('http://localhost:3000/api/nhanvien/register', nhanvien);
          alert('Thêm nhân viên thành công!');
          this.showNhanVienForm = false;
          await this.fetchNhanViens();
        } catch (error) {
          console.error('Lỗi khi thêm nhân viên:', error);
        }
      }
    }
  }
</script>
