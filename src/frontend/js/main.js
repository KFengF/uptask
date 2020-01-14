import { putProjectProcess } from "./modules/project.front";
import {
  handleTaskCheck,
  handleDeleteTask
} from "./modules/tasks.front";
import { handleStack } from "./modules/stack.front";

window.customFunctions = {
  handleTaskCheck,
  handleDeleteTask,
  handleStack
};

document.addEventListener("DOMContentLoaded", () =>
  putProjectProcess()
);
