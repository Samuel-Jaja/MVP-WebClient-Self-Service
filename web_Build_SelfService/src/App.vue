<template>
  <div class="card">
    <div v-if="showSplashScreen" class="splash-screen">
      <div class="splash-content">
        <div class="cyphercrescent-logo">
          <img src="./assets/ccl-logo.32b1677.png" alt="Cyphercrescent Image" />
        </div>
        <h1>Build Self-Service</h1>
        <div class="sepal_logo">
          <img width="100" height="100" src="./assets/sepal_logo_de9d62126f.png" alt="SEPAL Image" />
        </div>
        <div class="progress-bar"></div>
      </div>
    </div>
    <div v-else>
      <div>
        <img src="./assets/ccl-logo.32b1677.png" alt="Cyphercrescent Image" />
     </div>
      <ToggleButton/>
      <h1>SEPAL BUILDS SELF-SERVICE</h1>
      <template v-if="isLoading">
        <!-- Loader -->
        <div class="loader"></div>
      </template>
      <template v-else>
        <!-- Card List -->
        <Card v-for="pullRequest in pullRequests" :key="pullRequest.id"
          :title="pullRequest.title"
          :author="pullRequest.user.login"
          :state="pullRequest.state"
          :createdAt="pullRequest.created_at"
          :number="pullRequest.number"
        />
      </template>
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { fetchOpenPullRequests } from './Services/githubService';
  import Card from './components/view/Card.vue';
  import ToggleButton from './components/view/ToggleButton.vue';
  import Footer from './components/view/Footer.vue';
  import {PullRequest} from './PR/PullRequest'

  export default defineComponent({
    components: {
      Card,
      ToggleButton,
      Footer,
    },
    
    setup() {
      const pullRequests = ref<PullRequest[]>([]);
      const isLoading = ref(true);
      const showSplashScreen = ref(true);

      onMounted(async () => {
        try {
          // Simulating loading delay
          await new Promise(resolve => setTimeout(resolve, 6000));
          const repo = 'WPF_BackgroundServices_App';
          const data = await fetchOpenPullRequests(repo);
          pullRequests.value = data;
          isLoading.value = false;
          showSplashScreen.value = false;
        } catch (error) {
          console.error(error);
          isLoading.value = false;
          showSplashScreen.value = false;
        }
      });

      return {
        pullRequests,
        isLoading,
        showSplashScreen,
      };
    },
  });
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: transparent;
  border: 8px solid darkblue;
  border-top-color: #f3f3f3;
  animation: progress 2s linear infinite;
  transition: border-width 0.3s ease;
}

@keyframes progress {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.splash-content h1 {
  color: darkblue;; /* Blue font color */
  margin-top: 0;
  font-size: 35px;
  font-weight: bold;
}

/* .loader {
  margin: 0 auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;
  margin-bottom: 20px;

} */

/* .splash-content .cyphercrescent-logo .img{
  width:50px;
  height:100px;
} */
</style>


