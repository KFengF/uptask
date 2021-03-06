import Swal from "sweetalert2";
import axios from "axios";
import { putProjectProcess } from "./project.front";

export const handleTaskCheck = event => {
  const icon = event.target;
  const taskId = icon.parentElement.parentElement.dataset.taskId;

  axios
    .patch(`${location.origin}/tasks/${taskId}`)
    .then(() => {
      icon.classList.toggle("completo");
      putProjectProcess();
    })
    .catch(() =>
      Swal.fire({
        icon: "error",
        title: "There's something wrong...",
        text: "Task couldn't be checked or unchecked"
      })
    );
};

export const handleDeleteTask = event => {
  const taskSelected = event.target.parentElement.parentElement;
  const tasksList = taskSelected.parentElement;
  const taskId = taskSelected.dataset.taskId;

  Swal.fire({
    title: "Are you sure deleting this task?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(196, 0, 0)",
    cancelButtonColor: "rgb(219, 184, 29)",
    confirmButtonText: "Delete it",
    cancelButtonText: "Cancel"
  }).then(result => {
    if (result.value)
      axios
        .delete(`${location.origin}/tasks/${taskId}`)
        .then(() => {
          tasksList.removeChild(taskSelected);

          Swal.fire(
            "Deleted",
            "Your task has been deleted",
            "success"
          );

          putProjectProcess();

          if (!tasksList.childNodes.length) {
            const emptySpan = document.createElement("span");

            emptySpan.innerHTML = "There's no task in this project";

            tasksList.appendChild(emptySpan);
          }
        })
        .catch(() =>
          Swal.fire({
            icon: "error",
            title: "There's something wrong...",
            text: "Task couldn't be deleted"
          })
        );
  });
};
