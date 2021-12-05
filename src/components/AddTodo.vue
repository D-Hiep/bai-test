<template>
  <div class="container add-todo">
    <h2>New Task</h2>
    <form-todo/>
  </div>
</template>

<script>
import FormTodo from './layouts/FormTodo.vue'

export default {
  components:{
    FormTodo
  }
}
</script>

<style scoped>
.add-todo{
  min-height: 650px;

  padding: 25px 35px;
  margin-top: 30px;

  border: 1px solid gray;
}
.add-todo > h2{
  font-size: 18px;
  text-align: center;
  line-height: 1px;
  font-weight: 700;

  margin-bottom: 40px;
}
</style>