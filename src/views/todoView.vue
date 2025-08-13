<template>
  
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Todo</h1>

    <!-- 註冊功能 -->
    <h2 class="text-xl font-semibold mb-4">Register Function</h2>
    <table class="table-fixed border border-gray-400 border-collapse w-full">
      <tbody>
        <tr>
          <td class="border border-gray-300 px-4 py-2 w-1/3">Email</td>
          <td class="border border-gray-300 px-4 py-2">
            <input type="email" placeholder="Email" v-model="signupField.email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          </td>
        </tr>
        <tr>
          <td class="border border-gray-300 px-4 py-2">密碼</td>
          <td class="border border-gray-300 px-4 py-2">
            <input type="password" placeholder="密碼" v-model="signupField.password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          </td>
        </tr>
        <tr>
          <td class="border border-gray-300 px-4 py-2">暱稱</td>
          <td class="border border-gray-300 px-4 py-2">
            <input type="text" placeholder="暱稱" v-model="signupField.nuckname"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          </td>
        </tr>
        <tr>
          <td colspan="2" class="border border-gray-300 px-4 py-2 text-center">
            <button type="button" @click="signup"
              class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              註冊
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>登入功能</h2>
    <input type="email" placeholder="Email" v-model="signinField.email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
    <input type="text"  placeholder="密碼"  v-model="signinField.password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
    <br>
    {{ signinField }}
    <br>
    <button type="button" @click="signin" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">登入</button>
    <br>
    token:{{ signinRes }}

    <h2>驗證</h2>
    <div v-if="user.uid">
        <p>UID:{{ user.uid }}</p>
        <p>NickName:{{ user.nickname }}</p>
    </div>
    <div v-else>
        你還沒有登入
    </div>

    <!-- 顯示註冊結果
    <p v-if="signupRes" class="mt-4 text-green-600">註冊成功！UID: {{ signupRes }}</p>
    <p v-else class="mt-4 text-red-600">尚未註冊或有錯誤</p>

    <h2>驗證</h2>
    <div v-if="user.uid">
      <p>UID:{{ user.uid }}</p>
      <p>NickName:{{ user.Nickname }}</p>
    </div>
    <div v-else> 你還沒有登入</div> -->
  </div>



</template>


<script setup>
  import {onMounted, ref} from 'vue';
  import axios from 'axios';
  // AJAX (axios) 請求，竹行執行
  //async function getData() {
  //        console.log('getData');
  //        const resp = await axios.get('https://randomuser.me/api/');
  //        console.log(resp);
  //    }
  //    getData();



  const api = 'https://todolist-api.hexschool.io/';
  const signupField = ref ({
    email:'',
    password:'',
    nickname:'',
  })
  const signupRes = ref('')
  const signup = async () => {
    try{
      const res = await axios.post(`${api}users/sign_up`,signupField.value);
      console.log(res);
      signupRes.value = res.data.uid
    }catch(error){
      console.log('ERROR!!!!');
      console.log(error);
    }
  }

  const signinField = ref ({
    email:'',
    password:'',
  })

  const signinRes = ref('');
  const signin = async () => {
    try{
      const res = await axios.post(`${api}users/sign_in`,signinField.value);
      console.log(res);
      signinRes.value = res.uid
      document.cookie = `customTodoToken=${res.data.token};path=/`
    }catch(error){
      console.log('ERROR!!!!');
      console.log(error);
    }
  }

  //  驗證
  const user = ref({
    nickname:'',
    uid:'',
  })

  onMounted(async()=>{
    //驗證登入
    const token = document.cookie.replace(/(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$/i, "$1")
    const res = await axios.get(`${api}users/checkout`,{
          headers:{
              Authorization: token
          }
      })
      console.log(res);
      user.value= res.data;
  })
</script>
