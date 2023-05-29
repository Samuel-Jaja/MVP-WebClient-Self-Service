<template>
  <div class="card">
    <h3 class="card-title"><strong>CCL Project:</strong> {{ title }}</h3>
    <p class="card-author"><strong>Author:</strong> {{ author }}</p>
    <p class="card-created-at"><strong>Created At:</strong> {{ createdAt }}</p>
    <p class="card-number"><strong>Number:</strong> {{ number }}</p>
    <button v-if="!isLaunched" class="launch-button" @click="launch">
      {{ isLaunching ? 'Downloading...' : 'Launch' }}
    </button>
    <div v-else class="downloaded-icon-container">
      <span class="downloaded-icon"> <strong>&#10003;</strong> </span>
    </div>
    <div v-if="isLaunching" class="progress-container">
      <div class="progress-bar" :style="{ width: downloadPercentage + '%', transition: 'width 1s' }">
        <span class="percentage">{{ downloadPercentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: String,
    author: String,
    createdAt: String,
    number: Number,
  },
  data() {
    return {
      isLaunching: false,
      isLaunched: false,
      downloadPercentage: 0,
    };
  },
  methods: {
    launch() {
      this.isLaunching = true;
      this.downloadPercentage = 0;
      this.simulateDownload();
    },
    simulateDownload() {
      const interval = setInterval(() => {
        this.downloadPercentage += 1;
        if (this.downloadPercentage >= 100) {
          clearInterval(interval);
          this.isLaunching = false;
          this.isLaunched = true;
        }
      }, 100); // Adjust the interval duration for slower download speed (in milliseconds)
    },
  },
});
</script>


<style scoped>
.card {
  border: 1px solid skyblue;
  padding: 10px;
  margin-bottom: 10px;
  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative; /* Ensure relative positioning for button alignment */
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.card-author,
.card-created-at,
.card-number {
  margin-bottom: 5px;
}

.card-author strong,
.card-created-at strong,
.card-number strong {
  font-weight: bold;
}

.card-author {
  color: #555555;
}

.card-created-at {
  color: #888888;
  font-size: 14px;
}

.card-number {
  color: #333333;
}

.launch-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.downloaded-icon-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 20px;
}

.downloaded-icon {
  color: #52c41a;
}

.progress-container {
  height: 10px;
  background-color: #f1f1f1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar {
  height: 100%;
  background-color: #52c41a;
  transition: width 1s; /* Adjust the transition duration as desired */
  position: relative;
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px; /* Adjust the font size as desired */
  color: #ffffff;
}

.launch-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.5s; /* Add transition for smooth animation */
}

.launch-button.downloaded {
  transform: translateY(-50%) scale(0.95); /* Add scale transformation when button is downloaded */
}



</style>
