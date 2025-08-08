<style scoped>
.sach-card {
  width: 270px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgb(0, 0, 0);
  overflow: hidden;
  text-align: center;
  padding: 20px;
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  position: relative;
}

.sach-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.sach-image {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.sach-card:hover .sach-image {
  transform: scale(0.9);
}

.sach-info {
  padding: 15px 0;
}

.sach-title {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 5px;
}

.sach-author, .sach-year, .sach-price, .sach-stock, .sach-publisher {
  font-size: 14px;
  color: #555;
  margin: 6px 0;
}

.sach-stock {
  font-weight: bold;
  font-size: 14px;
}

.sach-stock.out-of-stock {
  color: red;
  font-weight: bold;
}

.sach-price {
  font-size: 16px;
  font-weight: bold;
  color: #27ae60;
}

.sach-card::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  bottom: 0;
  left: 0;
  border-radius: 0 0 15px 15px;
}
</style>


<template>
  <div class="sach-card">
    <div class="sach-info">
      <img v-if="getNXBName(sach.maNXB) === 'Nhà Xuất Bản Giáo Dục Việt Nam'" :src= "`https://lambanner.com/wp-content/uploads/2022/01/MNT-DESGIN-THIET-KE-BIA-SACH-1130x570.jpg`" alt="Hình ảnh sách" class="sach-image">
      <img v-else-if="getNXBName(sach.maNXB) === 'Nhà Xuất Bản Trẻ'" :src= "`https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088775_1280.jpg`" alt="Hình ảnh sách" class="sach-image">
      <img v-else :src= "`https://png.pngtree.com/element_our/20190522/ourmid/pngtree-open-book-illustration-image_1072047.jpg`" alt="Hình ảnh sách" class="sach-image">
      <h2 class="sach-title">{{ sach.tenSach }}</h2>
      <p class="sach-author"><strong>Mã sách:</strong> {{ sach.maSach || "Không rõ" }}</p>
      <p class="sach-author"><strong>Tác giả:</strong> {{ sach.tacGia || "Không rõ" }}</p>
      <p class="sach-year"><strong>Năm Xuất Bản:</strong> {{ sach.namXB || "Không rõ" }}</p>
      <p class="sach-publisher"><strong>Nhà Xuất Bản:</strong>{{ getNXBName(sach.maNXB) || "Không rõ" }}</p>
      <p class="sach-price"><strong>Giá:</strong> {{ formatPrice(sach.donGia) }}</p>
      <p class="sach-stock" :class="{ 'out-of-stock': sach.soQuyen === 0 }">
        <strong v-if="sach.soQuyen > 0">Số quyển:</strong> {{ sach.soQuyen > 0 ? `${sach.soQuyen} quyển` : 'Hết sách' }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sach: Object,
    nxbs: Object
  },
  methods: {
    getNXBName(maNXB) {
      if (!maNXB || !this.nxbs) return 'Chưa có NXB';

      const manxb = typeof maNXB === 'object' ? maNXB.toString() : String(maNXB);

      const nxb = this.nxbs.find(n => 
        String(n.maNXB) === manxb || String(n._id) === manxb
      );

      return nxb ? nxb.tenNXB : 'Không tìm thấy';
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(price);
    }
  }
};
</script>


