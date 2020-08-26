import React,{useState} from "react"

// type Props = TodoProps & {
//   saveTodo:React.FC
//   handleSaveTodo:(e: React.FormEvent, formData: ITodo)=>void

// }
type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}
// const Todo: React.FC<Props> = ({ todo, handleSaveTodo}) => {
//   const checkTodo: string = todo.status ? `line-through` : ""
//   return (
//     <div className="Card">
//       <div className="Card--text">
//         <h1 className={checkTodo}>{todo.name}</h1>
//         <span className={checkTodo}>{todo.description}</span>
//       </div>
//       <div className="Card--button">
//         <form action="">

//         </form>
//         <button
//         type="submit"
//           onClick={(e) => handleSaveTodo(e,todo)}
//           // className={todo.status ? `hide-button` : "Card--button__done"}
//         >
//           Add Todo
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Todo
const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Todo</button>
    </form>
  )
}

export default AddTodo