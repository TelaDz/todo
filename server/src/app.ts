import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

mongoose
  .connect(uri, options)
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch(error => {
    throw error
  })

//   这里，我们首先从导入  express  库开始，这使用我们能调用  use()  方法，这个方法将帮助处理 Todo 路由。
// 然后，我们用  mongoose  包，通过读取  nodemon.json  带凭证的 url 去连接 MongoDB。
// 就是说，现在如果我们能成功连接 MongoDB，服务器就会启动，否则，会抛出错误。
// 我们现在已经通过 Node、Express、TypeScript 和 MongoDB 完成 api 的构建。现在我们开始用 React 和 TypeScript 构建客户端。
