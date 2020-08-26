import { ITodo } from './../types/todo'
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    status: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

export default model<ITodo>('Todo', todoSchema)
//首先导入  ITodo  接口和 一些  mongoose  导出的模块，后者是帮助定义 Todo schema 和在导出前把 ITodo 作为类型参数传入  model  。
//这样，我们现在就可以在其他文件中使用 Todo 模块来与数据库交互。
