<script setup>
  import IconLogo from '@/components/icons/IconLogo.vue';
  import { ref } from 'vue';

  import axios from 'axios';
  const api = 'https://todolist-api.hexschool.io/';
  const signUp = ref ({
    email:'',
    password:'',
    nickname:''
  })

  import router from '@/router';
  const signUpSubmit = async () => {
    try {
      const res = await axios.post(`${api}users/sign_up`, signUp.value);
      console.log('註冊成功 !',res);
      // signUpSubmit.value = res.data.uid

      alert('註冊成功！請前往登入');
      router.push('/login');

    } catch (error) {
      console.log('ERROR!!!!');
      console.log(error);
    }
  }


</script>

<template>
  <div class="bg-primary">
    <div class="container max-w-4xl pt-12 px-8">
      <section class="md:flex justify-between gap-6">
        <div>
          <IconLogo class="mb-4" />
          <picture class="hidden md:block max-w-sm">
            <img src="../assets/images/img.png" alt="img" class="w-full h-auto block object-cover">
          </picture>
        </div>

        <!-- form -->
        <form class="mx-auto w-full flex flex-col justify-center gap-8 md:gap-6 max-w-xs"
        @submit.prevent="submit">
          <h1 class="text-center font-bold text-xl md:text-2xl">註冊帳號</h1>

          <!-- email -->
          <div class="space-y-1">
            <label for="" class="block">Email</label>
            <input type="email" name="" id="" placeholder="請輸入Email"
            class="font-normal bg-white rounded-lg py-3 px-4 outline-none w-full" v-model="signUp.email">
          </div>

          <!-- nickname -->
          <div class="space-y-1">
            <label for="" class="block">您的暱稱</label>
            <input type="email" name="" id="" placeholder="請輸入暱稱"
            class="font-normal bg-white rounded-lg py-3 px-4 outline-none w-full" v-model="signUp.nickname">
          </div>

          <!-- password -->
          <div class="space-y-1">
            <label for="" class="block">密碼</label>
            <input type="password" name="" id="" placeholder="請輸入密碼"
            class="font-normal bg-white rounded-lg py-3 px-4 outline-none w-full" v-model="signUp.password">
          </div>

          <!-- check password -->
          <div class="space-y-1">
            <label for="" class="block">再次輸入密碼</label>
            <input type="password" name="" id="" placeholder="請再次輸入密碼"
            class="font-normal bg-white rounded-lg py-3 px-4 outline-none w-full">
          </div>

          <!-- submit -->
          <div class="flex flex-col items-center gap-6">
            <button type="submit" class="cursor-pointer bg-black text-white py-3 px-12 rounded-lg text-base" @click="signUpSubmit">註冊帳號</button>
            <router-link to="/login">
              <button type="button" class="cursor-pointer">登入</button>
            </router-link>
          </div>

        </form>


      </section>

    </div>
  </div>
</template>
