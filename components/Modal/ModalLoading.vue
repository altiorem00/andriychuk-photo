<template>
<div class="modal-loading">Загрузка...</div>
</template>

<style scoped lang="scss">
.modal-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  color: #fff;
  z-index: 1000000;
}
</style>