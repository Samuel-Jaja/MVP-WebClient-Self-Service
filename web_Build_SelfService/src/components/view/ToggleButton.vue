<template>
    <div class="toggle-container">
      <button @click="toggleMode" class="toggle-button">
        <span :class="['material-icons', { 'dark-mode-icon': darkMode }]">
          {{ darkMode ? 'dark_mode' : 'light_mode' }}
        </span>
      </button>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ToggleButton',
    setup() {
      const darkMode = ref(false);
  
      const toggleMode = () => {
        darkMode.value = !darkMode.value;
        if (darkMode.value) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      };
  
      return {
        darkMode,
        toggleMode,
      };
    },
  });
</script>
  
<style scoped>
.toggle-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

.toggle-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.toggle-button:focus {
  outline: none;
}

.material-icons {
  font-size: 24px;
  color: black; /* Default color for light mode */
}

.dark-mode-icon {
  color: white; /* Color for dark mode */
}
</style>
  


  