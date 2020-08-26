import { Router } from 'express'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'

const router: Router = Router()

router.get('/todos', getTodos)

router.post('/add-todo', addTodo)

router.put('/edit-todo/:id', updateTodo)

router.delete('/delete-todo/:id', deleteTodo)

export default router
// 我们创建四个路由对应从数据库中获取、新增、更新和删除 todo。因为我们已经创建了函数，所以唯一要做的就是导入这些方法并将它们作为参数传递。
