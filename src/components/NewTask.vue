<template>
  <div class="animate__animated animate__backInRight flex justify-center my-2 mx-4 md:mx-0">
    <form class="flexbox element w-full max-w-xl bg-white rounded-lg  drop-shadow-xl p-6">
      <div class="flex flex-col px-4 ">
        <input
          v-model="taskTitle"
          class="inputField mb-4 appearance-none block w-full bg-yellow-500/25 text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:bg-purple-500/25 hover:border-gray-600 ease-in-out duration-300 hover:animate-pulse"
          placeholder="Add a Task Title - e.g. Arrange business trip"
          type="text"
          name="newTodo"
          id="newTaskTitle"
        />
        <input
          v-model="taskDesc"
          class="inputField mb-4 appearance-none block w-full bg-yellow-500/25 text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none hover:border-gray-600 focus:bg-purple-500/25 ease-in-out duration-300 hover:animate-pulse"
          placeholder="Add a Task Description - e.g. Confirm dates and book room"
          type="text"
          name="newDescription"
          id="newTaskDesc"
        />
        <button
          @click.prevent="uploadTask"
          class="appearance-none block w-full bg-green-500/25 text-gray-400 font-medium border border-gray-400 rounded-lg py-3 px-3 hover:border-gray-600 leading-tight focus:outline-none focus:bg-green-500/25 ease-in-out duration-300 hover:animate-pulse"
          type="submit"
        >
          Add
        </button>
        <h3
          class="text-gray-900 font-medium px-3 pt-3 leading-tight focus:outline-none"
          v-if="errorBool"
        >
          {{ emptyString }}
        </h3>
      </div>
    </form>

    <!-- <input
      v-model="taskTitle"
      type="text"
      id="newTaskTitle"
      placeholder="Title"
    /><br /><br /> -->

    <!-- <input
      v-model="taskDesc"
      type="text"
      id="newTaskDesc"
      placeholder="Description"
    /><br /><br /> -->

    <!-- <button @click.prevent="uploadTask">Create</button> -->
    <ol>
      <TaskItem
        v-for="(task, index) in taskArray"
        :key="index"
        :taskData="task"
      ></TaskItem>
    </ol>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task.js";
const emit = defineEmits(["childNewTask"]);
let taskTitle = ref("");
let taskDesc = ref("");
let errorBool = ref(false);
const emptyString = ref("");
function uploadTask() {
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required";
    setTimeout(() => {
      errorBool.value = false;
    }, 1300);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    console.log(taskTitle.value);
  }
}
// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
