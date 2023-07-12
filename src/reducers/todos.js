import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  title: "",
  searchTitle:"",
  selectTodo:"All",
};

export const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    
    handleChangeTitle(state, action) {
      state.title = action.payload;
    },

    selectTodo(state,action){
      state.selectTodo = action.payload
    },

    searchTitle(state,action){
      state.searchTitle = action.payload
    },

    addTodo(state) {
      state.list.push({
        id: new Date().getTime(),
        title: state.title,
        completed: false,
      });
      state.title = ""
    },

    deleteTodo(state, action) {
      state.list = state.list.filter((elem) => elem.id !== action.payload);
    },

    completedTodo(state, action) {
      const { id, value } = action.payload;
      state.list = state.list.map((elem) => {
        if (elem.id === id) {
          elem.completed = value; }
        return elem;
      });
    },

    editTodo(state, action) {
      const {id, title} = action.payload 
      state.list = state.list.map(t => {
        if (t.id === id) {
          return {
            ...t,
            title
          }
        }
        return t
      })
    }

  },
});

export const { handleChangeTitle, deleteTodo, addTodo, completedTodo, editTodo, searchTitle, selectTodo } =
  slice.actions;

export default slice.reducer;
