import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      foto: "https://static.wikia.nocookie.net/lotr/images/3/32/Frodo_%28FotR%29.png/revision/latest?cb=20221006065757",
      title: "Frodo Assamble",
      email:"frodo-a@mail.ru",
      birth:"08/06/1999",
      family: "Unmarried",
      kids:"0",
      completed: false
    },
    {
      id: 2,
      foto: "https://media.nga.gov/iiif/1d9a19ac-3dae-4576-b4f6-39e1ce655fb4/full/full/0/default.jpg?attachment_filename=portrait_of_a_lady_1937.1.37.jpg",
      title: "Angelina Goli",
      email:"angelina0808@mail.ru",
      birth:"08/08/1995",
      family: "married",
      kids:"4",
      completed: false
    },
    {
      id: 3,
      foto: "https://media.gq-magazine.co.uk/photos/63468efef4f48bee2acb7062/16:9/w_2560%2Cc_limit/Tom-Holland-Spiderman-what-we-know-so-far.jpg",
      title: "Spider Man",
      email:"spider-farhome@gmail.com",
      birth:"01/02/1997",
      family: "Unmarried",
      kids:"0",
      completed: false
    },
    {
      id: 4,
      foto: "https://datatrained.com/dt-fun/wp-content/uploads/2023/05/Jennifer-Lopez-1.jpg",
      title: "Jennifer Lopez",
      email:"yourLopez@gmail.ru",
      birth:"10/02/1980",
      family: "married",
      kids:"2",
      completed: true
    },
  ],
  title: "",
  searchTitle: "",
  selectTodo: "All",
  editTitle: "",
  addMOdal: false,
  editModal: false,
  delModal: false 
};

export const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleChange(state, action) {
     const {name, value, id}= action.payload;
     if(id){
      state.idx = id;
      state.editTitle = state.list.find((e)=>e.id === id).title;
    }
     state[name] = value;
    },



    selectTodo(state, action) {
      state.selectTodo = action.payload;
    },

    searchTitle(state, action) {
      state.searchTitle = action.payload;
    },

    addTodo(state) {
      state.list.push({
        id: new Date().getTime(),
        title: state.title,
        completed: false,
      });
      state.addMOdal = false;
      state.title = "";
    },

    deleteTodo(state, action) {
      state.list = state.list.filter((elem) => elem.id !== action.payload);
      state.delModal = false;
    },

    editTodo(state){
      let todo = state.list.find((e)=>e.id === state.idx);
      todo.title = state.editTitle;
      state.editModal = false; 
    },

    completedTodo(state, action) {
      const { id, value } = action.payload;
      state.list = state.list.map((elem) => {
        if (elem.id === id) {
          elem.completed = value;
        }
        return elem;
      });
    },

    editTodo(state, action) {
      const { id, title } = action.payload;
      state.list = state.list.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            title,
          };
        }
        return t;
      });
    },
  },
});

export const {
  handleChange,
  deleteTodo,
  addTodo,
  completedTodo,
  editTodo,
  searchTitle,
  selectTodo,

} = slice.actions;

export default slice.reducer;
