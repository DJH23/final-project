<template>
  <section
    class="py-6 px-5 mt-12 mx-3 text-base appearance-none block text-gray-900 font-medium border rounded-lg py-3 px-3 focus:outline-none bg-white w-72 shadow-md relative"
  >
    <div class="taskItem">
      <div
        class="border border-gray-500/25 shadow-md relative h-8 shadow-gray-500/25 rounded-lg text-base pl-2.5 pt-0.5 truncate"
      >
        <b class="text-purple-500 font-medium"
          >Title: <span class="text-yellow-500">{{ taskData.title }}</span></b
        >
      </div>

      <!-- <div class="justify-between flex flex-col"> -->

      <svg
        v-if="doneTask"
        class="mt-4 -ml-1.5"
        ease-in-out
        duration-200
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
      >
        <path
          fill="#c8e6c9"
          d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"
        />
        <path
          fill="#4caf50"
          d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"
        />
      </svg>

      <div
        v-if="!doneTask"
        class="overflow-auto h-52 mt-4 mb-12 shadow-md shadow-gray-500/25 pl-2.5 resize-y border border-gray-500/25 leading-snug rounded-lg"
      >
        <i
          ><u class="underline-offset-2 leading-loose">Description:</u><br />
          <span class="not-italic">{{ taskData.description }}</span></i
        >
      </div>

      <div class="absolute bottom-5 flex flex-wrap justify-around right-10 items-end">
        <button
          v-if="!showInput && !showReopen && showElement"
          class="inputField mx-2 w-14 bg-yellow-500/25 border border-gray-400 hover:border-gray-600 focus:text-gray-600 text-sm text-gray-400 font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-yellow-500/50 hover:bg-yellow-500/50 hover:text-gray-600 ease-in-out duration-200"
          @click="toggleInput"
        >
          Edit
        </button>
        <div class="bg-white z-10 shadow-md shadow-gray-500/25 mb-4 rounded-lg">
          <input
            v-if="showInput  && !showReopen"
            v-model="newTitle"
            placeholder="New Title:"
            type="text"
            class="inputField m-2 w-64 bg-yellow-500/25 border border-gray-400 hover:border-gray-600 focus:text-gray-600 text-sm text-gray-400 font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-purple-500/30 hover:text-gray-600 ease-in-out duration-200 mb-2 pl-2.5 hover:animate-pulse"
          />
          <input
            v-if="showInput && !showReopen"
            v-model="newDescription"
            placeholder="New Description:"
            type="text"
            class="inputField m-2 w-64 bg-yellow-500/25 border border-gray-400 hover:border-gray-600 focus:text-gray-600 text-sm text-gray-400 font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-purple-500/30 hover:text-gray-600 ease-in-out duration-200 mb-2 pl-2.5 hover:animate-pulse"
          />
        </div>
        <button
          v-if="showInput  && !showReopen"
          class="inputField ml-4 mr-2 w-28 bg-yellow-500/25 border border-gray-400 hover:border-gray-600 text-sm text-gray-400 focus:text-gray-600 font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-yellow-500/50 hover:bg-yellow-500/50 hover:text-gray-600 ease-in-out duration-200"
          @click="editTask"
        >
          Confirm Edit
        </button>
        <button
          v-if="!showReopen && showElement && !hideDoneandDeleteButton"
          class="inputField mx-2 w-14 bg-green-500/25 border border-gray-400 hover:border-gray-600 text-sm text-gray-400 font-medium leading-tight rounded-lg py-1 hover:bg-green-500/50 hover:text-gray-600 focus:outline-none focus:bg-green-500/50 ease-in-out duration-200"
          @click="taskDone"
        >
          Done
        </button>
        <button
          v-if="showReopen"
          class="inputField mb-3.5 pb-1 leading-tight mr-28 w-14 bg-green-500/25 border border-gray-400 hover:border-gray-600 text-sm text-gray-400 font-medium  rounded-lg py-1 hover:bg-green-500/50 hover:text-gray-600 focus:outline-none focus:bg-green-500/50 ease-in-out duration-200"
          @click="taskDone"
        >
          Reopen
        </button>
        <div class="delete-bin">
          <button
            v-if="!showConfirmDelete && !showReopen  && !hideDoneandDeleteButton"
            class="inputField mx-2 w-14 bg-red-500/25 border border-gray-400 hover:border-gray-600 text-sm text-gray-400 focus:text-gray-600 font-medium leading-tight rounded-lg py-1 hover:bg-red-500/50 hover:text-gray-600 focus:outline-none focus:bg-red-500/50 ease-in-out duration-200"
            @click="toggleConfirmDelete"
          >
          <div class="flex justify-center">
            <!-- <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="#9ca3af"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </div> -->
            Delete
          </div>
          </button>
        </div>
        <button
          v-if="showConfirmDelete && !showReopen"
          class="inputField mx-2 w-16 bg-green-500/25 border border-gray-400 hover:border-gray-600 text-sm text-gray-400 font-medium leading-tight rounded-lg py-1 hover:bg-green-500/50 hover:text-gray-600 focus:outline-none focus:bg-green-500/50 ease-in-out duration-200"
          @click="goBack"
        >
          Go Back
        </button>
        <button
          v-if="showConfirmDelete && !showReopen"
          class="inputField mx-2 w-28 bg-red-500/25 border border-gray-400 hover:border-gray-600 text-sm text-gray-400 focus:text-gray-600 font-medium leading-tight rounded-lg py-1 hover:bg-red-500/50 hover:text-gray-600 focus:outline-none focus:bg-red-500/40 ease-in-out duration-200"
          @click="deleteTask"
        >
          Confirm Delete
        </button>
      
      </div>
      <!-- </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["childDeleteTask", "childTaskDone"]);
const props = defineProps(["taskData"]);
const showInput = ref(false);
const showConfirmDelete = ref(false);
const showReopen = ref(props.taskData.is_complete);
const showElement = ref(true);
const newTitle = ref("");
const newDescription = ref("");
const doneTask = ref(props.taskData.is_complete);
const hideDoneandDeleteButton = ref(false);

function deleteTask() {
  emit("childDeleteTask", props.taskData.id);
}
function toggleInput() {
  showInput.value = true;
  hideDoneandDeleteButton.value = true;
}
function editTask() {
  showInput.value = false;
  hideDoneandDeleteButton.value = false;
  emit(
    "childEditTask",
    props.taskData.id,
    newTitle.value,
    newDescription.value
  );
}
function toggleConfirmDelete() {
  showConfirmDelete.value = true;
  showElement.value = false;
}
function toggleReopen() {
  showReopen.value = !showReopen.value;
}
function taskDone() {
  toggleReopen();
  toggleDoneTask();
  emit("childTaskDone", props.taskData.id);
}
// done button true/(default)false
function toggleDoneTask() {
  doneTask.value = !doneTask.value;
}
function goBack() {
  showElement.value = true;
  showConfirmDelete.value = false;
}
</script>

<style>
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
