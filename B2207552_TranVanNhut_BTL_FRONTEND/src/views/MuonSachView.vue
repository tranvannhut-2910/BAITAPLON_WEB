<style scoped>
.borrow-container {
    max-width: 650px;
    margin: 50px auto;
    padding: 25px;
    text-align: center;
    background: linear-gradient(135deg, #e3f2fd, #ede7f6); 
    border-radius: 16px;
    box-shadow: black;
    transition: all 0.3s ease-in-out;
}

h2 {
    font-size: 26px;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.borrow-form {
    background: white;
    padding: 20px;
    border-radius: 14px;
    text-align: left;
    position: relative;
    overflow: hidden;
}

.borrow-header {
    background: brown;
    color: white;
    padding: 12px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 10px 10px 0 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.borrow-content {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

label {
    font-weight: bold;
    font-size: 14px;
    color: black;
    display: block;
    margin-bottom: 5px;
}

select, input {
    width: 100%; 
    padding: 14px; 
    border: 2px solid black;
    border-radius: 8px;
    font-size: 16px; 
    transition: all 0.3s ease-in-out;
}

select:focus, input:focus {
    border-color: #5C6BC0;
    outline: none;
}

.btn-add {
    background-color: green;
    color: white;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease;
}

.btn-add:hover {
    background-color: red;
    transform: scale(1.05);
}

@media (max-width: 600px) {
    .borrow-container {
        width: 90%;
        padding: 18px;
    }

    .borrow-content {
        flex-direction: column;
    }

    select, input {
        width: 100%;
    }
}
</style>

<template>
  <div class="borrow-container">
    <h2>Đăng Ký Mượn Sách</h2>

    <div class="borrow-form">
      <div class="borrow-header">Phiếu Mượn</div>
      <div class="borrow-content">
        
        <div>
          <label for="book">Chọn sách:</label>
          <select v-model="selectedBook" @change="updateAvailableQuantity">
            <option v-for="book in books" :key="book._id" :value="book">
              {{ book.tenSach }} (Còn: {{ book.soQuyen }})
            </option>
          </select>
        </div>

        <div>
          <label for="quantity">Số lượng mượn:</label>
          <input type="number" v-model.number="quantity" :max="selectedBook ? selectedBook.soQuyen : 1" min="1" />
        </div>

      </div>
      <button class="btn-add" @click="registerBorrow">Đăng Ký Mượn</button>
    </div>
  </div>
</template>

<script>
import { getBooks, dangKyMuonSach } from "@/services/muonsachService";
import { useStore } from 'vuex';

export default {
  data() {
    const store = useStore();
    return {
      store,
      books: [],
      selectedBook: null,
      quantity: 1,
      ngayMuon: "",
    };
  },

  computed: {
    docGiaId() {
      return this.store.state.user._id;
    },
  },

  methods: {
    async loadBooks() {
      this.books = await getBooks();
    },

    updateAvailableQuantity() {
      this.quantity = 1;
    },

    openBorrowForm() {
      const today = new Date();
      this.ngayMuon = today.toISOString().split("T")[0];
    },

    async registerBorrow() {
      this.openBorrowForm();

      try {
        await dangKyMuonSach(this.docGiaId, this.selectedBook.maSach, this.quantity, this.ngayMuon);
        alert("Đăng ký mượn thành công! Vui lòng chờ duyệt.");
        this.selectedBook = null;
        this.quantity = 1;
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi không xác định!");
        console.error(error);
      }
    },
  },

  mounted() {
    this.loadBooks();
  },
};
</script>
