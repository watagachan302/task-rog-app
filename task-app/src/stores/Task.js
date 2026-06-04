import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
  },
});