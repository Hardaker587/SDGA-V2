<template>
  <div v-if="active" class="layout_overlay">
    <div>
      <img
        src="/images/branding/main-logo.svg"
        class="loading_spinner mb-4"
        alt="social development goals"
      />
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  props: {
    active: { type: Boolean, required: true, default: false },
  },
}
</script>

<style scoped>
.layout_overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  top: 0;
  left: 0;
}

:deep(.loading_spinner) {
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: rotate;
  -moz-animation-duration: 2s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  max-width: 100px;
  max-height: 100px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
</style>
