<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Cột 1: Giới thiệu hệ thống -->
      <div class="footer-column">
        <h4 class="footer-title">Hệ thống quản lý mượn sách</h4>
        <p class="footer-text">
          Hệ thống nhằm giúp khách hàng có thể dễ dàng tìm kiếm và đặt sách online.
        </p>
      </div>

      <!-- Cột 2: Thông tin liên hệ -->
      <div class="footer-column">
        <h4 class="footer-title">Thông tin liên hệ</h4>
        <div class="contact-item">
          <i class="bi bi-geo-alt contact-icon"></i>
          <span class="contact-text">Đại học Cần Thơ, Khu II, Đường 3/2, Ninh Kiều, Cần Thơ</span>
        </div>
        <div class="contact-item">
          <i class="bi bi-envelope contact-icon"></i>
          <span class="contact-text">nhutb2207552@student.ctu.edu.vn</span>
        </div>
        <div class="contact-item">
          <i class="bi bi-telephone contact-icon"></i>
          <span class="contact-text">0795 859 267</span>
        </div>
      </div>

      <!-- Cột 3: Các liên kết nhanh -->
      <div class="footer-column">
        <h4 class="footer-title">Liên kết</h4>
        <div class="footer-link" @click="openModal('gioithieu')">Giới thiệu hệ thống</div>
        <div class="footer-link" @click="openModal('dieukhoan')">Điều khoản mượn sách</div>
        <div class="footer-link" @click="openModal('huongdan')">Hướng dẫn sử dụng</div>
        <div class="footer-link" @click="openModal('lienhe')">Liên hệ hỗ trợ</div>
      </div>
    </div>

    <!-- Phần bản quyền -->
    <div class="copyright-section">
      <div class="copyright-text">
        Bản quyền © 2025
      </div>
    </div>

    <!-- Modal -->
    <div v-if="activeModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        
        <div v-if="activeModal === 'gioithieu'">
          <h3 class="modal-title">Giới Thiệu Hệ Thống</h3>
          <div class="modal-body">
            <p>Hệ thống quản lý mượn sách được phát triển nhằm mục đích:</p>
            <ul>
              <li>Tạo điều kiện thuận lợi cho sinh viên mượn sách</li>
              <li>Giảm thiểu thủ tục giấy tờ</li>
              <li>Quản lý kho sách hiệu quả</li>
              <li>Theo dõi lịch sử mượn trả</li>
            </ul>
          </div>
        </div>

        <div v-else-if="activeModal === 'dieukhoan'">
          <h3 class="modal-title">Điều Khoản Mượn Sách</h3>
          <div class="modal-body">
            <ol>
              <li>Thời hạn mượn sách: 14 ngày</li>
              <li>Được gia hạn 1 lần thêm 7 ngày nếu không có yêu cầu từ người khác</li>
              <li>Phạt quá hạn: 5.000đ/ngày/quyển</li>
              <li>Bồi thường sách mất/hư hỏng: 150% giá trị sách</li>
              <li>Mỗi sinh viên được mượn tối đa 5 quyển cùng lúc</li>
            </ol>
          </div>
        </div>

        <div v-else-if="activeModal === 'huongdan'">
          <h3 class="modal-title">Hướng Dẫn Sử Dụng</h3>
          <div class="modal-body">
            <h4>Các bước mượn sách:</h4>
            <ol>
              <li>Đăng nhập hệ thống</li>
              <li>Tìm kiếm sách cần mượn</li>
              <li>Nhấn nút "Mượn sách"</li>
              <li>Xác nhận thông tin mượn</li>
              <li>Nhận sách tại thư viện trong vòng 24h</li>
            </ol>
          </div>
        </div>

        <div v-else-if="activeModal === 'lienhe'">
          <h3 class="modal-title">Liên Hệ Hỗ Trợ</h3>
          <div class="modal-body">
            <p>Mọi thắc mắc xin liên hệ:</p>
            <p><strong>Phòng Dịch vụ Thư viện</strong></p>
            <p>Giờ làm việc: 7:30 - 11:30 và 13:00 - 17:00 từ thứ 2 đến thứ 6</p>
            <p>Email: library@ctu.edu.vn</p>
            <p>Điện thoại: 0292 3872 123</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      activeModal: null,
    };
  },
  methods: {
    openModal(type) {
      this.activeModal = type;
    },
    closeModal() {
      this.activeModal = null;
    },
  },
};
</script>

<style scoped>
/* Phần chính của footer */
.footer {
  background-color: green;
  color: #333;
  padding: 40px 0 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  flex-wrap: wrap;
  gap: 30px;
}

.footer-column {
  flex: 1;
  min-width: 250px;
  padding: 0 15px;
}

.footer-title {
  color: black;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
}

/* Phần giới thiệu hệ thống */
.footer-text {
  color:black;
  font-size: 15px;
  line-height: 1.6;
  margin: 15px 0;
}

/* Phần thông tin liên hệ */
.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.contact-icon {
  margin-right: 10px;
  color: #3498db;
  font-size: 15px;
  margin-top: 3px;
}

.contact-text {
  color: black;
  font-size: 15px;
  line-height: 1.5;
  flex: 1;
}

/* Phần liên kết */
.footer-link {
  color: black;
  font-size: 15px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px 0;
}

.footer-link:hover {
  color: red;
  padding-left: 5px;
}

/* Phần bản quyền */
.copyright-section {
  background-color:black;
  padding: 15px 0;
  margin-top: 40px;
}

.copyright-text {
  text-align: center;
  color: white;
  font-size: 13px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color:white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #e74c3c;
}

.modal-title {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.modal-body {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
}

.modal-body ul,
.modal-body ol {
  padding-left: 20px;
  margin: 15px 0;
}

.modal-body li {
  margin-bottom: 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }
  
  .footer-column {
    margin-bottom: 30px;
  }
  
  .modal-content {
    width: 95%;
    padding: 20px;
  }
}
</style>