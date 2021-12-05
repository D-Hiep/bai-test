<template>
  <form class="todo-form" @submit.prevent="handleForm">
    <div class="alert-success" v-show="isSuccess">
      <span v-show="type == 'add'">Thêm thành công</span>
      <span v-show="type == 'update'">Sửa thành công</span>
    </div>

    <div>
      <input 
        type="text" 
        placeholder="Do home work" 
        v-model="todo.title" 
        :class="{error : errors.title}" 
      >
      <span class="err-text" v-show="errors.title">{{errors.title}}</span>  
    </div>

    <div class="form__description">
      <label for="description" class="title">Description</label>
      <textarea 
        id="description" 
        rows="8" 
        v-model="todo.description" 
        :class="{error : errors.description}"
      ></textarea>
      <span class="err-text" v-show="errors.description">{{errors.description}}</span>
    </div>

    <div class="form__option">
      <div>
        <label for="date" class="title">Due Date</label>
        <input type="date" id="date" @change="dateValidate()" v-model="todo.date" required>
      </div>

      <div>
        <label for="priority" class="title">Priority</label>
        <select id="priority" v-model="todo.priority">
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="Hight">Hight</option>
        </select>
      </div>
    </div>

    <button type="submit" class="btn btn-add" v-if="this.type == 'add'">Add</button>
    <button type="submit" class="btn btn-add" v-else>Update</button>
    <router-link 
      :to="{name: 'todo-list'}" 
      class="btn btn-return-list" 
      v-if="this.type == 'add'"
    >
      Quay lại danh sách
    </router-link>

  </form>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    props:{
      type: {
        type: String,
        default: 'add'
      },
      todoUpdate: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data(){
      return{
        todo:{
          id: '',
          title: '',
          description: '',
          date: null,
          priority: 'Normal'
        },
        errors:{
          title: null,
          description: null
        },
        isSuccess: false
      }
    },
    created(){
      if(this.type == 'update'){
        this.todo = this.todoUpdate;
      }else{
        this.todo.date = new Date().toISOString().substr(0, 10);
      }
    },
    methods:{
      ...mapMutations(['addTodo', 'updateTodo']),
      dateValidate(){
        let today = new Date();

        if (new Date(this.todo.date).getTime() <= today.getTime()) {
          alert("The date must be bigger or equal to today date!");
          this.todo.date = new Date().toISOString().substr(0, 10);
          return false;
        }
        return true;
      },
      handleForm(){
        this.errors.title = false;
        this.errors.description = false;

        if(this.todo.title.trim() == '') this.errors.title = 'The title field is required.';
        if(this.todo.description.trim() == '') this.errors.description = 'The description field is required.';

        if(this.todo.title.trim() == '' || this.todo.description.trim() == '') return;
        
        if(this.type == 'add'){
          this.addTodo(this.todo);
          this.handleSuccess();
        }else{
          let payload = {
            id: this.todo.id,
            newTodo: this.todo
          };
          this.updateTodo(payload);
          this.handleSuccess();
        }
      },
      handleSuccess(){
        this.errors.title = false;
        this.errors.description = false;

        if(this.type == 'add'){
          this.todo = {
            title: '',
            description: '',
            date: new Date().toISOString().substr(0, 10),
            priority: 'Normal'
          };
        }else{
          this.$root.$emit('reloadTodo');
        }

        this.isSuccess = true;
        setTimeout(()=>{
          this.isSuccess = false;
        },1000)
      },
    }
  }
</script>

<style scoped>
.todo-form > div{
  margin-bottom: 20px;
}
.todo-form > div > input{
  width: 100%;
  height: 35px;

  padding: 5px;
}
.form__description > textarea{
  width: 100%;
}

.form__option{
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 20px 0px;
}
.form__option > div{
  width: 45%;
}
.form__option > div > input,
.form__option > div > select{
  width: 100%;
  height: 30px;
}

.title{
  font-size: 12px;
  font-weight: bold;
  text-align: left;

  margin-bottom: 5px;
  display: block;
}
.btn.btn-add{
  width: 100%;
  margin-top: 50px;
}

.error{
  border: 1px solid red !important;
}
.err-text{
  color: red;
  font-size: 10px;
  margin-top: 5px;
}

.btn-return-list{
  width: 100%;
  height: 35px;

  background-color: red;
  color: white;
  text-decoration: none;

  margin-top: 15px;
}

@media only screen and (max-width: 768px) {
  .form__option{
    flex-wrap: wrap;
  }
  .form__option div{
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>