import { putProjectProcess } from "./modules/project.front";
import {
  handleTaskCheck,
  handleDeleteTask
} from "./modules/tasks.front";
import "./modules/stack.front";

window.customFunctions = {
  handleTaskCheck,
  handleDeleteTask
};

document.addEventListener("DOMContentLoaded", () =>
  putProjectProcess()
);
