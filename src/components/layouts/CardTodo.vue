<template>
  <div class="todo-card">
    <label :for="`todo_${todo.id}`" @change="checkedTask(todo.id)">
      <div class="todo__info">
        <input 
          type="checkbox" 
          :id="`todo_${todo.id}`"
          :value="todo.id"
        >
        <span class="checkbox__custom"></span>

        <p>{{todo.title}}</p>
      </div>
      <div class="todo__action">
        <button class="btn btn-detail" @click="openingForm = !openingForm">Detail</button>
        <button class="btn btn-remove" @click="removeTodo(todo.id)">Remove</button>
      </div>
    </label>
    <div class="todo__update" v-show="openingForm">
      <form-todo :type="'update'" :todoUpdate="todo"/>
    </div>
  </div>
</template>

<script>
import FormTodo from './FormTodo.vue'
import {mapMutations} from 'vuex'
export default {
  props: ['todo'],
  data(){
    return{
      openingForm: false,
    }
  },
  components:{
    FormTodo
  },
  methods:{
    ...mapMutations(['removeTodo', 'checkedTask'])
  }
}
</script>

<style scoped>
.todo-card{
  margin-bottom: 15px;
}
.todo-card > label{
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #000000;
  padding: 15px;

  cursor: pointer;
}
.todo__info{
  width: 50%;
  display: flex;
}
.todo__info > input{
  margin-right: 8px;
  display: none;
}
.todo__info > span.checkbox__custom{
  width: 16px;
  height: 16px;

  border: 1px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  position: relative;
  margin-right: 8px;
}
.todo__info > input[type=checkbox]:checked + span:before {
  content: '\2714';

  position: absolute;
  top: -1px;
  left: 1px;
}
.todo__info > p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 75%;
}

.todo__action{
  display: flex;
  justify-content: space-between;
  width: 40%;
}

.todo__update{
  width: 100%;

  top: 100%;
  left: 0px;
  border: 1px solid rgba(0, 0, 0, 0.9);

  padding: 20px;
}

@media only screen and (max-width: 672px) {
  .todo-card > label{
    flex-wrap: wrap;
    padding: 8px;
  }
  .todo-card > label > div{
    width: 100%;
    margin-bottom: 15px;
  }
  .todo__info > p{
    width: 87%;
  }
  .todo__action{
    margin-bottom: 0px !important;
  }
  .todo__action > button{
    width: 45%;
  }
}
</style>