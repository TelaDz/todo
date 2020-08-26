import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/todos"
    )
    return todos
  } catch (error) {
    throw new Error(error)
  }
}
// 我们需要导入  axios，通过 api 来请求数据，然后，用  getTodos()  函数从服务端获取数据。它将返回  AxiosResponse  为类型的 promise， 保存获取到的  ApiDataType  类型的 Todos。
export const addTodo = async (
    formData: ITodo
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todo: Omit<ITodo, "_id"> = {
        name: formData.name,
        description: formData.description,
        status: false,
      }
      const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-todo",
        todo
      )
      return saveTodo
    } catch (error) {
      throw new Error(error)
    }
  }
//   这个函数接受用户输入的数据作为参数并返回 promise。这里，我们需要去掉  _id  属性因为 MongoDB 会自动生成。
export const updateTodo = async (
    todo: ITodo
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todoUpdate: Pick<ITodo, "status"> = {
        status: true,
      }
      const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/edit-todo/${todo._id}`,
        todoUpdate
      )
      return updatedTodo
    } catch (error) {
      throw new Error(error)
    }
  }
  //为了实现更新 Todo，我们必须传入更新后的数据和对象 id。这里，我们需要更改 Todo 的  状态  ，那么在发送到服务器之前我们只需要选择所需的属性即可。
  export const deleteTodo = async (
    _id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-todo/${_id}`
      )
      return deletedTodo
    } catch (error) {
      throw new Error(error)
    }
  }
//   这里，我们也有一个函数接受  _id  属性作为参数并返回 promise。
//   有了这些，我们现在可以转到 components 文件夹并向其文件中添加一些有意义的代码。