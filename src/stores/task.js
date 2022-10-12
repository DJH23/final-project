import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: true });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    async completeTask(taskID, isComplete) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: !isComplete})
        .eq("id", taskID);
    },

    async checkComplete(id){
      const { data, error } = await supabase
      .from("tasks")
      .select("is_complete")
      .eq("id", id);
      return data[0].is_complete;
    },

    async deleteAllTasks() {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("is_complete", false);
    },

    async deleteTask(taskID) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskID);
    },
    async updateTask(id, newTitle, newDescription) {
      const { data, error } = await supabase
        .from("tasks")
        .update({title:newTitle, description:newDescription})
        .eq("id", id);
    }
  },
});
