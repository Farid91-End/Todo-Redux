import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {addTodo, completedTodo, deleteTodo, handleChangeTitle, editTodo, searchTitle, selectTodo } from "./reducers/todos";

function App() {
  const todos = useSelector(({ todos }) => todos.list);
  const title = useSelector(({ todos }) => todos.title);
  const dispatch = useDispatch();
  const search = useSelector(({todos}) => todos.searchTitle);
  const select = useSelector(({todos}) => todos.selectTodo)
 
  

  return (
    <div className=" flex items-center  justify-center h-[100vh] ">
    <div className=" ">
      <h1 className="text-[35px] font-semibold py-[25px] ">My Redux-Toolkit TodoList</h1>
      <div className="flex gap-2 py-[25px]">
        <input type="text" className="border-2 text-[20px] w-[90%] p-1 rounded-xl" value={title} 
          onChange={(e) => {
            dispatch(handleChangeTitle(e.target.value));
          }}
        />
        <button className="p-2 border rounded-xl bg-[#9acb9a] w-[100px] " onClick={() => {
            if (title.trim().length === 0) return alert("Press Enter title");
            dispatch(addTodo());
          }}>
            <h1 className="text-[20px] font-semibold ">
                ADD
            </h1>
        </button>
      </div>
      <div className="poisk pb-4 flex gap-x-4 " >
        <select name="" id="" className="border-2 text-[20px] rounded-[10px]" onChange={(e)=>{
          dispatch(selectTodo(e.target.value))
        }}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Uncompleted">Uncompleted</option>
        </select>
        <input type="search" value={search} placeholder="Search..."  onChange={(e)=>{
          dispatch(searchTitle(e.target.value))
        }}
        className="px-[15px] border-2 text-[20px] rounded-[10px]" />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border p-4 w-[800px]">
        {todos.filter((e)=>{
          if(select == "Completed"){
              return e.completed
          }else if(select == "Uncompleted"){
            return !e.completed 
          }
          return e
        }).filter((el)=> el.title.toLowerCase().includes(search.trim().toLowerCase()))
        .map((todo) => {
          return (
            <div key={todo.id} className="border-2 rounded-xl p-2  w-[full] flex justify-between ">
              <div className="gap-x-3 flex  ">
              <input className="border p-2 " type="checkbox" checked={todo.completed}
                onChange={(e) => { dispatch( completedTodo({
                      id: todo.id,
                      value: e.target.checked,})
                  );
                  }}/>
              {todo.completed ? (
                <span> <s><h1 className="m-auto text-[20px] text-red-500 ">{todo.title}</h1></s> </span> ) : (
                <span><h1 className="m-auto text-[20px] ">{todo.title}</h1></span>
              )}
              </div>
              <div className="btns flex gap-x-3">
              <button className="border rounded-xl w-[60px] font-semibold p-2 bg-yellow-500" onClick={() => {
                const title = prompt("Редактирование тодо", todo.title)
                dispatch(editTodo({
                  id: todo.id,
                  title
                }))
              }}>Edit</button>
              <button className="border rounded-xl w-[60px] font-semibold p-2 bg-red-500" onClick={() => { dispatch(deleteTodo(todo.id));}}> 
                  Del
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {/* {
        modal == true ? (
          <div className="w-[500px] h-[150px] absolute right-[-50px] top-[27%] ">
            <form onSubmit={editTodo} >
              <input type="text"  value={user} name="editForm" onChange={(event)=>setUser(event.target.value)}  
              className="w-[80%] mt-[30px] rounded-[10px] border-2 h-[60px] text-[25px] " />
              <button className=" h-[50px] mt-[10px] ml-[50px] w-[200px] text-white rounded-[10px]   bg-slate-800 "> Submit </button>
              <span onClick={()=> setModal(false)} className="ml-[20px] cursor-pointer ">close</span>
            </form>
          </div>
        ): null
      }  */}
    </div>
  );
}

export default App;
