import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'

export default[
  {
    path: '/',
    component: TodoList,
    name: 'todo-list',
    meta: {title: 'Danh sách cần làm'}
  },
  {
    path: '/add-todo',
    component: AddTodo,
    name: 'add-todo',
    meta: {title: 'Thêm công việc'}  
  }
]