<style scoped>
form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
}

.btn {
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.btn-success {
  background-color: #28a745;
  border: none;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: red;
  border: none;
  color: white;
}

.btn-secondary:hover {
  background-color: orange;
}

.ml-2 {
  margin-left: 10px;
}

@media (max-width: 768px) {
  form {
    max-width: 90%;
    padding: 15px;
  }

  input,
  select {
    font-size: 16px;
    padding: 12px;
  }

  .btn {
    width: 100%;
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="tenSach">Tên Sách</label>
      <input
        type="text"
        class="form-control"
        v-model="bookLocal.tenSach"
        required
      />
    </div>
    <div class="form-group">
      <label for="maNXB">Nhà Xuất Bản</label>
      <select v-model="bookLocal.maNXB" class="form-control" required>
        <option value="" disabled>-- Chọn nhà xuất bản --</option>
        <option v-for="nxb in nxbList" :key="nxb.maNXB" :value="nxb.maNXB">
          {{ nxb.tenNXB }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="soQuyen">Số lượng quyển</label>
      <input
        type="number"
        class="form-control"
        v-model.number="bookLocal.soQuyen"
        min="1"
        required
      />
    </div>
    <div class="form-group">
      <label for="donGia">Đơn giá</label>
      <input
        type="number"
        v-model.number="bookLocal.donGia"
        class="form-control"
        id="donGia"
        required
      />
    </div>
    <div class="form-group">
      <label for="namXB">Năm xuất bản</label>
      <input
        type="number"
        v-model.number="bookLocal.namXB"
        class="form-control"
        id="namXB"
        required
      />
    </div>
    <div class="form-group">
      <label for="tacGia">Tác giả</label>
      <input
        type="text"
        v-model="bookLocal.tacGia"
        class="form-control"
        id="tacGia"
        required
      />
    </div>
    <!-- <div class="form-group">
      <label for="hinhAnh">Ảnh sách:</label>
      <input type="file" id="hinhAnh" @change="onFileChange" />
    </div> -->
    <button class="btn btn-success">Lưu</button>
    <button
      type="button"
      class="btn btn-secondary ml-2"
      @click="$emit('cancel')"
    >
      Hủy
    </button>
  </form>
</template>

<script>
  export default {
    props: {
      book: {
        type: Object,
        default: () => ({
          tenSach: '',
          maNXB: '',
          soQuyen: 1,
          donGia: 0,
          namXB: 2010,
          tacGia: '',
        })
      },
      nxbList: { type: Array, required: true }
    },
    data() {
      return {
        bookLocal: { ...this.book },
        formKey: 0
      }
    },
    watch: {
      book: {
        handler(newVal) {
          this.bookLocal = { ...newVal }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      submitForm() {
        if (!this.bookLocal.maNXB) {
          alert('Vui lòng chọn Nhà Xuất Bản!')
          return
        }

        const bookData = { ...this.bookLocal }
        this.$emit('submit', bookData)

      }
    }
  }
</script>
