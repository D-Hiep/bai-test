import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    todo: [],
    checkedTasks: []
  },
  getters:{
    getAllTodo: (state) => {
      let sortTodo = state.todo.sort((taskA,taskB)=>{
        return new Date(taskA.date) - new Date(taskB.date);
      });

      return sortTodo;
    },
    searchByName: (state) => (keyword) => {
      // search by name
      let todoSearch =  state.todo.filter(item => item.title.indexOf(keyword) != -1);

      // sort todo by date
      let sortTodo = todoSearch.sort((taskA,taskB)=>{
        return new Date(taskA.date) - new Date(taskB.date);
      });

      return sortTodo;
    },
    getCheckedTasks: (state) => {
      return state.checkedTasks;
    }
  },
  mutations:{
    loadTodoFromLocal(state){
      state.todo = JSON.parse(localStorage.getItem('todoList')) ?? [];
    },
  
    addTodo(state, newTodo){
      let idTaskRandom = Math.floor(Math.random() * 10000);
      newTodo.id = idTaskRandom;

      // add to local storage
      let todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
      todoList.push(newTodo);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      
      // add to state
      state.todo.push(newTodo);
    },

    updateTodo(state, payload){
      let todoIndex = state.todo.findIndex(todo => todo.id === payload.id);
      // edit todo on localStorage
      let todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
      todoList.splice(todoIndex,1 , payload.newTodo);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      
      // edit todo on state
      state.todo.splice(todoIndex,1 , payload.newTodo);
    },

    removeTodo(state, id){
      // get index
      let todoIndex = state.todo.findIndex(todo => todo.id === id);
      
      // remove on local storage
      let todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
      todoList.splice(todoIndex,1);
      localStorage.setItem("todoList", JSON.stringify(todoList));

      // remove on state
      state.todo.splice(todoIndex,1);
    },

    removeMultipleTodo(state, idTask){
      let todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];

      for(let i = idTask.length -1 ; i >= 0 ; i--){
        let todoIndex = state.todo.findIndex(todo => todo.id === idTask[i]);
        
        // remove on local storage
        todoList.splice(todoIndex, 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));

        // remove on state
        state.todo.splice(todoIndex, 1);

        // remove checked task on state
        state.checkedTasks.splice(i, 1);
      }
    },
    
    // checked list
    checkedTask(state, idTask){
      let findIndexTask = state.checkedTasks.findIndex(task => task == idTask);

      if(findIndexTask != -1){
        state.checkedTasks.splice(findIndexTask, 1);
      }else{
        state.checkedTasks.push(idTask);
      }
    }
  }
})