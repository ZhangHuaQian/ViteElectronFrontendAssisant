<template>
  <!-- <div>
    <section class="container">
      <header>前端开发者助手</header>
      <section class="Content">
        <section class="sider">
          <Q-menu/>
        </section>
        <main>
          <router-view/>
        </main>
      </section>
      <footer>&copy; 2021 光屁屁.All Rights Reserved.</footer>
    </section>
  </div> -->
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import QMenu from '@/components/Menu.vue'

defineComponent({
  components: {
    QMenu
  }
})
</script>

<style lang="scss">
$content:90vh;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Pacifico,cursive;
}

</style>
