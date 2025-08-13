<script setup>
import IconLogo from '@/components/icons/IconLogo.vue';
// import { ref, onMounted } from 'vue';
import { ref } from 'vue';
import axios from 'axios';

import router from '@/router'

  const api = 'https://todolist-api.hexschool.io/';

  const signIn = ref ({
    email:'',
    password:''
  })

import { useToast } from 'vue-toastification'
  const toast = useToast()

  const signInSubmit = async () => {
    try {
      const res = await axios.post(`${api}users/sign_in`, signIn.value);
      // console.log(res);
      // signInSubmit.value = res.uid

      const { token } = res.data;
      document.cookie = `customToken=${token}; path=/`;

      // toast
      toast("登入成功", {
        position: "bottom-center",
        timeout: 2045,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: true
      });
      setTimeout(()=>{
        router.push('/');
      }, 1000)

    } catch (error) {
      console.log('ERROR!!!!');
      console.log(error);
      alert('登入失敗，請確認帳號密碼');
    }
  }

  // 驗證
  // const user = ref ({
  //   nickname:'',
  //   password:''
  // })
  // onMounted(async()=>{
  //   //驗證登入
  //   const token = document.cookie.replace(/(?:^|.*;\s*)customToken\s*=\s*([^;]*).*$/i, "$1")
  //   const res = await axios.get(`${api}users/checkout`,{
  //         headers:{
  //             Authorization: token
  //         }
  //     })
  //     console.log(res);
  //     user.value= res.data;
  // })

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
          <h1 class="text-center font-bold text-xl md:text-2xl">最實用的線上待辦事項服務</h1>

          <!-- email -->
          <div class="space-y-1">
            <label for="" class="block">Email</label>
            <input type="email" name="" id="" placeholder="請輸入Email"
            class="font-normal bg-white rounded-lg py-3 px-4 outline-none w-full" v-model="signIn.email">
            <p class="text-red font-normal">此欄位不可為空</p>
          </div>

          <!-- password -->
          <div class="space-y-1">
            <label for="" class="block">密碼</label>
            <input type="password" name="" id="" placeholder="請輸入密碼"
            class="font-normal bg-white rounded-lg py-3 px-4 outline-none w-full" v-model="signIn.password">
          </div>

          <!-- submit -->
          <div class="flex flex-col items-center gap-6">
            <button type="submit" class="cursor-pointer bg-black text-white py-3 px-12 rounded-lg text-base" @click="signInSubmit">
              登入
            </button>
            <router-link to="/register">
              <button type="button" class="cursor-pointer">
                註冊帳號
              </button>
            </router-link>
          </div>

        </form>


      </section>

    </div>
  </div>
</template>
