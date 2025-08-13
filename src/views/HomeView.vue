<script setup>
import headerView from '@/components/headerView.vue'
import {computed, ref, onMounted} from 'vue'


const newName = ref('');
const newCheck = ref(false);
const addTodo = () => {
  // test
  console.log('addTodo');

  todoData.value.push({
    id: Date.now(),
    name: newName.value,
    check: newCheck.value
  })
}

const todoData = ref ([
  {id:1, name:'把冰箱發霉的檸檬拿去丟', check:false},
  {id:2, name:'打電話叫媽媽匯款給我', check:true},
  {id:3, name:'整理電腦資料夾', check:true},
  {id:4, name:'繳電費水費瓦斯費', check:false},
  {id:5, name:'約vicky禮拜三泡溫泉', check:true},
  {id:6, name:'約ada禮拜四吃晚餐', check:true},
])

onMounted(()=>{
  setTimeout(()=>{
    todoData.value=[
    {id:1, name:'把冰箱發霉的檸檬拿去丟', check:false},
    {id:2, name:'打電話叫媽媽匯款給我', check:true},
    {id:3, name:'整理電腦資料夾', check:true},
  ]},3000)
})

onMounted(()=>{
  setTimeout(()=>{
    todoData.value=[

  ]},5000)
})


const filterList = ref('all');

const sortedList = computed(()=>{
  if (filterList.value === 'done') {
    return todoData.value.filter(i=>i.check);
  } else if (filterList.value=== 'unDone') {
    return todoData.value.filter(i=>!i.check);
  }
  return todoData.value;
})

const delItem = (id) =>{
  console.log('delItem',id);
  const index = todoData.value.findIndex(item=>item.id===id);
  todoData.value.splice(index,1);
}

</script>

<template>
  <headerView />
  <!-- <main class="h-[500px] bg-[linear-gradient(175deg,_theme('colors.primary')_300px,_white_0)]"> -->
  <main class="min-h-screen bg-[linear-gradient(175deg,_theme('colors.primary')_300px,white_0)]">
    <!-- your content -->
    <div class="container max-w-lg">

      <section class="px-8 pb-9 @xl:px-3 md:pt-6">
        <!-- add Todo -->
        <div class="flex relative">
          <input type="text" name="" id="" v-model="newName" placeholder="新增待辦事項"
            class="bg-white font-normal ps-4 py-3 rounded-lg w-full shadow-[0_0_15px_rgba(0,0,0,0.15)]"
            @keyup.enter="addTodo">
          <button type="button" @click="addTodo" class="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2">

            <!-- plus icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
            </svg>
          </button>
        </div>

        <!-- list Todo -->
        <div class="bg-white rounded-lg mt-4 shadow-[0_0_15px_rgba(0,0,0,0.15)]" v-show="todoData.length>0">
          <div class="text-gray flex justify-around [&>button]:w-full [&>button]:py-4">
            <button type="button" class="border-b-2 focus:text-black active:text-black focus:border-black active:border-black cursor-pointer"
            @click="filterList='all'" :class="filterList==='all' ?'text-black border-black': 'border-gray-light'">全部</button>
            <button type="button" class="border-b-2 focus:text-black active:text-black focus:border-black active:border-black cursor-pointer"
            @click="filterList = 'unDone'" :class="filterList === 'unDone' ? 'text-black border-black' : 'border-gray-light'">待完成</button>
            <button type="button" class="border-b-2 focus:text-black active:text-black focus:border-black active:border-black cursor-pointer"
            @click="filterList = 'done'" :class="filterList === 'done' ? 'text-black border-black' : 'border-gray-light'">已完成</button>
          </div>


          <div class="p-4 md:p-6 space-y-4 font-normal">
            <ul class="space-y-4">
              <!-- <li class="flex items-center pb-4 border-b border-gray-light"
              v-for="item in todoData" :key="item.id"> -->
              <li class="flex items-center pb-4 border-b border-gray-light"
              v-for="item in sortedList" :key="item.id">

                <label class="relative cursor-pointer flex items-center gap-4">

                  <!-- checkbox 本體：隱藏原始樣式，用自定框 -->
                  <input type="checkbox" class="appearance-none w-5 h-5 mb-1 border border-gray rounded-sm peer checked:opacity-0"
                  v-model="item.check" />

                  <!-- 被選取時出現的 Icon -->
                  <span class="absolute left-0 top-0 w-5 h-5 flex items-center justify-center pointer-events-auto opacity-0 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="bi bi-check2" viewBox="0 0 16 16" fill="none" stroke="#FFD370" stroke-width="2">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                    </svg>
                  </span>
                  <!-- label 文字 -->
                  <span class="transition-all" :class="item.check ? 'text-gray line-through' : ''">
                    {{ item.name }}
                  </span>
                </label>


                <button type="button" class="cursor-pointer ms-auto" @click="delItem(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>
                </button>
              </li>

            </ul>

            <div class="py-4">
              {{ todoData.filter(i=>!i.check).length }} 個待完成項目
            </div>
          </div>
        </div>

        <div class="mt-6 md:mt-15" v-show="todoData.length===0">
          <p class="text-base font-normal text-center">目前尚無待辦事項</p>
          <img src="../assets/images/empty 1.svg" alt="bg-img" class="w-60 h-64 block object-cover mx-auto">
        </div>

      </section>

    </div>
  </main>
</template>

<style>


</style>
