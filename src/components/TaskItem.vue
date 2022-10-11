<template>
  <section class="py-6 px-6 mt-12 mx-3 text-lg appearance-none block text-gray-900 font-medium border rounded-lg py-3 px-3 leading-tight focus:outline-none bg-white w-72 shadow-md relative">
  <div class="taskItem">
      <li class="marker:text-yellow-500">
      <b class="text-purple-500 font-medium">Title: <span class="text-yellow-500">{{ taskData.title }}</span></b>
      <br />
      <div class="justify-between h-32 flex flex-col">
        
      <div class="mt-2 mb-6 indent-4 pl-2.5 resize-y">
        <i>Description: <span class="not-italic">{{ taskData.description }}</span></i>
      <br />
    </div>
    <div class="absolute bottom-5">
      <button v-if="!showInput" class="inputField ml-4 m-2 w-14 bg-yellow-500/25 border border-gray-400 focus:border- text-sm text-gray-400 focus:text-black font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-yellow-500/50 ease-in-out duration-200" @click="toggleInput">Edit</button>
      <input v-if="showInput" type="text">
      <input v-if="showInput" type="text">
      <button v-if="showInput" class="inputField ml-4 m-2 w-14 bg-yellow-500/25 border border-gray-400 focus:border- text-sm text-gray-400 focus:text-black font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-yellow-500/50 ease-in-out duration-200" @click="editTask">Confirm Edit</button>
      <button class="inputField m-2 w-14 bg-green-500/25  border border-gray-400 text-sm text-gray-400 focus:text-black font-medium leading-tight rounded-lg py-1  focus:outline-none focus:bg-green-500/50 ease-in-out duration-200" @click="doneTask">Done</button>
      <button class="inputField m-2 w-14 w bg-red-500/25 border border-gray-400 text-sm text-gray-400 focus:text-black font-medium leading-tight rounded-lg py-1 focus:outline-none focus:bg-red-500/50 ease-in-out duration-200" @click="deleteTask">Delete</button>
    </div>
    </div>
    </li>
  </div>
</section>
</template>

<script setup>
import {ref} from "vue"
const emit = defineEmits(["childDeleteTask"]);
const props = defineProps(["taskData"]);
const showInput = ref(false)
function deleteTask() {
  emit("childDeleteTask", props.taskData.id)
};
function toggleInput() {
  showInput.value = true
}
function editTask() {
  showInput.value = false
}
</script>

<style></style>

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
