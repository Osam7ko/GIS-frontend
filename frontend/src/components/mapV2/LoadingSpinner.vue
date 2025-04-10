<template>
    <div class="spinner-wrapper">
        <span class="spinner"></span>
    </div>
  </template>
  
  <script>
  export default {
    name: "loadingSpinner",
  };
  </script>

<style>
.spinner-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  display: block;
  width: 60px;
  height: 60px;
  border: 5px solid transparent;
  border-top: 5px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>