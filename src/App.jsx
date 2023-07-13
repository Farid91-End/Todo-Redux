import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addTodo,
  completedTodo,
  deleteTodo,
  handleChange,
  editTodo,
  searchTitle,
  selectTodo,
} from "./reducers/todos";
import Modal from "./components/Modal";
import { TextField } from "@mui/material";

function App() {
  const todos = useSelector(({ todos }) => todos.list);
  const title = useSelector(({ todos }) => todos.title);
  const editTitle = useSelector(({ todos }) => todos.title);
  const addModal = useSelector(({ todos }) => todos.title);
  const delModal = useSelector(({ todos }) => todos.title);
  const editlModal = useSelector(({ todos }) => todos.title);

  const dispatch = useDispatch();

  const search = useSelector(({ todos }) => todos.searchTitle);
  const select = useSelector(({ todos }) => todos.selectTodo);

  return (
    <div className="py-[25px]  ">
      <div className="header w-[80%] m-auto pb-5 ">
        <h1 className="text-[25px] font-semibold  text-center py-[25px] ">
          My table of Users
        </h1>
        <div className=" flex justify-between">
          <button
            className="w-20 border bg-blue-800  text-white rounded-lg py-2"
            onClick={() => {
              dispatch(
                handleChange({ name: "addModal", value: true })
              );
            }}
          >
            Add
          </button>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              dispatch(searchTitle(e.target.value));
            }}
            className="w-[356px] p-2 border-2 px-4  border-black rounded-lg  "
            placeholder="Search by Name"
          />
          <select
            name=""
            id=""
            className="border-2 border-black text-[20px] px-4 h-[45px] rounded-[10px]"
            onChange={(e) => {
              dispatch(selectTodo(e.target.value));
            }}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Uncompleted">Uncompleted</option>
          </select>
        </div>
      </div>
      <table className="w-[80%] mx-auto  ">
        <thead>

        <tr className="w-full border-2 text-[18px] pl-3 text-left h-[50px] bg-amber-700  font-[400] text-black-500 ">
          <th className="text-[18px] font-[400] pl-3  "></th>
          <th className="text-[18px] font-[400] pl-3 ">Personal info</th>
          <th className="text-[18px] font-[400] pl-3 border">Date of birth</th>
          <th className="text-[18px] font-[400] pl-3 border">Family positin</th>
          <th className="text-[18px] font-[400] pl-3 border">Number of kids</th>
          <th className="text-[18px] font-[400] pl-3 border">Actions</th>
        </tr>
        </thead>
        <tbody className="w-[80%] mx-auto">
          {todos
            .filter((e) => {
              if (select == "Completed") {
                return e.completed;
              } else if (select == "Uncompleted") {
                return !e.completed;
              }
              return e;
            })
            .filter((el) =>
              el.title.toLowerCase().includes(search.trim().toLowerCase())
            )
            .map((todo) => {
              return (
                <tr
                  key={todo.id}
                  className="h-[40px] bg-slate-400 text-[20px] font-[600] "
                >
                  <td className="pl-3 "></td>
                  <input
                    className="border p-2"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => {
                      dispatch(
                        completedTodo({
                          id: todo.id,
                          value: e.target.checked,
                        })
                      );
                    }}
                  />
                  {todo.completed ? (
                    <span>
                      <s>
                        {" "}
                        <td className="  pl-3">{todo.title}</td>
                      </s>{" "}
                    </span>
                  ) : (
                    <span>
                      <td className="  pl-3">{todo.title}</td>
                    </span>
                  )}

                  <td className="border pl-3">{todo.birth}</td>
                  <td className="border pl-3">{todo.family}</td>
                  <td className="border pl-3">{todo.kids}</td>
                  <td className=" pl-3  ">
                    <div className="btns flex gap-2">
                      <button className="border rounded-xl w-[60px] font-semibold p-2 bg-yellow-500 ">
                        Edit
                      </button>
                      <button className="border rounded-xl w-[100px] font-semibold p-2 bg-red-500">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal
        title="Add User"
        open={addModal}
        handleClose={() =>
          dispatch(handleChange({ name: "addModal", value: false }))
        }
        onOk={() => {
          if(title.trim().length === 0 ){
            return alert("User list is ampty")
          }
          dispatch(addTodo)
        }}
      >
        <TextField
        type="text"
         label="AddUser"
         variant="standart"
         value={title}
         onChange={(e)=> dispatch(handleChange({name: "tite", value:e.target.value}))} 
        />
      </Modal>
      <Modal
        title="Edit User"
        open={editlModal}
        handleClose={() =>
          dispatch(handleChange({ name: "editModal", value: false }))
        }
        onOk={() => {
          if(editTitle.trim().length === 0 ){
            return alert("User list is ampty")
          }
          dispatch(addTodo)
        }}
      >
        <TextField
        type="text"
         label="AddUser"
         variant="standart"
         value={title}
         onChange={(e)=> dispatch(handleChange({name: "delModal", value: false}))} 
        />
      </Modal>
      <Modal
        title="Delete  User"
        open={addModal}
        handleClose={() =>
          dispatch(handleChange({ name: "addModal", value: false }))
        }
        onOk={() => {
          dispatch(deleteTodo())
        }}
      > 
      </Modal>
    </div>
  );
}

export default App;
