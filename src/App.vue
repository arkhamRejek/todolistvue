<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-4">
        <form @submit.prevent class="p-4 shadow">
          <h3>Add Todo</h3>

          <div class="row mt-3">
            <div class="col-12">
              <input
                type="text"
                v-model="todoForm.name"
                class="form-control"
                placeholder="add name"
              />
            </div>
            <div class="col mt-4">
              <textarea
                rows="3"
                v-model="todoForm.description"
                class="form-control"
                placeholder="add description"
              />
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary mt-4 w-100"
            @click="createTodo"
          >
            save
          </button>
        </form>
      </div>
      <div class="col">
        <table class="table shadow" v-if="todos.length">
          <tbody>
            <tr :key="todo.id" v-for="todo in todos">
              <template v-if="activeTodo === null || activeTodo.id !== todo.id">
                <td>{{ todo.name }}</td>
                <td>
                  <button class="btn" @click="setActiveTodo(todo)">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-pencil"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                  </button>

                  <button class="btn" @click="deleteTodo(todo.id)">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-trash"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </td>
              </template>

              <template v-else-if="activeTodo.id === todo.id">
                <td>
                  <input
                    type="text"
                    v-model="activeTodo.name"
                    class="form-control"
                    placeholder="add name"
                  />
                </td>
                <td>
                  <button class="btn" @click="activeTodo = null">
                    Cancel
                  </button>

                  <button class="btn" @click="updateTodo(todo.id)">
                    Save
                  </button>
                </td>
              </template>
            </tr>
          </tbody>
        </table>

        <div class="jumbotron jumbotron-fluid" v-else>
          <div
            class="container d-flex justify-content-center align-items-center flex-column"
          >
            <h1 class="display-4">No todos to show</h1>
            <p class="lead">Please use the form to the left to add a todo</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      todos: [],
      todoForm: {},
      todoRoute: "/api/todos",
      activeTodo: null,
    };
  },
  created() {
    this.getTodos();
  },
  methods: {
    setEditing(id) {
      this.editing = id;
    },
    getTodos() {
      axios
        .get(this.todoRoute)
        .then(({ data }) => {
          this.todos = [...data];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createTodo() {
      axios
        .post(this.todoRoute, this.todoForm)
        .then(() => {
          this.getTodos();
          this.todoForm = {};
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setActiveTodo(todo) {
      this.activeTodo = { ...todo };
    },
    updateTodo(id) {
      axios
        .put(this.todoRoute + `/${id}`, {
          name: this.activeTodo.name,
        })
        .then(() => {
          this.getTodos();
          this.activeTodo = null;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteTodo(id) {
      axios
        .delete(this.todoRoute + `/${id}`)
        .then(() => {
          this.getTodos();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
}
</style>
