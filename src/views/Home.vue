<template>
  <div id="flexbox">
    <div id="app" data-v-app="">
      <div class="min-h-min">
        <Nav />
        <section class="pt-4 bg-purple-200/50">
          <div class="container px-4 mx-auto">
            <div
              class="max-w-4xl mx-auto text-center animate__animated animate__fadeIn"
            >
              <h2
                class="mb-4 text-4xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter"
              >
                Add a new
                <span class="text-yellow-500"
                  >Task<span class="text-purple-500">app</span></span
                >
              </h2>
              <p class="text-lg md:text-xl text-cool Gray-500 font-medium">
                Keep your life organised
              </p>
              <div class="flex justify-center">
                <ul
                  class="list-disc marker:text-yellow-500 mt-8 list-inside text-left text-xl"
                >
                  <li>Preparing for a trip?</li>
                  <li>Got a project coming up?</li>
                  <li>Start planning right here</li>
                </ul>
              </div>
              <p class="mb-10 mt-8 text-lg text-coolGray-500 font-medium">
                Today's Date is Oct 4th 2022
              </p>
              <div>
                <!-- <form class="w-full max-w-xl bg-white rounded-lg shadow-md p-6 ">
              
                <div class="flex flex-col px-4"><input class="inputField mb-4 appearance-none block w-full bg-yellow-500/25 text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:bg-purple-500/25 ease-in-out duration-300 "
                    placeholder="Add a Task Title - e.g. Arrange business trip" type="text" name="newTodo"
                    id="name"><input class="inputField mb-4 appearance-none block w-full bg-yellow-500/25 text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:bg-purple-500/25 ease-in-out duration-300"
                    placeholder="Add a Task Decription - Confirm dates, book room and flights"
                    type="text" name="newDescription" id="description"><button
                    class="appearance-none block w-full bg-yellow-500/25 text-gray-400 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:bg-purple-500/25 ease-in-out duration-300"
                    type="submit"> Add </button></div>
              
              </form> -->

                <NewTask @childNewTask="sendToStore" />
              </div>
              <!---->
            </div>
            <!---->
            <div class="flex flex-wrap -mx-4 mt-12"></div>
            <div
              id="defaultModal"
              tabindex="-1"
              aria-hidden="true"
              class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            >
              <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div
                  class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <div
                    class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600"
                  >
                    <h3
                      class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
                    >
                      Delete All Tasks
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="defaultModal"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="p-6 space-y-6">
                    <p
                      class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                    >
                      Are you sure you want to delete all of your tasks?
                    </p>
                  </div>
                  <div
                    class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
                  >
                    <button
                      type="button"
                      class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Delete All Tasks</button
                    ><button
                      data-modal-toggle="defaultModal"
                      type="button"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="bg-purple-200/50">
          <h1
            class="text-xl ml-16 font-medium inline-block py-1 px-2 mb-4 leading-5 text-purple-500 bg-yellow-300/20 font-medium rounded-full shadow-sm"
          >
            Task Items
          </h1>
          <div class="flex flex-wrap justify-evenly mx-8">
            <TaskItem
              v-for="task in taskArray"
              :key = "task.id"
              :taskData="task"
              @childDeleteTask="deleteTask"
            />
          </div>
          <Footer />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import NewTask from "@/components/NewTask.vue";
import { useTaskStore } from "../stores/task.js";
import TaskItem from "../components/TaskItem.vue";
import { ref } from "vue";
import Nav from "../components/Nav.vue";
// import TodoTasks from "../components/TodoTasks.vue";
// import DoneTasks from "../components/DoneTasks.vue";
//coger el email del usuario
import { useUserStore } from "@/stores/user.js";
import Footer from "../components/Footer.vue";
const userName = ref(useUserStore().user.email);
// nos definimos la tienda del usuario dentro de una constante
const taskStore = useTaskStore();
// Inicializamos array de tareas
const taskArray = ref([]);
async function readFromStore() {
  console.log("prueba");
  taskArray.value = await taskStore.fetchTasks();
  console.log(taskArray.value);
}
readFromStore();

// Enviamos los datos de la tarea a la Tienda taskStore
async function sendToStore(title, description) {
  await taskStore.addTask(title, description);
  readFromStore();
};

async function deleteTask(id) {
  await taskStore.deleteTask(id);
  readFromStore();
}
// async function readAll() {
//   let { data: tasks, error } = await supabase.from("tasks").select("*");
// }
// readAll();
</script>
<style scoped>
#todoTasks {
  background-color: rgb(33, 35, 118);
  color: white;
}

#doneTasks {
  background-color: rgb(41, 93, 41);
  color: white;
}
</style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 
7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
-->
