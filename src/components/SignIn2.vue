<template>
    <div class="signing">
      <h1 class="darrensH1">
      Hello world!
    </h1>
    <img :src="hawtin" alt="">
      <h3>Log In to Darren's amazing TaskApp</h3>
      <p>Start Organising Your Tasks Today!</p>
      <p v-if="errorMsg" class="">
        {{ errorMsg }}
      </p>
      <form @submit.prevent="signIn">
        <div class="">
          <label class="" for="">Email</label><br />
          <input
            class=""
            type="email"
            placeholder="dave@wuTangfinancial.com"
            v-model="email"
            id="email"
          />
        </div>
        <div class="mb-4">
          <label class="" for="">Password</label><br />
          <div class="">
            <input
              class=""
              :type="passwordFieldType"
              onpaste="return false"
              placeholder="************"
              v-model="password"
              id="password"
            />
            <span class="">
              <EyeIcon
                :class="[passwordFieldIcon]"
                @click.prevent="hidePassword = !hidePassword"
              />
            </span>
          </div>
        </div>
        <button class="" type="submit">Sign In</button>
        <p>Don't have an account?</p>
        <p class="">
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </form>
    </div>
    
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import PersonalRouter from "./PersonalRouter.vue";
  import { supabase } from "../supabase";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/user";
  import { storeToRefs } from "pinia";
  
  // my images
  const hawtin = "https://res.cloudinary.com/dty6nmroj/image/upload/v1664873711/task-app-vue/hawtin.jpg"
  
  
  // Route Variables
  const route = "/auth/sign-up";
  const buttonText = "register a new account";
  // Input Fields
  const email = ref("");
  const password = ref("");
  // Error Message
  const errorMsg = ref("");
  //Show hide password variables
  const passwordFieldType = computed(() =>
    hidePassword.value ? "password" : "text"
  );
  const hidePassword = ref(true);
  // Router to push user once SignedIn to the HomeView
  const redirect = useRouter();
  // Arrow function to Signin user to supaBase
  const signIn = async () => {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signIn(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message
      errorMsg.value = `Error: ${error.message}`;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
  };
  </script>
  
  <style>
  .wu-text {
    color: black;
  }
  .form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }
  .input {
    color: black;
    margin-bottom: 1rem;
  }
  .button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 10px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  
  </style>
  