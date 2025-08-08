<style scoped>
  h1 {
    font-size: 24pt;
    color: black;
    margin-bottom: 20px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
}

  .borrow-list {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background: green;
  }

  th:last-child,
  td:last-child {
    width: 120px;
    text-align: center;
    padding: 5px;
  }

  button {
    padding: 3px 8px;
    margin: 2px;
    font-size: 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    opacity: 0.8;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 10px;
  }

  .pagination button {
    padding: 5px 10px;
    border: none;
    background-color: red;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .page-size {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .page-size label {
    margin-right: 10px;
    font-weight: bold;
  }

  .page-size select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
  }

  .page-size span {
    margin-left: 10px;
    font-size: 14px;
    color: blue;
  }
</style>

<template>
  <div class="borrow-list">
    <h1>Theo dõi mượn sách</h1>

    <InputSearch v-model="search" />

    <div class="page-size mb-2">
      <label for="pageSize">Hiển thị:</label>
      <select v-model="perPage" id="pageSize">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <span> phiếu / trang</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Người mượn</th>
          <th>Tên sách</th>
          <th>Số quyển</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="don in paginatedDonMuon" :key="don._id">
          <td>{{ loadHoTen(don.maDG) }}</td>
          <td>{{ loadSach(don.maSach) }}</td>
          <td>{{ don.soQuyen }}</td>
          <td>{{ formatDate(don.ngayMuon) }}</td>
          <td>{{ formatNgay(don.ngayTra) }}</td>
          <td>{{ don.trangThai }}</td>
          <td>
            <button
              style="background: #4caf50; color: white"
              v-if="don.trangThai === 'Chờ duyệt'"
              @click="$emit('duyetMuon', don)"
            >
              Duyệt
            </button>
            <button
              style="background: #f44336; color: white"
              v-if="don.trangThai === 'Đang mượn'"
              @click="$emit('xacNhanTra', don)"
            >
              Trả
            </button>
            <button
              style="background: #ff9800; color: white"
              v-if="don.trangThai === 'Đã trả'"
              @click="$emit('xoaDonMuon', don)"
            >
              Xóa
            </button>

          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination mt-3">
      <button @click="prevPage" :disabled="currentPage === 1">
        <i class="bi bi-chevron-left"></i>
        Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Sau
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import InputSearch from '@/components/InputSearch.vue'

export default {
  components: { InputSearch },
  props: {
    danhSachDonMuon: Array,
    danhSachDocGia: Array,
    danhSachSach: Array
  },

  data() {
    return {
      books: [],
      currentPage: 1,
      perPage: 10,
      search: ''
    }
  },
  computed: {
    filteredDonMuon() {
      const keyword1 = this.search.normalize("NFC").toLowerCase().trim();
      const keyword2 = this.search.toLowerCase().trim()
      return this.danhSachDonMuon.filter(don => {
        const tenSach = this.loadSach(don.maSach).toLowerCase().trim() || '';
        const hoTen = this.loadHoTen(don.maDG).toLowerCase().trim() || '';
        const trangThai = don.trangThai?.toLowerCase().trim() || '';
        return (
          tenSach.includes(keyword1) ||
          hoTen.includes(keyword2) ||
          trangThai.includes(keyword1)
        );
      });
    },

    totalPages() {
      return Math.ceil(this.filteredDonMuon.length / this.perPage)
    },
    paginatedDonMuon() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredDonMuon.slice(start, end)
    }
  },
  methods: {
    loadHoTen(maDG) {
      const docGia = this.danhSachDocGia.find(dg => dg._id === maDG)
      return docGia ? docGia.tenDG : 'Không tìm thấy'
    },
    loadSach(maSach) {
      const sach = this.danhSachSach.find(s => s.maSach === maSach)
      return sach ? sach.tenSach : 'Không tìm thấy'
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN')
    },
    formatNgay(ngay) {
      if (!ngay || ngay === 'null') return 'Chưa trả'
      return new Date(ngay).toLocaleDateString('vi-VN')
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  },
  created() {
    this.danhSachDonMuon.forEach(don => {
      this.loadHoTen(don.maDG, don)
      this.loadSach(don.maSach, don)
    })
  },
  watch: {
    perPage() {
      this.currentPage = 1
    }
  }
}
</script>
