<template>
  <div class="container">
    <h1>複習</h1>
    <h1 class="text-4xl font-bold text-blue-600">這是 Tailwind 測試</h1>
    <br>
    <br>
    <div class="bg-white [&>*]:border">
      <input type="text" v-model="newName">
      {{ newName }}
      <input type="text" v-model="newNumber">
      {{ newNumber }}
      <button type="button" @click="addProduct" class="bg-green-400 px-4 py-2 rounded text-white cursor-pointer border">
        新增到資料集
      </button>
    </div>
<br>
    <table class="bg-blue-200 table-auto [&_*]:border-1 [&_*]:p-2">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>justified price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td><input type="number" v-model="item.price"></td>
          <td><button type="button" @click="delItem(item.id)" class="bg-green-400 px-4 py-2 rounded text-white cursor-pointer border">刪除品項</button></td>
        </tr>
      </tbody>
      <div>總價：{{ sum }}</div>
    </table>

  </div>

</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const newName = ref('');
const newNumber = ref(0);

const addProduct = () => {
  console.log('addProduct');
  data.value.push({
    id: new Date().getTime(),
    name: newName.value,
    price: newNumber.value
  })
  newName.value='';
  newNumber.value=0;
}

const delItem = (id) =>{
  console.log('delItem',id);
  const index = data.value.findIndex(item=>item.id===id);
  data.value.splice(index,1);
}

const data = ref ([
  { id: 1, name: "珍珠奶茶", price: 50 },
  { id: 2, name: "冬瓜檸檬", price: 45 },
  { id: 3, name: "翡翠檸檬", price: 55 },
  { id: 4, name: "四季春茶", price: 45 },
  { id: 5, name: "阿薩姆奶茶", price: 50 },
  { id: 6, name: "檸檬冰茶", price: 45 },
  { id: 7, name: "芒果綠茶", price: 55 },
  { id: 8, name: "抹茶拿鐵", price: 60 }
])

const sum = computed (()=>{
  console.log('sum', data.value)
  let tempSum = 0;
  data.value.forEach((item)=>{
    tempSum += item.price;
  })
  return tempSum;

})


onMounted(()=>{
  setTimeout(()=>{
    data.value=[
    { id: 9, name: "珍珠奶茶9", price: 50 },
    { id: 10, name: "冬瓜檸檬10", price: 45 },
    { id: 11, name: "翡翠檸檬11", price: 55 },
    { id: 12, name: "四季春茶12", price: 45 },
    { id: 13, name: "阿薩姆奶茶13", price: 50 },]
  },5000)
})

// AJEX
// 逐行執行
async function getData () {
  console.log('getData');
  const response = await axios.get('https://randomuser.me/api/');
  console.log(response);
}
getData();





</script>
