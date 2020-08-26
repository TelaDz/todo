import { Document } from 'mongoose'

export interface ITodo extends Document {
  name: string
  description: string
  status: boolean
}
//这里，我们有了继承  mongoose  提供的  Document  类型的 Todo 接口。稍后我们将使用它与 MongoDB 交互。也就是说，我们现在可以定义 Todo 模块。
