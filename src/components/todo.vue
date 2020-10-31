<template>
  <div class="container" v-if="tokenIsPresent">
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
                    Edit
                  </button>

                  <button class="btn btn-danger" @click="deleteTodo(todo.id)">
                    Delete
                  </button>
                </td>
              </template>

              <template v-else>
                <td>
                  <input
                    type="text"
                    v-model="activeTodo.name"
                    class="form-control"
                    placeholder="add name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    v-model="activeTodo.description"
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
export default {
  name: "App",
  data() {
    return {
      todos: [],
      todoForm: {},
      todoRoute: "/api/todos",
      activeTodo: null,
      state: this.$store.state.app,
    };
  },
  created() {
    this.getTodos();
  },
  computed: {
    tokenIsPresent() {
      return this.$store.getters["app/activeToken"] !== null;
    },
  },
  methods: {
    setEditing(id) {
      this.editing = id;
    },
    getTodos() {
      this.$axios
        .get(this.todoRoute)
        .then(({ data }) => {
          this.todos = [...data];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createTodo() {
      this.$axios
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
      this.$axios
        .put(this.todoRoute + `/${id}`, {
          name: this.activeTodo.name,
          description: this.activeTodo.description,
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
      this.$axios
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
