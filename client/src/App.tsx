import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
  }
//   这里，我们首先导入组件和  API.ts  导出的函数。然后，我们传递  ITodo  类型的数组给  useState  并且把它初始化为空数组。
// getTodos()  方法会返回 promise —— 因此，我们可以调用 then 函数并用获取到的数据更新 state，或者在发生任何错误时抛出一个错误。
// 有了这些，我们现在可以在组件组件成功挂载之后，调用  fetchTodos()  函数。
const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
  e.preventDefault()
  addTodo(formData)
    .then(({ status, data }) => {
      if (status !== 201) {
        throw new Error("Error! Todo not saved")
      }
      setTodos(data.todos)
    })
    .catch(err => console.log(err))
}
// 当发送表单时，我们用  addTodo()  向服务端发送请求。如果 Todo 被成功保存，我们将更新数据，否则将会抛出错误。
const handleUpdateTodo = (todo: ITodo): void => {
  updateTodo(todo)
    .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error! Todo not updated")
      }
      setTodos(data.todos)
    })
    .catch(err => console.log(err))
}

const handleDeleteTodo = (_id: string): void => {
  deleteTodo(_id)
    .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error("Error! Todo not deleted")
      }
      setTodos(data.todos)
    })
    .catch(err => console.log(err))
}
// 更新和删除 Todo 函数是很类似的。它们都接受参数，发送请求并得到响应，然后它们会检查请求是否成功并作相应处理。
return (
  <main className='App'>
    <h1>My Todos</h1>
    <AddTodo saveTodo={handleSaveTodo} />
    {todos.map((todo: ITodo) => (
      <TodoItem
        key={todo._id}
        updateTodo={handleUpdateTodo}
        deleteTodo={handleDeleteTodo}
        todo={todo}
      />
    ))}
  </main>
)
}

export default App
//这里我们遍历  todos  数组并将所需的数据传递给  TodoItem。