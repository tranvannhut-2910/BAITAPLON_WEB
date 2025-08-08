<style scoped>
.input-group {
  max-width: 400px;
  margin: 0 auto;
}

.form-control {
  border: 3px solid black;
  border-right: none;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  font-size: 15px;
}

.form-control:focus {
  box-shadow: none;
  border-color: black;
}

.btn-outline-secondary {
  background-color: black;
  color: white;
  font-weight: bold;
}

.btn-outline-secondary:hover {
  background-color: red;
}
</style>

<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Tìm kiếm" :value="modelValue"
      @input="updateModelValue" @keyup.enter="submit" />
    <button class="btn btn-outline-secondary" @click="submit">Tìm</button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue", "submit"]);

const updateModelValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const submit = () => {
  emit("submit");
};
</script>
