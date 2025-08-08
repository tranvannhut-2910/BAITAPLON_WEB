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

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
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

    input {
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
    .ml-2 {
        margin-left: 10px;
    }
</style>

<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="tenNXB">Tên Nhà Xuất Bản</label>
            <input type="text" class="form-control" v-model="nxbLocal.tenNXB" required />
        </div>
        <div class="form-group">
            <label for="diachiNXB">Địa Chỉ</label>
            <input type="text" class="form-control" v-model="nxbLocal.diachiNXB" />
        </div>
        <button type="submit" class="btn btn-success">Lưu</button>
        <button type="button" class="btn btn-secondary ml-2" @click="$emit('cancel')">Hủy</button>
    </form>
</template>

<script>
export default {
    props: {
        nxb: { type: Object, default: () => ({ tenNXB: "", diachiNXB: "" }) },
    },
    data() {
        return {
            nxbLocal: { ...this.nxb },
        };
    },
    methods: {
        submitForm() {
            if (!this.nxbLocal.tenNXB.trim()) {
                alert("Tên Nhà Xuất Bản không được để trống!");
                return;
            }
            this.$emit("submit", this.nxbLocal);
        },
    },
};
</script>
