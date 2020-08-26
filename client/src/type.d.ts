interface ITodo {
  _id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

interface TodoProps {
  todo: ITodo
}

type ApiDataType = {
  message: string
  status: string
  todos: ITodo[]
  todo?: ITodo
}
// 这里，  ITodo  接口需要跟 API 返回的数据类型一样。这里没有  mongoose  , 所以需要加一些额外的属性来匹配 API 定义的数据类型。
// 然后，我们用相同的的接口定义  TodoProps  ，组件会接受它并渲染数据。
// 现在我们已经定义了类型——现在让我们开始从 API 获取数据。
