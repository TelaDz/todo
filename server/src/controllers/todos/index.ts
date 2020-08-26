import { Response, Request } from 'express'
import { ITodo } from './../../types/todo'
import Todo from '../../models/todo'

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}
//这里，我们首先需要从  express  导入一些类型，因为我想显式指明类型。如果你想，你可以让 TypeScript 帮你推断。
//接下来，我们使用 getTodos() 函数来获取数据，它接收  req  和  res  参数并返回 promise。
//在前面创建的 Todo 模块的帮助下，我们现在可以从 MongoDB 获取数据并返回 Todo 数组。
const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status
    })

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()

    res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
  } catch (error) {
    throw error
  }
}
//   addTodo()  函数接收包含用户输入数据的 body 对象。
// 接下来，我使用类型转换来避免拼写错误，并限制  body  变量与  ITodo  类型匹配，然后基于该模块创建一个新的 Todo。
// 有了这些，我们现在可以在 DB 中保存 Todo 并返回新增的 Todo 和更新后的 todos 数组。
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body)
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
      message: 'Todo updated',
      todo: updateTodo,
      todos: allTodos
    })
  } catch (error) {
    throw error
  }
}
//   为了实现更新 todo, 我们需要拿到 id 和从  req  对象中获取 body，然后把他们传入  findByIdAndUpdate()，这个函数将会在数据库中找到 Todo 并且更新它。
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id)
    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos
    })
  } catch (error) {
    throw error
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
//   deleteTodo()  函数允许你从数据库中删除 Todo。在这里，我们从 req 中拿到 id，并把它作为参数传递给  findByIdAndRemove()，来获取到对应的 Todo 并从 DB 中删除它。
//   接下来，导出这些函数以便我们在其他文件中使用它们。也就是说，我们现在可以为 API 创建一些路由，并使用这些方法来处理请求。
