<script setup>
import IconLogo from '@/components/icons/IconLogo.vue'
import { useRouter } from 'vue-router'

  const router = useRouter()

  const logOut = () => {
    // 清除 token
    document.cookie = 'customToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // 登入頁面
    router.push('/login')
  }

</script>
<template>
  <div class="bg-primary">
    <div class="container">
      <section class="flex items-center justify-between p-4">
        <IconLogo />
        <div class="flex items-center gap-6">
          <p class="hidden text-base sm:block">王小明的待辦</p>
          <button type="button" class="font-normal sm:text-base cursor-pointer" @click="logOut">登出</button>
        </div>
      </section>

    </div>

  </div>
</template>
