<template>
  <div class="container todo-app">
    <h1>
      <span>To Do List</span>
      <router-link class="btn btn-detail" :to="{name: 'add-todo'}">+</router-link>
    </h1>
    <input 
      type="text" 
      placeholder="search..."
      v-model="searchKey"
      @keyup="searchTask"
    />
    <div class="list-task">
      <card-todo 
        v-for="todo in todoList" 
        :key="todo.id" 
        :todo="todo"
      />
      <p class="empty-task" v-show="todoList.length == 0">Hiện bạn chưa có công việc nào !</p>
    </div>
    <div class="bulk-action" v-show="openingBulkAction">
       <p>Bulk Action: </p>
       <div>
          <button class="btn btn-detail">Done</button>
          <button class="btn btn-remove" @click="removeMultipleTodo(checkedTasks)">Remove</button>
       </div>
    </div>
  </div>
</template>

<script>
import CardTodo from './layouts/CardTodo.vue'
import {mapGetters, mapMutations} from 'vuex'
export default {
  data(){
    return{
      todoList: [],
      searchKey: '',
      checkedTasks: [],
      openingBulkAction: false
    }
  },
  components:{
    CardTodo
  },
  created(){
    this.loadTodoFromLocal();
    this.todoList = this.getAllTodo();
    this.checkedTasks = this.getCheckedTasks();
  },
  mounted(){
    this.$root.$on('reloadTodo', ()=>{
      this.todoList = this.getAllTodo();
    })
  },
  methods:{
    ...mapGetters(['getAllTodo', 'searchByName', 'getCheckedTasks']),
    ...mapMutations(['loadTodoFromLocal', 'removeMultipleTodo']),

    searchTask(){
      this.todoList = this.searchByName()(this.searchKey);
      console.log(this.searchKey);
    },
    showBulkActions(){
      if(this.checkedTasks.length == 0){
        this.openingBulkAction = false;
        return;
      }
      this.openingBulkAction = true;
    }
  },
  watch:{
    checkedTasks: function(){
      this.showBulkActions();
    }
  }
}
</script>

<style scoped>
.todo-app{
  min-height: 650px;

  padding: 25px 35px;
  margin-top: 30px;

  border: 1px solid gray;
  position: relative;
}
.todo-app > h1{
  display: flex;
  justify-content: center;
  align-items: center;
  
  margin-bottom: 40px;
}
.todo-app > h1 > span{
  font-size: 18px;
  text-align: center;
  line-height: 1px;
  font-weight: 700;
}
.todo-app > input{
  width: 100%;
  height: 35px;

  margin-bottom: 15px;
  padding: 5px;
}
.empty-task{
  font-size: 20px;
  font-weight: 500;
  text-align: center;

  margin: 25px auto;
}

.bulk-action{
  width: 100%;
  height: 80px;

  background-color: rgb(182, 181, 181);
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 0px;
  left: 0px;
}
.bulk-action > div{
  display: flex;
  justify-content: space-between;

  width: 38%;
}

.btn.btn-detail{
  display: inline-block;
  text-decoration: none;
  color: white;
  line-height: 34px;
  
  width: 60px;
  height: 30px;
  padding: 0px 6px;
  margin-left: 8px;
}

@media only screen and (max-width: 426px) {
  .todo-app{
    padding: 15px;
  }

  .bulk-action > div{
    width: 75%;
  }
  .bulk-action > div > button{
    width: 45% !important;
  }
}
</style>